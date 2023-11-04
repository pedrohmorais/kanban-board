/* eslint-disable @typescript-eslint/no-explicit-any */
import { KanbanCard } from '@/app/types/KanbanCard.model'
import CardModel from '@/database/models/CardModel'
import { PostCardProps } from '@/pages/api/cards'
import { HandleError, HttpError, HttpStatusCode } from '@/utils/HttpError'
import { NextApiResponse } from 'next'

export class CardsService {
  res: NextApiResponse<any>
  constructor(res: NextApiResponse<any>) {
    this.res = res
  }

  public async getCards(): Promise<KanbanCard[] | HttpError> {
    try {
      const cards = await CardModel.findAll()
      const kanbanCards: KanbanCard[] = cards.map((card) => card.dataValues)
      this.res.status(HttpStatusCode.OK).json(kanbanCards)
      return kanbanCards
    } catch (err) {
      return this.throwError(err)
    }
  }

  private throwError(err: any): HttpError {
    const handleError = new HandleError(err)
    this.res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(handleError.err)
    return handleError.err
  }

  public async addCard(card: PostCardProps): Promise<KanbanCard | HttpError> {
    const { title, content, status } = card
    return CardModel.create({ title, content, status })
      .then((r: CardModel) => {
        this.res.status(HttpStatusCode.OK).json(r.dataValues)
        return r.dataValues
      })
      .catch((err) => {
        return this.throwError(err)
      })
  }

  public async updateCard(card: KanbanCard): Promise<KanbanCard | HttpError> {
    const { id, title, content, status } = card

    try {
      const existingCard = await CardModel.findByPk(id)
      if (!existingCard) {
        const err = new HttpError(HttpStatusCode.NOT_FOUND, 'Card not found')
        return this.throwError(err)
      }

      existingCard.title = title
      existingCard.content = content
      existingCard.status = status

      await existingCard.save()

      this.res.status(HttpStatusCode.OK).json(existingCard.dataValues)
      return existingCard.dataValues
    } catch (err) {
      return this.throwError(err)
    }
  }
}
