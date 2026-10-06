# Vintage Travel

Vintage Travel səyahət agentliyi üçün sayt.

## Texnologiyalar

- **Vite + React** — build və komponent strukturu
- **shadcn/ui + Tailwind v4** — UI komponentləri və stil
- **Zustand** — qlobal state (seçilmiş turlar)
- **lucide-react** — ikonlar
- **Vercel serverless funksiya** — sifariş formunun backend-i (`api/`)
- **Supabase (Postgres)** — sifariş sorğularının saxlandığı baza

## İşə salmaq

```bash
npm install
npm run dev
```

Sayt `http://localhost:5173/` ünvanında açılır.

```bash
npm run build    # production build
npm run preview  # build-i yoxlamaq
```

## Struktur

```
api/
└── inquiry.js          # sifariş formunu qəbul edən serverless funksiya
supabase/
└── schema.sql          # baza cədvəli (bir dəfə işə salınır)
src/
├── components/
│   ├── Header.jsx      # logo, naviqasiya, seçilmiş sayı, telefon
│   ├── Hero.jsx        # başlıq bölməsi
│   ├── Services.jsx    # xidmət kartları
│   ├── Tours.jsx       # tur kartları
│   ├── BookingForm.jsx # sifariş formu
│   ├── Footer.jsx      # əlaqə və linklər
│   └── ui/             # shadcn komponentləri
├── data/
│   ├── services.js     # xidmətlərin siyahısı
│   ├── tours.js        # turların siyahısı
│   └── contact.js      # telefon, email, Instagram
├── store/
│   └── useTourStore.js # Zustand store
└── assets/             # logo və kompas şəkilləri
```

## Sifariş formunu işə salmaq

Form Supabase-ə yazır. Açarlar qurulmayana qədər form "telefonla əlaqə saxlayın"
mesajı göstərir — sayt sınmır, sadəcə sorğu yazılmır.

1. **supabase.com**-da pulsuz layihə yaradın
2. SQL Editor-da `supabase/schema.sql` faylını işə salın
3. Project Settings → API bölməsindən `URL` və `service_role` açarını götürün
4. Layihə kökündə `.env` faylı yaradın (nümunə: `.env.example`):

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

5. Vercel-də: Project Settings → Environment Variables → eyni iki dəyəri əlavə edin

Gələn sorğulara Supabase panelində **Table Editor → inquiries** bölməsindən baxılır.

## E-poçt bildirişi

Yeni sorğu gələndə mail göndərmək üçün:

1. **resend.com**-da pulsuz hesab açın — **bildirişi almaq istədiyiniz ünvanla**
2. API Keys → yeni açar yaradın
3. Vercel-ə iki dəyişən əlavə edin:

```
RESEND_API_KEY=re_...
NOTIFY_EMAIL=sizin@mail.com
```

Domen alınana qədər Resend yalnız hesabın öz ünvanına göndərə bilir, ona görə
`NOTIFY_EMAIL` Resend hesabının ünvanı ilə eyni olmalıdır.

Bu dəyişənlər olmasa sayt işləməyə davam edir — sorğu bazaya yazılır, sadəcə
mail getmir.

> `service_role` açarı tam giriş hüququna malikdir. Onu heç vaxt frontend koduna
> yazmayın və `VITE_` prefiksi ilə adlandırmayın — əks halda brauzerə düşər.

## Qeyd

Turların və xidmətlərin məzmunu hazırda **nümunə məlumatlardır**. Real
məlumatlar `src/data/` qovluğundakı fayllardan dəyişdirilir.
