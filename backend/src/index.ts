import { Elysia } from 'elysia';
import { routes } from './routes' //add this line
import { searchRides } from './search-rides';
import { swagger } from '@elysiajs/swagger'
import { basicAuth } from '@eelkevdbos/elysia-basic-auth'

process.env["BASIC_AUTH_CREDENTIALS"] = "admin:admin;user:user"

const app = new Elysia()
  .use(basicAuth({
    realm: 'Hoppla Documentation',
    scope: '/swagger',
  }))

  .use(swagger({
    path: '/swagger',
    swaggerOptions: {

    },

    documentation: {
      info: {
        title: 'Amazing Hoppla API Documentation',
        version: '1.0.0',

      },
      tags: [
        { name: 'Rides', description: 'Ride endpoints' },
        { name: 'Places', description: 'Place endpoints' },
      ]
    },
  }))
  .use(routes) //add this line
  .use(searchRides)
  .listen(3000);

export type App = typeof app;