import { KanbanCard } from './KanbanCard.model'

export interface KanbanCardLayout extends KanbanCard {
  editing: boolean
}
