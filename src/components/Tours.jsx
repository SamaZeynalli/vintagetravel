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

function Tours() {
  const savedIds = useTourStore((state) => state.savedIds);
  const toggleSaved = useTourStore((state) => state.toggleSaved);

  return (
    <section id="tours" className="bg-secondary py-24">
      <div className="mx-auto w-[1200px] px-10">
        <h2 className="text-center text-4xl text-primary">Populyar turlar</h2>
        <p className="mx-auto mt-3 w-[620px] text-center text-muted-foreground">
          Ən çox seçilən istiqamətlər. Bəyəndiyinizi ürək işarəsi ilə yadda
          saxlaya bilərsiniz.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6">
          {tours.map((tour) => {
            const saved = savedIds.includes(tour.id);

            return (
              <Card key={tour.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{tour.title}</CardTitle>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {tour.country}
                      </p>
                    </div>

                    {tour.tag && <Badge variant="secondary">{tour.tag}</Badge>}
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
                  <span className="text-xl text-primary">{tour.price}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Seçilmişlərə əlavə et"
                    aria-pressed={saved}
                    onClick={() => toggleSaved(tour.id)}
                  >
                    <Heart
                      className={cn(saved && "fill-primary text-primary")}
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
