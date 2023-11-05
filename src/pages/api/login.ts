import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { HttpStatusCode } from 'axios'

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET_KEY

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    if (
      username === process.env.API_LOGIN &&
      password === process.env.API_PASSWORD
    ) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
      res.status(HttpStatusCode.Ok).json({ token })
    } else {
      res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: 'Credenciais inválidas' })
    }
  } else {
    res.status(HttpStatusCode.Unauthorized).end()
  }
}
