import { KanbanCardStatus } from './KanbanCardStatus.model'

export interface KanbanCard {
  id: number
  title: string
  content: string
  status: KanbanCardStatus
}
