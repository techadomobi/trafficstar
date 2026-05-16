const isPresent = (value) => value !== undefined && value !== null && value !== "";

const firstPresent = (...values) => values.find(isPresent);

export const unwrapApiPayload = (payload) =>
  payload?.responseResult ?? payload?.responsResult ?? payload?.data ?? payload ?? null;

export function normalizeSessionUser(rawUser, fallbackPartnersId) {
  const user = unwrapApiPayload(rawUser) || {};
  const userType = user.userType || user.role || "";

  const partnersId = firstPresent(
    user.partners_Id,
    user.partnerId,
    user.partner_id,
    user.partner?._id,
    fallbackPartnersId,
  );

  const actorId = firstPresent(
    user.advertiserId,
    user.advertiser_id,
    user.publisherId,
    user.publisher_id,
    user.userId,
    user.user_id,
    user.subadminId,
    user.subadmin_id,
    user.managerId,
    user.manager_id,
    userType ? user._id : undefined,
  );

  return {
    ...user,
    userType,
    partners_Id: partnersId,
    dashboardActorId: actorId,
    advertiserId: firstPresent(user.advertiserId, actorId),
    publisherId: firstPresent(user.publisherId, actorId),
  };
}

export function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawUser = localStorage.getItem("advertiserData");
    const storedPartnersId = localStorage.getItem("partners_Id");
    if (!rawUser) {
      return null;
    }

    return normalizeSessionUser(JSON.parse(rawUser), storedPartnersId);
  } catch (error) {
    console.error("Failed to read session user from localStorage:", error);
    return null;
  }
}

export function getDashboardIdentity() {
  const session = getStoredSession();
  const rawActorCandidates = Array.from(
    new Set(
      [
        session?.dashboardActorId,
        session?.advertiserId,
        session?.advertiser_id,
        session?.publisherId,
        session?.publisher_id,
        session?.subadminId,
        session?.subadmin_id,
        session?._id,
      ]
        .filter(isPresent)
        .map(String),
    ),
  );
  const numericActorCandidates = rawActorCandidates.filter((value) => /^\d+$/.test(value));
  const actorCandidates =
    numericActorCandidates.length > 0 ? numericActorCandidates : rawActorCandidates;

  return {
    session,
    partnersId: session?.partners_Id ? String(session.partners_Id) : "",
    actorId: session?.dashboardActorId ? String(session.dashboardActorId) : "",
    actorCandidates,
    token:
      typeof window !== "undefined" ? localStorage.getItem("authToken") || "" : "",
  };
}

export async function fetchJsonWithIdentityFallback({
  path,
  partnersId,
  actorCandidates,
  token,
  searchParams = {},
}) {
  const actorIds = Array.from(new Set((actorCandidates || []).filter(isPresent).map(String)));

  for (const actorId of actorIds) {
    const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    url.searchParams.append("partners_Id", String(partnersId));
    url.searchParams.append("advertiserId", actorId);
    url.searchParams.append("advertiser_id", actorId);

    Object.entries(searchParams).forEach(([key, value]) => {
      if (isPresent(value)) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      continue;
    }

    const json = await response.json();
    const result = unwrapApiPayload(json);
    const hasUsableData =
      Array.isArray(result) ? result.length > 0 : isPresent(result);

    if (hasUsableData || json?.responseCode === 200) {
      return { json, actorId };
    }
  }

  throw new Error(`No successful API response for ${path} using available session IDs.`);
}
