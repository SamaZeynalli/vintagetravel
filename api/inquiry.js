import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

/**
 * Sifariş formundan gələn sorğuları qəbul edən serverless funksiya.
 *
 * Vercel bu faylı avtomatik olaraq /api/inquiry ünvanında işə salır.
 * Lokal `npm run dev` zamanı isə vite.config.js-dəki devApiPlugin eyni
 * funksiyanı çağırır, ona görə hər iki mühitdə eyni kod işləyir.
 *
 * Supabase açarı YALNIZ burada, serverdə işlənir — brauzerə heç vaxt düşmür.
 */

const MAX = { name: 80, phone: 24, email: 120, tour: 80, message: 1000 };

function cleanString(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

/** Sorğunu yoxlayır, xəta mətnlərini Azərbaycan dilində qaytarır. */
function validate(body) {
  const errors = {};

  const name = cleanString(body.name, MAX.name);
  const phone = cleanString(body.phone, MAX.phone);
  const email = cleanString(body.email, MAX.email);
  const tour = cleanString(body.tour, MAX.tour);
  const message = cleanString(body.message, MAX.message);

  if (name.length < 2) {
    errors.name = "Adınızı yazın (ən azı 2 simvol).";
  }

  // Rəqəmləri sayırıq ki, "+994 50 123 45 67" kimi formatlar da keçsin
  const digitCount = (phone.match(/\d/g) || []).length;
  if (digitCount < 7) {
    errors.phone = "Düzgün telefon nömrəsi yazın.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "E-poçt ünvanı düzgün deyil.";
  }

  return { errors, values: { name, phone, email, tour, message } };
}

/**
 * Vercel `req.body`-ni özü hazırlayır, Vite middleware isə yox.
 * Hər iki halda işləsin deyə lazım olanda özümüz oxuyuruq.
 */
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");

  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}


/** Mətni HTML-ə salmazdan əvvəl təhlükəsiz hala gətirir. */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Yeni sorğu barədə e-poçt bildirişi göndərir.
 *
 * Bilərəkdən "sakit" işləyir: mail getməsə belə xəta atmır, çünki sorğu
 * artıq bazaya yazılıb. Bildiriş problemi ucbatından müştəri itirilməməlidir.
 */
async function sendNotification(values) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFY_EMAIL?.trim();

  if (!apiKey || !to) {
    console.warn("[inquiry] RESEND_API_KEY / NOTIFY_EMAIL yoxdur — mail göndərilmədi");
    return;
  }

  // Domen alınana qədər Resend-in test ünvanından göndəririk
  const from = process.env.RESEND_FROM?.trim() || "Vintage Travel <onboarding@resend.dev>";

  const waNumber = values.phone.replace(/\D/g, "");
  const row = (label, value) =>
    value
      ? `<tr>
           <td style="padding:8px 14px;color:#6b7b7a;white-space:nowrap">${label}</td>
           <td style="padding:8px 14px;color:#23302f"><strong>${escapeHtml(value)}</strong></td>
         </tr>`
      : "";

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      // Cavab düyməsi birbaşa müştəriyə yazsın
      replyTo: values.email || undefined,
      subject: `Yeni sorğu — ${values.name}${values.tour ? ` (${values.tour})` : ""}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
          <h2 style="color:#246065;margin:0 0 4px">Yeni sifariş sorğusu</h2>
          <p style="color:#6b7b7a;margin:0 0 20px">vintagetravel.vercel.app saytından</p>

          <table style="border-collapse:collapse;width:100%;background:#f6f3ec;border-radius:8px">
            ${row("Ad", values.name)}
            ${row("Telefon", values.phone)}
            ${row("E-poçt", values.email)}
            ${row("Tur", values.tour)}
            ${row("Qeyd", values.message)}
          </table>

          <p style="margin:24px 0 0">
            <a href="tel:${escapeHtml(values.phone)}"
               style="background:#246065;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;margin-right:8px">
              Zəng et
            </a>
            <a href="https://wa.me/${waNumber}"
               style="background:#25D366;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">
              WhatsApp
            </a>
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[inquiry] bildiriş maili göndərilmədi:", error);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Yalnız POST sorğusu qəbul edilir." }));
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const body = await readBody(req);
  if (body === null) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "Sorğu formatı düzgün deyil." }));
  }

  // Spam tələsi: gizli sahə doldurulubsa, bot-dur.
  // Bota uğur cavabı veririk ki, yenidən cəhd etməsin.
  if (cleanString(body.website, 100)) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    res.statusCode = 422;
    return res.end(JSON.stringify({ errors }));
  }

  // Panelə yapışdırarkən əvvəl/sonda boşluq və ya sətir sonu qalması
  // çox rast gəlinən haldır — bağlantı sınmasın deyə təmizləyirik
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    // Açarlar qurulmayıbsa sorğunu itirmirik — ən azı loga yazırıq
    console.error("[inquiry] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY təyin edilməyib");
    console.info("[inquiry] qeydə alınmayan sorğu:", values);

    res.statusCode = 503;
    return res.end(
      JSON.stringify({
        error:
          "Sorğu qəbul edilə bilmədi. Zəhmət olmasa telefonla əlaqə saxlayın.",
      }),
    );
  }

  try {
    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("inquiries").insert({
      name: values.name,
      phone: values.phone,
      email: values.email || null,
      tour: values.tour || null,
      message: values.message || null,
    });

    if (error) throw error;

    // Sorğu yazıldı — indi bildiriş. Uğursuz olsa belə cavabı dəyişmir.
    await sendNotification(values);

    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error("[inquiry] bazaya yazmaq alınmadı:", error);

    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        error:
          "Texniki problem yarandı. Zəhmət olmasa telefonla əlaqə saxlayın.",
      }),
    );
  }
}
