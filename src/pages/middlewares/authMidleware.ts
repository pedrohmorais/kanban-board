import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpStatusCode } from 'axios'

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET_KEY

export const authMiddleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: 'Token não fornecido' })
    }

    try {
      jwt.verify(token, SECRET_KEY)
      await handler(req, res)
    } catch (error) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: 'Token inválido ou expirado' })
    }
  }
