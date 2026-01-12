import { db } from "../../firebase-config"

interface SignUpRequest {
  name: string
  username: string
  email: string
  password: string
}

export class FirebaseInstance {
  async createUser(data: SignUpRequest) {
    try {
      await db.collection('users').add({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password
      })
    } catch (err) {
      console.log(err)
      console.log('erro ao gravar no banco')
    }
  }

}

export const Firebase = new FirebaseInstance()