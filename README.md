# Vintage Travel

Vintage Travel səyahət agentliyi üçün sayt.

## Texnologiyalar

- **Vite + React** — build və komponent strukturu
- **shadcn/ui + Tailwind v4** — UI komponentləri və stil
- **Zustand** — qlobal state (seçilmiş turlar)
- **lucide-react** — ikonlar

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
src/
├── components/
│   ├── Header.jsx      # logo, naviqasiya, seçilmiş sayı, telefon
│   ├── Hero.jsx        # başlıq bölməsi
│   ├── Services.jsx    # xidmət kartları
│   ├── Tours.jsx       # tur kartları
│   └── ui/             # shadcn komponentləri
├── data/
│   ├── services.js     # xidmətlərin siyahısı
│   └── tours.js        # turların siyahısı
├── store/
│   └── useTourStore.js # Zustand store
└── assets/             # logo və kompas şəkilləri
```

## Qeyd

Turların və xidmətlərin məzmunu hazırda **nümunə məlumatlardır**. Real
məlumatlar `src/data/` qovluğundakı fayllardan dəyişdirilir.
