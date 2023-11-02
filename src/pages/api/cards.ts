import { KanbanCard } from '@/app/types/KanbanCard.model'
import { CardsService } from '@/services/cards.service'
import { HttpError, HttpStatusCode } from '@/utils/HttpError'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponsesType = KanbanCard[] | KanbanCard | string
export type PostCardProps = Omit<KanbanCard, 'id'>

const addCard = (card: PostCardProps): KanbanCard => {
  const newCard: KanbanCard = { ...card, id: 0 }
  return newCard
}

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
      try {
        res.status(200).json(addCard(req.body as PostCardProps))
      } catch (err) {
        // handleError(err as HttpError, res)
      }
      break
    default:
      console.log('aqui')
    // handleError(new HttpError(HttpStatusCode.NOT_FOUND, 'Not found'), res)
  }
}
