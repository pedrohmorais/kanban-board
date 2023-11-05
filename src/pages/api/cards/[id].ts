import { KanbanCard } from '@/app/types/KanbanCard.model'
import { authMiddleware } from '@/pages/middlewares/authMidleware'
import logMiddleware from '@/pages/middlewares/logMiddleware'
import { CardsService } from '@/services/server/CardService'
import { HttpStatusCode } from '@/utils/HttpError'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponsesType = KanbanCard[] | KanbanCard | string
export type PostCardProps = Omit<KanbanCard, 'id'>

export default authMiddleware(
  logMiddleware(
    async (req: NextApiRequest, res: NextApiResponse<ResponsesType>) => {
      const { method } = req
      const cardService = new CardsService(res)
      const { id } = req.query

      switch (method) {
        case 'PUT':
          cardService.updateCard({
            ...req.body,
            id,
          } as KanbanCard)
          break
        case 'DELETE':
          cardService.deleteCard(Number(id))
          break
        default:
          res.status(HttpStatusCode.NOT_FOUND)
      }
    },
  ),
)
