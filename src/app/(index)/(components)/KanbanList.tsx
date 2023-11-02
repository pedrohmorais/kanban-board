'use client'
import { KanbanCardStatus } from '@/app/types/KanbanCardStatus.model'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { KanbanCard } from '@/app/types/KanbanCard.model'

type KanbanColumn = {
  title: string
  cards: KanbanCard[]
}
type KanbanColumnObj = Record<KanbanCardStatus, KanbanColumn>

function KanbanBoard() {
  const [kanbanCardStatusTitles, setKanbanCardStatusTitles] =
    useState<KanbanColumnObj>({
      [KanbanCardStatus.NEW]: { title: 'New', cards: [] },
      [KanbanCardStatus.TODO]: { title: 'To do', cards: [] },
      [KanbanCardStatus.DOING]: { title: 'Doing', cards: [] },
      [KanbanCardStatus.DONE]: { title: 'Done', cards: [] },
    })

  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const newColumns = kanbanCardStatusTitles
    if (newColumns[KanbanCardStatus.NEW].cards.length > 0) {
      return
    }
    const defaultColumn: KanbanCard = {
      id: 0,
      content: '',
      status: KanbanCardStatus.NEW,
      title: '',
    }
    newColumns[KanbanCardStatus.NEW].cards = [defaultColumn]
    setKanbanCardStatusTitles(newColumns)
    setLoading(false)
  }, [kanbanCardStatusTitles])
  const renderColumn = ({ title, cards }: KanbanColumn, key: number) => (
    <div
      className="w-1/4 p-4 rounded bg-gray-100"
      key={`kanbanListColumn-${key}`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {cards.map((card) => (
        <Card key={title} card={card}></Card>
      ))}
    </div>
  )
  const renderColumns = loading
    ? undefined
    : Object.values(kanbanCardStatusTitles).map(renderColumn)
  return <div className="flex space-x-4">{renderColumns}</div>
}

export default KanbanBoard
