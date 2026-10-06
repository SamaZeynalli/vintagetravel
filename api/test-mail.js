import { Resend } from "resend";

/**
 * MÜVƏQQƏTİ: Resend konfiqurasiyasını yoxlayır.
 * Bazaya heç nə yazmır — yalnız bir test maili göndərib nəticəni qaytarır.
 * Yoxlamadan sonra bu fayl silinəcək.
 */
export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFY_EMAIL?.trim();
  const from =
    process.env.RESEND_FROM?.trim() || "Vintage Travel <onboarding@resend.dev>";

  if (!apiKey || !to) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify(
        {
          hazırdır: false,
          RESEND_API_KEY: Boolean(apiKey),
          NOTIFY_EMAIL: to || null,
        },
        null,
        2,
      ),
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: to.split(",").map((a) => a.trim()),
      subject: "Vintage Travel — bildiriş sistemi yoxlanışı",
      html: `<div style="font-family:system-ui,sans-serif">
        <h2 style="color:#246065">Bildiriş sistemi işləyir ✅</h2>
        <p>Bu, avtomatik yoxlama mailidir. Bundan sonra saytdan gələn
        hər sifariş sorğusu bu ünvana göndəriləcək.</p>
      </div>`,
    });

    res.statusCode = 200;
    res.end(
      JSON.stringify(
        {
          hazırdır: !error,
          göndərildi: data?.id ?? null,
          ünvan: to,
          göndərən: from,
          xəta: error ? { ad: error.name, mesaj: error.message } : null,
        },
        null,
        2,
      ),
    );
  } catch (e) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({ hazırdır: false, istisna: String(e?.message ?? e) }, null, 2),
    );
  }
}
