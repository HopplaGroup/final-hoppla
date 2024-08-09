import { describe, expect, it } from 'bun:test'
import '../src/index'
import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../src/index'

// const { api: { v1 } } = edenTreaty<App>('http://localhost:3000')


// describe('Get Users', () => {
//   it('return a response', async () => {
//     const { data } = await v1.users.get()

//     expect(data).toBeArray()
//   })
// })