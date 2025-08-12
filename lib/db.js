import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
  { auth: { persistSession: false } }
);

// 取/建用户
export async function getOrCreateUserByEmail(email){
  if(!email) return null;
  const { data, error } = await supabaseAdmin
    .from('users').select('*').eq('email', email).maybeSingle();
  if(error) throw error;
  if(data) return data;
  const { data: inserted, error: err2 } = await supabaseAdmin
    .from('users').insert({ email }).select().single();
  if(err2) throw err2;
  return inserted;
}

export async function updatePlanByEmail(email, plan){
  const quota = plan === 'pro' ? 200 : plan === 'starter' ? 50 : 3;
  const { error } = await supabaseAdmin
    .from('users')
    .update({ plan, quota_daily: quota })
    .eq('email', email);
  if(error) throw error;
}

export function needReset(resetAtUtc){
  const now = new Date();
  const last = new Date(resetAtUtc || 0);
  // 每日 UTC 00:00 重置（简单实现：跨日就重置）
  return now.toDateString() !== last.toDateString();
}

export async function decQuota(email){
  const { data, error } = await supabaseAdmin.from('users').select('*').eq('email', email).maybeSingle();
  if(error || !data) return { ok:false, reason:'not_found' };
  let { quota_daily, quota_reset_at } = data;

  if(needReset(quota_reset_at)){
    const base = data.plan === 'pro' ? 200 : data.plan === 'starter' ? 50 : 3;
    quota_daily = base;
  }
  if(quota_daily <= 0) return { ok:false, reason:'exhausted' };

  const { error: err2 } = await supabaseAdmin
    .from('users')
    .update({
      quota_daily: quota_daily - 1,
      quota_reset_at: new Date().toISOString()
    })
    .eq('email', email);
  if(err2) return { ok:false, reason:'db' };
  return { ok:true, left: quota_daily - 1, plan: data.plan };
}
