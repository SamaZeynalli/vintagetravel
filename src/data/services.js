import { Plane, BedDouble, FileCheck, ShieldCheck, Ship, Globe2 } from "lucide-react";

// Nümunə xidmətlər — sonra real siyahı ilə əvəz ediləcək.
export const services = [
  {
    id: "avia",
    icon: Plane,
    title: "Aviabiletlər",
    description:
      "Dünyanın istənilən istiqamətinə ən sərfəli qiymətlə aviabilet rezervasiyası.",
  },
  {
    id: "hotel",
    icon: BedDouble,
    title: "Otel rezervasiyası",
    description:
      "Büdcənizə uyğun 3-5 ulduzlu otellərdə zəmanətli yer rezervasiyası.",
  },
  {
    id: "visa",
    icon: FileCheck,
    title: "Viza dəstəyi",
    description:
      "Sənədlərin hazırlanması, müraciət və randevu prosesində tam müşayiət.",
  },
  {
    id: "insurance",
    icon: ShieldCheck,
    title: "Səyahət sığortası",
    description:
      "Səfər müddətində sizi qoruyan beynəlxalq tibbi sığorta polisi.",
  },
  {
    id: "cruise",
    icon: Ship,
    title: "Kruiz turları",
    description:
      "Aralıq dənizi və Avropa istiqamətləri üzrə kruiz gəmisi turları.",
  },
  {
    id: "corporate",
    icon: Globe2,
    title: "Korporativ səfərlər",
    description:
      "Şirkətlər üçün iş səfərləri, konfrans və komanda səyahətlərinin təşkili.",
  },
];
