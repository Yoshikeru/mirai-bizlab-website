// 週刊タイ経済デモ：cookieベースのセッション／メーター式ペイウォール判定（サーバー専用）
import { cookies } from 'next/headers';
import { FREE_LIMIT, getPlan, planUnlocks } from './plans';

export const COOKIE_MEMBER = 'tk_member';
export const COOKIE_PLAN = 'tk_plan';
export const COOKIE_VIEWS = 'tk_views';

export interface TkSession {
  email: string | null;
  planId: string | null;
  viewedSlugs: string[];
  isMember: boolean;        // ログイン済みか
  hasSubscription: boolean; // 本紙が読み放題になる契約か
  freeRemaining: number;    // 無料枠の残り本数
}

export function readSession(): TkSession {
  const c = cookies();
  const email = c.get(COOKIE_MEMBER)?.value || null;
  const planId = c.get(COOKIE_PLAN)?.value || null;
  let viewedSlugs: string[] = [];
  try {
    const raw = c.get(COOKIE_VIEWS)?.value;
    if (raw) viewedSlugs = JSON.parse(raw);
    if (!Array.isArray(viewedSlugs)) viewedSlugs = [];
  } catch {
    viewedSlugs = [];
  }
  const hasSubscription = planUnlocks(planId);
  const freeRemaining = Math.max(0, FREE_LIMIT - viewedSlugs.length);
  return { email, planId, viewedSlugs, isMember: !!email, hasSubscription, freeRemaining };
}

export type AccessReason =
  | 'subscription'
  | 'already-viewed'
  | 'free-quota'
  | 'paywall'
  | 'archive-locked';

export interface AccessDecision {
  allowed: boolean;
  reason: AccessReason;
}

export function decideAccess(slug: string, archiveOnly: boolean, s: TkSession): AccessDecision {
  // アーカイブ限定記事はアーカイブ対応プラン（プロ／法人）のみ
  if (archiveOnly) {
    const plan = getPlan(s.planId);
    if (plan?.archive) return { allowed: true, reason: 'subscription' };
    return { allowed: false, reason: 'archive-locked' };
  }
  if (s.hasSubscription) return { allowed: true, reason: 'subscription' };
  if (s.viewedSlugs.includes(slug)) return { allowed: true, reason: 'already-viewed' };
  if (s.viewedSlugs.length < FREE_LIMIT) return { allowed: true, reason: 'free-quota' };
  return { allowed: false, reason: 'paywall' };
}
