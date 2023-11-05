import { KanbanCard } from '@/app/types/KanbanCard.model'
import { PostCardProps } from '@/pages/api/cards'
import { HttpError } from '@/utils/HttpError'

export interface ICardsService {
  getCards(): Promise<KanbanCard[] | HttpError>
  addCard(card: PostCardProps): Promise<KanbanCard | HttpError>
  updateCard(card: KanbanCard): Promise<KanbanCard | HttpError>
  deleteCard(id: number): Promise<KanbanCard[] | HttpError>
}
