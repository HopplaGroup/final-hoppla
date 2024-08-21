import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";

export default async function PlaceTitle({ osm }: { osm: string }) {
  return (
    PLACES.find((place) => place.osm === osm)?.name[languageTag()] || "Unknown"
  );
}
