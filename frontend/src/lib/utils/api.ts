import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../../backend/src/index'
import { menv } from './menv'

const api = edenTreaty<App>(menv.BACKEND_URL)

export default api
