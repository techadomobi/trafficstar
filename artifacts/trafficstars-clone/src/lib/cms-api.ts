const DEFAULT_CMS_BASE_URL = "https://click.creditsdeal.com";

export type CmsPrimitive = string | number | boolean | null | undefined;
export type CmsValue = CmsPrimitive | Blob | File | CmsValue[] | Record<string, unknown>;

export type CmsBlogCard = {
  tag: string;
  featured: boolean;
  title: string;
  desc: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  slug?: string;
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type CmsRequestOptions = {
  method?: RequestMethod;
  query?: Record<string, CmsPrimitive>;
  body?: Record<string, CmsValue>;
};

type LoginResponse = {
  message?: string;
  responseMessage?: string;
  error?: string;
  responseCode?: number;
  success?: boolean;
  status?: string;
  token?: string;
  adminId?: string;
  responsResult?: Record<string, unknown>;
  data?: Record<string, unknown>;
  user?: Record<string, unknown>;
};

const getCmsBaseUrl = () =>
  (import.meta.env.VITE_CMS_API_BASE_URL ?? DEFAULT_CMS_BASE_URL).replace(/\/$/, "");

const toStringValue = (value: CmsPrimitive): string => {
  if (value === null || value === undefined) return "";
  return String(value);
};

const appendFormValue = (formData: FormData, key: string, value: CmsValue): void => {
  if (value === null || value === undefined) return;

  if (Array.isArray(value)) {
    const containsBinary = value.some((item) => item instanceof Blob);
    if (containsBinary) {
      value.forEach((item) => {
        if (item instanceof Blob) formData.append(key, item);
        else formData.append(key, JSON.stringify(item));
      });
      return;
    }

    formData.append(key, JSON.stringify(value));
    return;
  }

  if (value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  if (typeof value === "object") {
    formData.append(key, JSON.stringify(value));
    return;
  }

  formData.append(key, toStringValue(value));
};

const buildQueryString = (query?: Record<string, CmsPrimitive>): string => {
  if (!query) return "";

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== null && value !== undefined) params.set(key, toStringValue(value));
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

async function cmsRequest<T>(path: string, options: CmsRequestOptions = {}): Promise<T> {
  const url = `${getCmsBaseUrl()}${path}${buildQueryString(options.query)}`;
  const method = options.method ?? "GET";

  const init: RequestInit = { method };

  if (options.body) {
    const formData = new FormData();
    Object.entries(options.body).forEach(([key, value]) => appendFormValue(formData, key, value));
    init.body = formData;
  }

  const response = await fetch(url, init);
  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === "string"
      ? payload
      : (payload as { message?: string; error?: string })?.message
        ?? (payload as { message?: string; error?: string })?.error
        ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

const firstString = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
};

const formatCmsDate = (value: unknown): string => {
  if (typeof value !== "string" || !value.trim()) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const extractItems = (payload: unknown): Record<string, unknown>[] => {
  if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
  if (!payload || typeof payload !== "object") return [];

  const candidateKeys = ["data", "items", "blogs", "services", "offers", "sliders", "users", "leads", "results"];
  for (const key of candidateKeys) {
    const candidate = (payload as Record<string, unknown>)[key];
    if (Array.isArray(candidate)) {
      return candidate.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
    }
    if (candidate && typeof candidate === "object") {
      const nested = extractItems(candidate);
      if (nested.length) return nested;
    }
  }

  return [];
};

export const normalizeBlogCards = (payload: unknown, fallback: CmsBlogCard[] = []): CmsBlogCard[] => {
  const items = extractItems(payload);
  if (!items.length) return fallback;

  return items.map((item, index) => ({
    tag: firstString(item.category, item.tag, item.websiteName, item.categoryName, "Blog"),
    featured: Boolean(item.featured ?? index === 0),
    title: firstString(item.title, item.blogTitle, item.seoTitle, item.name, item.slug, "Untitled Article"),
    desc: firstString(item.excerpt, item.metaDescription, item.description, item.summary, item.content),
    readTime: firstString(item.readTime, item.read_time, item.readingTime, "5 min read"),
    date: formatCmsDate(item.createdAt ?? item.updatedAt ?? item.date ?? item.publishDate),
    author: firstString(item.writerName, item.author, item.createdBy, item.websiteName, "AdoMobi Team"),
    authorRole: firstString(item.authorRole, item.role, item.category, "Blog"),
    slug: firstString(item.slug),
  }));
};

export const adminLogin = (email: string, password: string) =>
  cmsRequest<{ message?: string; token?: string; adminId?: string }>("/admin/login", {
    method: "POST",
    body: { email, password },
  });

export const adminCreateBlog = (body: Record<string, CmsValue>) =>
  cmsRequest("/admin/createBlog", { method: "POST", body });

export const adminUpdateBlog = (body: Record<string, CmsValue>) =>
  cmsRequest("/admin/updateBlog", { method: "PUT", body });

export const adminListBlogs = (query: { page: CmsPrimitive; search: CmsPrimitive; category: CmsPrimitive; websiteName: CmsPrimitive; location: CmsPrimitive }) =>
  cmsRequest("/admin/listBlogs", { method: "GET", query });

export const adminViewBlog = (slug: CmsPrimitive) =>
  cmsRequest("/admin/viewBlog", { method: "GET", query: { slug } });

export const adminDeleteBlog = (blogId: CmsPrimitive) =>
  cmsRequest("/admin/deleteBlog", { method: "DELETE", query: { blogId } });

export const addCategory = (body: { adminId: CmsValue; categoryName: CmsValue }) =>
  cmsRequest("/category/addCategory", { method: "POST", body });

export const deleteCategory = (categoryId: CmsPrimitive) =>
  cmsRequest("/category/deleteCategory", { method: "PUT", query: { categoryId } });

export const categoryList = (adminId: CmsPrimitive) =>
  cmsRequest("/category/categoryList", { method: "GET", query: { adminId } });

export const employeeSignup = (body: { email: CmsValue; name: CmsValue; mobileNumber: CmsValue; address: CmsValue; password: CmsValue }) =>
  cmsRequest("/api/signup", { method: "POST", body });

export const employeeLogin = (email: CmsValue, password: CmsValue) =>
  cmsRequest("/api/login", { method: "POST", body: { email, password } });

export const leadApi = (body: Record<string, CmsValue>) =>
  cmsRequest("/api/leadApi", { method: "POST", body });

export const getLeads = (adminId: CmsPrimitive) =>
  cmsRequest("/api/getLeads", { method: "GET", query: { adminId } });

export const addOffer = (body: Record<string, CmsValue>) =>
  cmsRequest("/api/addOffer", { method: "POST", body });

export const offerList = (categoryId: CmsPrimitive) =>
  cmsRequest("/api/offerList", { method: "GET", query: { categoryId } });

export const updateOffer = (query: { adminId: CmsPrimitive; offerId: CmsPrimitive; categoryId?: CmsPrimitive }, body: Record<string, CmsValue>) =>
  cmsRequest("/api/updateOffer", { method: "PUT", query, body });

export const viewOfferData = (offerId: CmsPrimitive) =>
  cmsRequest("/api/viewOfferData", { method: "GET", query: { offerId } });

export const clickApi = (offerId: CmsPrimitive) =>
  cmsRequest("/api/clickApi", { method: "GET", query: { offerId } });

export const deleteOffer = (offerId: CmsPrimitive) =>
  cmsRequest("/api/deleteOffer", { method: "DELETE", query: { offerId } });

export const inActiveOffer = (adminId: CmsPrimitive, offerId: CmsPrimitive) =>
  cmsRequest("/api/InActiveOffer", { method: "PUT", query: { adminId, offerId } });

export const offerActive = (adminId: CmsPrimitive, offerId: CmsPrimitive) =>
  cmsRequest("/api/offerActive", { method: "PUT", query: { adminId, offerId } });

export const createService = (body: Record<string, CmsValue>) =>
  cmsRequest("/admin/createService", { method: "POST", body });

export const updateService = (body: Record<string, CmsValue>) =>
  cmsRequest("/admin/updatesService", { method: "PUT", body });

export const listService = (query: { page: CmsPrimitive; search: CmsPrimitive; category: CmsPrimitive; websiteName: CmsPrimitive; location: CmsPrimitive }) =>
  cmsRequest("/admin/listService", { method: "GET", query });

export const viewService = (slug: CmsPrimitive) =>
  cmsRequest("/admin/viewService", { method: "GET", query: { slug } });

export const deleteService = (blogId: CmsPrimitive) =>
  cmsRequest("/admin/deleteService", { method: "DELETE", query: { blogId } });

export const createSlider = (body: Record<string, CmsValue>) =>
  cmsRequest("/slider/createSlider", { method: "POST", body });

export const getSliders = () => cmsRequest("/slider/getSliders", { method: "GET" });

export const getSliderById = (id: CmsPrimitive) =>
  cmsRequest("/slider/getSliderById", { method: "GET", query: { id } });

export const updateSlider = (body: Record<string, CmsValue>) =>
  cmsRequest("/slider/updateSlider", { method: "PUT", body });

export const deleteSliderImage = (sliderId: CmsPrimitive, imageId: CmsPrimitive) =>
  cmsRequest("/slider/deleteImage", { method: "DELETE", query: { sliderId, imageId } });

export const deleteSlider = (id: CmsPrimitive) =>
  cmsRequest("/slider/deleteSlider", { method: "DELETE", query: { id } });

export const addSubCategory = (body: { adminId: CmsValue; categoryId: CmsValue; subCategoryName: CmsValue }) =>
  cmsRequest("/api/addSubCategory", { method: "POST", body });

export const subCategoryList = (adminId: CmsPrimitive, categoryId: CmsPrimitive) =>
  cmsRequest("/api/subCategoryList", { method: "GET", query: { adminId, categoryId } });

export const userSignup = (body: {
  email: CmsValue;
  name: CmsValue;
  mobileNumber: CmsValue;
  address: CmsValue;
  password: CmsValue;
  utm_source?: CmsValue;
  utm_medium?: CmsValue;
  utm_campaign?: CmsValue;
  utm_content?: CmsValue;
  utm_term?: CmsValue;
  aff_id?: CmsValue;
  click_id?: CmsValue;
  gclid?: CmsValue;
  fbclid?: CmsValue;
}) => cmsRequest("/user/signup", { method: "POST", body });

export const userLogin = async (email: CmsValue, password: CmsValue) => {
  const response = await cmsRequest<LoginResponse>("/user/login", { method: "POST", body: { email, password } });
  const token = typeof response.token === "string" ? response.token.trim() : "";
  const failureMessage =
    response.responseMessage ??
    response.message ??
    response.error ??
    "Invalid email or password.";

  const responseText = failureMessage.toLowerCase();
  const looksLikeFailure =
    response.success === false ||
    response.status?.toLowerCase() === "error" ||
    response.status?.toLowerCase() === "failed" ||
    /invalid|unauthori[sz]ed|failed|denied|incorrect/.test(responseText);

  if (looksLikeFailure || !token) {
    throw new Error(failureMessage);
  }

  return response;
};

export const editProfile = (body: Record<string, CmsValue>) =>
  cmsRequest("/user/editProfile", { method: "POST", body });

export const forgetPassword = (email: CmsValue) =>
  cmsRequest("/user/forgetPassword", { method: "PUT", body: { email } });

export const resetPassword = (otp: CmsValue, newPassword: CmsValue) =>
  cmsRequest("/user/resetPassword", { method: "PUT", body: { otp, newPassword } });

export const getUsers = (page: CmsPrimitive) =>
  cmsRequest("/user/getUsers", { method: "GET", query: { page } });

export const getTodayUsers = (page: CmsPrimitive) =>
  cmsRequest("/user/getTodayUsers", { method: "GET", query: { page } });

export const totalUsers = () => cmsRequest("/user/totalUsers", { method: "GET" });

export const deleteAccount = (userId: CmsValue) =>
  cmsRequest("/user/deleteAccount", { method: "DELETE", body: { userId } });