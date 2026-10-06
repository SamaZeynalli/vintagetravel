/**
 * Əlaqə məlumatları — bir yerdə saxlanılır ki, dəyişmək asan olsun.
 * Header, Contacts, Footer və BookingForm hamısı buradan oxuyur.
 */

export const CONTACT = {
  // QEYD: email hələ nümunədir, real ünvanla əvəz edilməlidir.
  email: "info@vintagetravel.az",
  address: "Bakı, Azərbaycan",
  instagram: "https://www.instagram.com/vintagetravel.az",
  instagramHandle: "@vintagetravel.az",
};

/**
 * Agentlər və onların birbaşa nömrələri.
 *
 * phone      — ekranda göstərilən format
 * phoneHref  — tel: linki üçün (boşluqsuz)
 * whatsapp   — wa.me linki üçün (ölkə kodu, + və boşluq olmadan)
 */
export const AGENTS = [
  {
    id: "ulfana",
    name: "Ülfanə Mahmudova",
    phone: "+994 50 693 90 96",
    phoneHref: "+994506939096",
    whatsapp: "994506939096",
  },
  {
    id: "gunay",
    name: "Günay Mustafazadə",
    phone: "+994 50 693 90 95",
    phoneHref: "+994506939095",
    whatsapp: "994506939095",
  },
  {
    id: "vusala",
    name: "Vüsalə Mirzəxanlı",
    phone: "+994 50 693 90 97",
    phoneHref: "+994506939097",
    whatsapp: "994506939097",
  },
];

/** Header kimi tək nömrə lazım olan yerlər üçün əsas əlaqə. */
export const PRIMARY_AGENT = AGENTS[0];

/** Hazır mətnlə WhatsApp söhbətini açan link qurur. */
export function whatsappLink(agent, message = "Salam! Saytınız vasitəsilə yazıram.") {
  return `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(message)}`;
}
