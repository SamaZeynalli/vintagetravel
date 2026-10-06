/** MÜVƏQQƏTİ: göndərilmiş mailin aqibətini Resend-dən soruşur. */
export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const url = new URL(req.url, "http://x");
  const id = url.searchParams.get("id");

  try {
    const response = await fetch(`https://api.resend.com/emails/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const data = await response.json();

    res.statusCode = 200;
    res.end(
      JSON.stringify(
        {
          httpStatus: response.status,
          vəziyyət: data.last_event ?? null,
          kimə: data.to ?? null,
          kimdən: data.from ?? null,
          mövzu: data.subject ?? null,
          cavab: data,
        },
        null,
        2,
      ),
    );
  } catch (e) {
    res.statusCode = 200;
    res.end(JSON.stringify({ xəta: String(e?.message ?? e) }, null, 2));
  }
}
