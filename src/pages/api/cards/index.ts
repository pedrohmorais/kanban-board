import { KanbanCard } from '@/app/types/KanbanCard.model'
import { CardsService } from '@/services/server/cards.service'
import { HttpStatusCode } from '@/utils/HttpError'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponsesType = KanbanCard[] | KanbanCard | string
export type PostCardProps = Omit<KanbanCard, 'id'>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsesType>,
) {
  const { method } = req
  const cardService = new CardsService(res)

  switch (method) {
    case 'GET':
      cardService.getCards()
      break
    case 'POST':
      cardService.addCard(req.body as PostCardProps)
      break
    default:
      res.status(HttpStatusCode.NOT_FOUND)
  }
}
