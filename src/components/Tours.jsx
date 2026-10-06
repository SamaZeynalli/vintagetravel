import { Clock, Heart, MapPin } from "lucide-react";
import { tours } from "@/data/tours";
import { useTourStore } from "@/store/useTourStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Tam klas adları — Tailwind şablonla yığılan klasları silir. */
const TONES = {
  lagoon: { bar: "bg-lagoon", badge: "bg-lagoon/15 text-brand-deep" },
  coral: { bar: "bg-coral", badge: "bg-coral/15 text-coral" },
  sun: { bar: "bg-sun", badge: "bg-sun/20 text-brand-deep" },
  brand: { bar: "bg-brand", badge: "bg-brand/12 text-brand" },
};

function Tours() {
  const savedIds = useTourStore((state) => state.savedIds);
  const showSavedOnly = useTourStore((state) => state.showSavedOnly);
  const toggleSaved = useTourStore((state) => state.toggleSaved);
  const toggleShowSavedOnly = useTourStore((state) => state.toggleShowSavedOnly);

  const visibleTours = showSavedOnly
    ? tours.filter((tour) => savedIds.includes(tour.id))
    : tours;

  return (
    <section id="tours" className="scroll-mt-28 bg-secondary py-24">
      <div className="mx-auto w-[1200px] px-10">
        <h2 className="text-center text-4xl text-primary">
          {showSavedOnly ? "Seçdiyiniz turlar" : "Populyar turlar"}
        </h2>
        <p className="mx-auto mt-3 w-[620px] text-center text-muted-foreground">
          {showSavedOnly
            ? "Yadda saxladığınız turlar. Sifariş üçün bizimlə əlaqə saxlayın."
            : "Ən çox seçilən istiqamətlər. Bəyəndiyinizi ürək işarəsi ilə yadda saxlaya bilərsiniz."}
        </p>

        {showSavedOnly && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={toggleShowSavedOnly}>
              Bütün turları göstər
            </Button>
          </div>
        )}

        <div className="mt-14 grid grid-cols-3 gap-6">
          {visibleTours.map((tour) => {
            const saved = savedIds.includes(tour.id);
            const tone = TONES[tour.tone] ?? TONES.brand;

            return (
              <Card
                key={tour.id}
                className="relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Kartın üstündəki rəngli zolaq */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1.5 ${tone.bar}`}
                />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{tour.title}</CardTitle>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {tour.country}
                      </p>
                    </div>

                    {tour.tag && (
                      <Badge className={`border-transparent ${tone.badge}`}>
                        {tour.tag}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="leading-relaxed text-muted-foreground">
                    {tour.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    {tour.duration}
                  </p>
                </CardContent>

                <CardFooter className="justify-between border-t border-border pt-5">
                  <span className="text-2xl font-medium text-brand">{tour.price}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={
                      saved
                        ? `${tour.title} turunu seçilmişlərdən çıxar`
                        : `${tour.title} turunu seçilmişlərə əlavə et`
                    }
                    aria-pressed={saved}
                    onClick={() => toggleSaved(tour.id)}
                  >
                    <Heart
                      className={cn(
                        "transition-colors",
                        saved ? "fill-coral text-coral" : "hover:text-coral",
                      )}
                    />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Tours;
