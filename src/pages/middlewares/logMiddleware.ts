import { format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const logMiddleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // Crie uma cópia da função "send" original do objeto de resposta (res).
    const originalSend = res.send
    const formattedDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss')

    // Substitua a função "send" pelo seu próprio wrapper.
    res.send = (body) => {
      // Registre o corpo da resposta no console.log.
      console.log(
        `${formattedDate} - Card ${req.query.id} - ${req.body?.title} - ${
          req.method === 'PUT' ? 'Alterar' : 'Remover'
        }`,
      )
      // Chame a função "send" original com o corpo da resposta.
      originalSend.call(res, body)
    }

    // Chame o manipulador de rota original.
    await handler(req, res)
  }

export default logMiddleware
