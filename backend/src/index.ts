import { Elysia, redirect } from "elysia";
import { routes } from "./routes";
import { searchRides } from "./search-rides";
import { swagger } from "@elysiajs/swagger";
import basicAuth from "basic-auth";
import { timingSafeEqual } from "crypto";

const app = new Elysia()
  .get("/", redirect("/swagger"))
  .onRequest(({ request, set }) => {
    if (request.url.includes("/swagger")) {
      const credentials = basicAuth({
        headers: {
          authorization: request.headers.get("authorization") || "",
        },
      });

      if (!credentials) {
        set.status = 401;
        set.headers = {
          "WWW-Authenticate": 'Basic realm="Hoppla Documentation"',
        };
        return "Unauthorized";
      }

      const nameBuffer = Buffer.from(credentials.name);
      const passBuffer = Buffer.from(credentials.pass);
      const adminBuffer = Buffer.from("admin");
      const passCheckBuffer = Buffer.from("amazingdemetreshonia");

      if (
        nameBuffer.length !== adminBuffer.length ||
        passBuffer.length !== passCheckBuffer.length
      ) {
        set.status = 401;
        set.headers = {
          "WWW-Authenticate": 'Basic realm="Hoppla Documentation"',
        };
        return "Unauthorized";
      }

      if (
        !timingSafeEqual(nameBuffer, adminBuffer) ||
        !timingSafeEqual(passBuffer, passCheckBuffer)
      ) {
        set.status = 401;
        set.headers = {
          "WWW-Authenticate": 'Basic realm="Hoppla Documentation"',
        };
        return "Unauthorized";
      }
    }
  })
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Amazing Hoppla API Documentation",
          version: "1.0.0",
        },
        tags: [
          { name: "Rides", description: "Ride endpoints" },
          { name: "Places", description: "Place endpoints" },
        ],
      },
    })
  )
  .use(routes)
  .use(searchRides)
  .get("/health", () => {
    return { status: "OK" };
  })
  .listen(process.env.PORT || 3000);

export type App = typeof app;
