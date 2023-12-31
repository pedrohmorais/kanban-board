import { KanbanCard } from '@/app/types/KanbanCard.model'
import { HttpError } from '@/utils/HttpError'
import { PostCardProps } from '@/pages/api/cards'
import axiosConfig from './axios.service'

export class CardsService {
  public static async getCards(): Promise<KanbanCard[] | HttpError> {
    return axiosConfig.get('/cards').then(({ data }) => data)
  }

  public static async addCards(
    card: PostCardProps,
  ): Promise<KanbanCard | HttpError> {
    return axiosConfig.post('/cards', card).then(({ data }) => data)
  }

  public static async updateCard(
    card: KanbanCard,
  ): Promise<KanbanCard | HttpError> {
    return axiosConfig.put(`/cards/${card.id}`, card).then(({ data }) => data)
  }

  public static async deleteCard(cardId: number): Promise<boolean | HttpError> {
    return axiosConfig.delete(`/cards/${cardId}`).then(({ data }) => data)
  }
}
