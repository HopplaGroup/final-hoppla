import { Elysia } from 'elysia';
import { routes } from './routes' //add this line
import { searchRides } from './search-rides';
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'Test Hoppla API Documentation',
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