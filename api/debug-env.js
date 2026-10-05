/**
 * MÜVƏQQƏTİ diaqnostika endpoint-i.
 *
 * Mühit dəyişənlərinin funksiyaya çatıb-çatmadığını yoxlamaq üçündür.
 * DƏYƏRLƏRİ QAYTARMIR — yalnız adların mövcudluğunu və uzunluğunu bildirir.
 * Problem həll olunandan sonra bu fayl silinməlidir.
 */
export default function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // SUPABASE sözünü ehtiva edən bütün dəyişən adları —
  // yazılış səhvini (məsələn SUPBASE_URL) aşkar etmək üçün
  const supabaseVarNames = Object.keys(process.env)
    .filter((name) => /supabase/i.test(name))
    .sort();

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
        vercelEnv: process.env.VERCEL_ENV || "(yoxdur)",
      },
      null,
      2,
    ),
  );
}
