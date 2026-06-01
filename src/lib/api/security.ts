/**
 * Shared best-effort protections for public API routes (chat, contact).
 *
 * These are deterrents, not hard guarantees: the in-memory rate limiter is
 * per-serverless-instance (not shared across instances) and the Origin check
 * can be spoofed. The hard ceilings live elsewhere — the Anthropic spend limit
 * for the chatbot, and Resend's own sending quotas for email.
 */

const ALLOWED_HOSTS = new Set<string>([
  "miraibizlab.co.th",
  "www.miraibizlab.co.th",
]);

/** Best-effort client identifier from proxy headers. */
export function clientKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

/**
 * Only accept requests that originate from our own site (or have no
 * Origin/Referer at all, which some legitimate clients omit). Blocks casual
 * cross-site abuse of the endpoints.
 */
export function isAllowedOrigin(request: Request): boolean {
  const source =
    request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return true;

  let host: string;
  try {
    host = new URL(source).host.toLowerCase();
  } catch {
    return false;
  }

  const hostname = host.split(":")[0]!;
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  if (hostname.endsWith(".vercel.app")) return true;

  const allowed = new Set(ALLOWED_HOSTS);
  try {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host.toLowerCase());
    }
  } catch {
    /* ignore malformed env */
  }

  return allowed.has(host) || allowed.has(hostname);
}

// Named buckets so each route keeps an independent counter.
const buckets = new Map<string, Map<string, { count: number; reset: number }>>();

/**
 * Returns true if `key` has exceeded `max` requests within `windowMs` for the
 * named bucket. Best-effort, in-memory, per-instance.
 */
export function rateLimited(
  bucketName: string,
  key: string,
  opts: { windowMs: number; max: number },
): boolean {
  const now = Date.now();
  let bucket = buckets.get(bucketName);
  if (!bucket) {
    bucket = new Map();
    buckets.set(bucketName, bucket);
  }

  const entry = bucket.get(key);
  if (!entry || now > entry.reset) {
    bucket.set(key, { count: 1, reset: now + opts.windowMs });
    return false;
  }

  entry.count += 1;
  // Opportunistic cleanup so the map can't grow unbounded.
  if (bucket.size > 5000) {
    for (const [k, v] of bucket) {
      if (now > v.reset) bucket.delete(k);
    }
  }
  return entry.count > opts.max;
}
