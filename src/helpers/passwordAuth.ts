import "server-only";
import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

/**
 * Shared authentication helpers for password-protected content.
 * These run exclusively on the server (see "server-only" import).
 */

/** Authentication cookie lifetime. Configurable via env, defaults to 7 days. */
export const AUTH_MAX_AGE =
  (Number(process.env.PASSWORD_AUTH_MAX_AGE) || 60 * 60 * 24 * 7);

/**
 * Constant-time string comparison to avoid timing side channels.
 */
export function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    timingSafeEqual(aBuf, aBuf); // Burn comparable time regardless of length
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_ATTEMPTS = 5;

const attempts = new Map<string, number[]>();

function attemptKey(ip: string, scope: string): string {
  return `${scope}:${ip}`;
}

/**
 * Best-effort in-memory brute-force protection.
 * Records an attempt and returns true once the limit is exceeded.
 * Resets on a successful authentication via {@link resetRateLimit}.
 */
export function isRateLimited(ip: string, scope: string): boolean {
  const key = attemptKey(ip, scope);
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX_ATTEMPTS) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

/** Clears recorded attempts for a client/scope after a successful login. */
export function resetRateLimit(ip: string, scope: string): void {
  attempts.delete(attemptKey(ip, scope));
}

/** Best-effort client IP extraction (falls back to "unknown"). */
export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
