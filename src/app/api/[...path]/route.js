import { NextResponse } from "next/server";

const UPSTREAM_API =
  process.env.API_UPSTREAM ||
  process.env.NEXT_PUBLIC_API_UPSTREAM ||
  "https://apiv2.offersmeta.in/";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
]);

async function proxyRequest(request, context) {
  const params = await context.params;
  const pathSegments = params?.path || [];
  const upstreamUrl = new URL(pathSegments.join("/"), UPSTREAM_API);
  const incomingUrl = new URL(request.url);
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  for (const key of HOP_BY_HOP_HEADERS) {
    headers.delete(key);
  }

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  try {
    const response = await fetch(upstreamUrl, init);
    const responseHeaders = new Headers(response.headers);

    responseHeaders.delete("content-encoding");
    responseHeaders.delete("transfer-encoding");

    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Upstream API request failed.",
        detail: error instanceof Error ? error.message : "Unknown error",
        upstream: upstreamUrl.toString(),
      },
      { status: 502 },
    );
  }
}

export function GET(request, context) {
  return proxyRequest(request, context);
}

export function POST(request, context) {
  return proxyRequest(request, context);
}

export function PUT(request, context) {
  return proxyRequest(request, context);
}

export function PATCH(request, context) {
  return proxyRequest(request, context);
}

export function DELETE(request, context) {
  return proxyRequest(request, context);
}

export function OPTIONS(request, context) {
  return proxyRequest(request, context);
}
