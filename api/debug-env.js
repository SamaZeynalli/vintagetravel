/**
 * MÜVƏQQƏTİ diaqnostika endpoint-i.
 *
 * Mühit dəyişənlərinin funksiyaya çatıb-çatmadığını yoxlamaq üçündür.
 * DƏYƏRLƏRİ QAYTARMIR — yalnız adların mövcudluğunu və uzunluğunu bildirir.
 * Problem həll olunandan sonra bu fayl silinməlidir.
 */
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // SUPABASE sözünü ehtiva edən bütün dəyişən adları —
  // yazılış səhvini (məsələn SUPBASE_URL) aşkar etmək üçün
  const supabaseVarNames = Object.keys(process.env)
    .filter((name) => /supabase/i.test(name))
    .sort();

  // Bazaya real sorğu göndərib xətanın dəqiq səbəbini öyrənirik
  let dbCheck = { yoxlanılmadı: true };
  if (url && key) {
    try {
      const supabase = createClient(url.trim(), key.trim(), {
        auth: { persistSession: false },
      });
      const { error } = await supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true });

      dbCheck = error
        ? { uğurlu: false, kod: error.code, mesaj: error.message, detal: error.details, ipucu: error.hint }
        : { uğurlu: true, qeyd: "cədvəl mövcuddur və oxunur" };
    } catch (e) {
      dbCheck = { uğurlu: false, istisna: String(e && e.message ? e.message : e) };
    }
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        supabaseVarNames,
        SUPABASE_URL: {
          mövcuddur: Boolean(url),
          uzunluq: url ? url.length : 0,
          düzgünFormat: url ? /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url) : false,
          sondaSlashVar: url ? url.endsWith("/") : false,
          boşluqVar: url ? url !== url.trim() : false,
        },
        SUPABASE_SERVICE_ROLE_KEY: {
          mövcuddur: Boolean(key),
          uzunluq: key ? key.length : 0,
          boşluqVar: key ? key !== key.trim() : false,
        },
        dbCheck,
        vercelEnv: process.env.VERCEL_ENV || "(yoxdur)",
      },
      null,
      2,
    ),
  );
}
