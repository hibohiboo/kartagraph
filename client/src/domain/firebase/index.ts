import { initializeApp } from 'firebase/app'
import { getAuth, browserSessionPersistence } from 'firebase/auth'
import { getAnalytics, logEvent } from 'firebase/analytics'
import config from './config'
import type { ReportHandler } from 'web-vitals'

const firebaseApp = initializeApp(config)
export const auth = getAuth(firebaseApp)
const analytics = getAnalytics(firebaseApp)
// export const useSession ()=> auth.setPersistence(browserSessionPersistence)

// web-vial用のハンドラを作成
export const sendToGoogleAnalytics: ReportHandler = ({ name, delta, id }) => {
  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  logEvent(analytics, 'web_vitals', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
    // Use `sendBeacon()` if the browser supports it.
    transport: 'beacon',

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  })
}
