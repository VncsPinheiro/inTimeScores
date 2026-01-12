import type { Request, Response } from 'express'
import { Firebase, type FirebaseInstance } from "../services/firebase-service";

class SignUpWithFirebase {
  constructor(private firebase: FirebaseInstance) {}

  handle = async (request: Request, response: Response) => {
    const { email, password, name, username} = request.body
    await this.firebase.createUser({ email, password, name, username})
    response.status(201).send('User created')
  }
}

export const SignUpWithFirebaseController = new SignUpWithFirebase(Firebase)