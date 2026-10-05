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

      const readResult = error
        ? { kod: error.code, mesaj: error.message }
        : { qeyd: "oxunur" };

      // Əsl yoxlama: yazmaq mümkündürmü
      const { error: insertError } = await supabase
        .from("inquiries")
        .insert({ name: "__diaqnostika__", phone: "000", status: "test" });

      dbCheck = {
        oxuma: readResult,
        yazma: insertError
          ? { uğurlu: false, kod: insertError.code, mesaj: insertError.message, ipucu: insertError.hint }
          : { uğurlu: true },
      };
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
        açarRolu: (() => {
          try {
            const payload = JSON.parse(
              Buffer.from(key.split(".")[1], "base64").toString("utf8"),
            );
            return payload.role || "(role sahəsi yoxdur)";
          } catch {
            return "(JWT deyil - yeni formatlı açar ola bilər)";
          }
        })(),
        dbCheck,
        vercelEnv: process.env.VERCEL_ENV || "(yoxdur)",
      },
      null,
      2,
    ),
  );
}
