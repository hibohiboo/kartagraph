import { initializeApp } from 'firebase/app'
import { getAuth, browserSessionPersistence } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import config from './config'

const firebaseApp = initializeApp(config)
export const auth = getAuth(firebaseApp)
const analytics = getAnalytics(firebaseApp)
// export const useSession ()=> auth.setPersistence(browserSessionPersistence)
