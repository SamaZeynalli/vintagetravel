import { createClient } from "@supabase/supabase-js";

/** MÜVƏQQƏTİ: diaqnostika zamanı yaranmış test sətirlərini silir. */
export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await supabase
    .from("inquiries")
    .delete()
    .in("name", ["__diaqnostika__", "TEST - Claude yoxlaması", "TEST - silinsin"])
    .select("id");

  const { count } = await supabase
    .from("inquiries")
    .select("id", { count: "exact", head: true });

  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        silinənSətirlər: error ? null : data.length,
        xəta: error ? error.message : null,
        qalanSətirSayı: count,
      },
      null,
      2,
    ),
  );
}
