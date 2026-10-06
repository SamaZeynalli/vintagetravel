import { createClient } from "@supabase/supabase-js";

/** MÜVƏQQƏTİ: yoxlama zamanı yaranmış test sətirlərini silir. */
export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const supabase = createClient(
    process.env.SUPABASE_URL?.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
    { auth: { persistSession: false } },
  );

  const { data, error } = await supabase
    .from("inquiries")
    .delete()
    .ilike("name", "TEST%")
    .select("id");

  const { count } = await supabase
    .from("inquiries")
    .select("id", { count: "exact", head: true });

  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        silindi: error ? null : data.length,
        xəta: error?.message ?? null,
        qalanSətirSayı: count,
      },
      null,
      2,
    ),
  );
}
