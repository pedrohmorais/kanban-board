import { KanbanCard } from '@/app/types/KanbanCard.model'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<KanbanCard[]>,
) {
  const cards: KanbanCard[] = []
  res.status(200).json(cards)
}
