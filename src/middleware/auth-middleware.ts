import type { NextFunction, Request, Response } from 'express'
import admin from 'firebase-admin'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Acesso negado. Token não fornecido.' })
    }

    const token = authHeader.split('Bearer ')[1]

    try {
      const decodedToken = await admin.auth().verifyIdToken(token)

      req.body.userId = decodedToken.uid
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido ou expirado.' })
    }
}