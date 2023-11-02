/* eslint-disable @typescript-eslint/no-explicit-any */
import { KanbanCard } from '@/app/types/KanbanCard.model'
import { KanbanCardStatus } from '@/app/types/KanbanCardStatus.model'
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
      const cards: KanbanCard[] = [
        {
          id: 9,
          content: 'asdas',
          status: KanbanCardStatus.DOING,
          title: 'titulo',
        },
      ]
      this.res.status(HttpStatusCode.OK).json(cards)
      return cards
    } catch (err) {
      const handleError = new HandleError(err)
      this.res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(handleError.err)
      return handleError.err
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
}
