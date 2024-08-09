import { Elysia, t } from "elysia";
import { PLACES } from "./places";

const NOMINATIM_URL = process.env.NOMINATIM_URL!;

const IS_NOMINATIM_ON = false

export const routes = new Elysia()
  .get(
    "/v1/getPlacesByName",
    async ({ query, error }) => {
      const searchName = query.name.toLowerCase().trim();
      const locale = query.locale;
      const result = [];
      const filteredPlaces = PLACES.filter(
        (place) =>
          place.name.en.toLowerCase().startsWith(searchName) ||
          place.name.ka.toLowerCase().startsWith(searchName)
      );

      result.push(
        ...filteredPlaces.map((place) => ({
          osm: place.osm,
          name: place.name[locale],
          lat: place.lat,
          lon: place.lon,
        }))
      );

      if (IS_NOMINATIM_ON) {
        try {
          const response = await fetch(
            `${NOMINATIM_URL}/search.php?q=${searchName}&accept-language=${locale}&countrycodes=ge&format=jsonv2`
          );
          const data = await response.json();
          result.push(
            ...data.map((place: any) => ({
              osm: `${place.osm_type[0].toUpperCase()}${place.osm_id}`,
              name: place.display_name,
              lat: place.lat,
              lon: place.lon,
            }))
          );
        } catch (error) {
          console.error(error);
        }
      }

      return result;
    },
    {
      query: t.Object({
        name: t.String(),
        locale: t.Enum({
          en: "en",
          ka: "ka",
        }),
      }),
      detail: {
        summary: "Get places by name",
        tags: ["Places"],
      },

    }
  )
  .get(
    "/v1/getPlaceByOSM",
    async ({ query, error }) => {
      const osm = query.osm;
      const result = PLACES.find((place) => place.osm === osm);

      if (result) {
        return {
          osm: result.osm,
          name: result.name[query.locale],
          lat: result.lat,
          lon: result.lon,
        }
      }

      if (IS_NOMINATIM_ON) {
        try {
          const response = await fetch(
            `${NOMINATIM_URL}/lookup.php?osm_ids=${osm}&accept-language=${query.locale}&countrycodes=ge&format=jsonv2`
          );
          const data = await response.json();
          console.log(data)

          if (data.length >= 1) {
            const doc = data[0];
            return {
              osm,
              name: doc.display_name,
              lat: doc.lat,
              lon: doc.lon,
            };
          }
        } catch (error) {
          console.error(error);
        }
      }

      return error("Not Found");
    },
    {
      query: t.Object({
        osm: t.String(),
        locale: t.Enum({
          en: "en",
          ka: "ka",
        }),
      }),
      detail: {
        summary: "Get place by OSM",
        tags: ["Places"],
      },
    }
  );
