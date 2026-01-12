import admin from 'firebase-admin'
import { env } from "./src/env"

const serviceAccount = require(env.FIREBASE_KEY_PATH)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const db = admin.firestore();