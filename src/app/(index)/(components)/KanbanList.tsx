'use client'
import { KanbanCardStatus } from '@/app/types/KanbanCardStatus.model'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { KanbanCard } from '@/app/types/KanbanCard.model'
import { CardsService } from '@/services/client/cards.service'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import KanbanBoardSkeleton from './KanbanListSkeleton'
import { LoginService } from '@/services/client/login.service'

type KanbanColumn = {
  key: string
  title: string
  cards: KanbanCard[]
}
type KanbanColumnObj = Record<KanbanCardStatus, KanbanColumn>

const defaultKanbanCardStatusTitles: KanbanColumnObj = {
  [KanbanCardStatus.NEW]: { key: 'NEW', title: 'New', cards: [] },
  [KanbanCardStatus.TODO]: { key: 'TODO', title: 'To do', cards: [] },
  [KanbanCardStatus.DOING]: { key: 'DOING', title: 'Doing', cards: [] },
  [KanbanCardStatus.DONE]: { key: 'DONE', title: 'Done', cards: [] },
}

function KanbanBoard({ username, password }) {
  const [kanbanCardStatusTitles, setKanbanCardStatusTitles] =
    useState<KanbanColumnObj>()

  const [loading, setLoading] = useState<boolean>(true)
  const [renders, setRenders] = useState<number>(0)

  useEffect(() => {
    LoginService.login(username, password).then(() => {
      CardsService.getCards().then((r) => {
        const cards = r as KanbanCard[]
        const newKanbanCardStatusTitles = defaultKanbanCardStatusTitles
        cards.forEach((card) => {
          newKanbanCardStatusTitles[card.status].cards.push(card)
        })
        const defaultColumn: KanbanCard = {
          id: 0,
          content: '',
          status: KanbanCardStatus.NEW,
          title: '',
        }
        newKanbanCardStatusTitles[KanbanCardStatus.NEW].cards = [defaultColumn]
        setKanbanCardStatusTitles(newKanbanCardStatusTitles)
        setLoading(false)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddCard = (card: KanbanCard) => {
    if (!kanbanCardStatusTitles) {
      return
    }
    const newKanbanCardStatusTitles = kanbanCardStatusTitles
    newKanbanCardStatusTitles[card.status].cards.push(card)
    setKanbanCardStatusTitles(newKanbanCardStatusTitles)
    setRenders(renders + 1)
  }

  const handleDeleteCard = (card: KanbanCard) => {
    if (!kanbanCardStatusTitles) {
      return
    }
    const newKanbanCardStatusTitles = kanbanCardStatusTitles
    newKanbanCardStatusTitles[card.status].cards = newKanbanCardStatusTitles[
      card.status
    ].cards.filter(({ id }) => id !== card.id)
    setKanbanCardStatusTitles(newKanbanCardStatusTitles)
    setRenders(renders + 1)
  }

  const handleDragEnd = (result) => {
    if (!kanbanCardStatusTitles) {
      return
    }
    if (!result.destination) {
      return
    }
    const destinationID: KanbanCardStatus = result.destination
      .droppableId as KanbanCardStatus
    const sourceID: KanbanCardStatus = result.source
      .droppableId as KanbanCardStatus
    const sourceIndex = result.source.index
    const newKanbanCardStatusTitles = kanbanCardStatusTitles

    const removedCard: KanbanCard = newKanbanCardStatusTitles[
      KanbanCardStatus[sourceID]
    ].cards.splice(sourceIndex, 1)[0]
    removedCard.status = KanbanCardStatus[destinationID]

    console.log('removedCard', removedCard)

    newKanbanCardStatusTitles[KanbanCardStatus[destinationID]].cards.push(
      removedCard,
    )

    CardsService.updateCard(removedCard)
    setKanbanCardStatusTitles(newKanbanCardStatusTitles)
    setRenders(renders + 1)
  }

  const renderColumn = ({ title, cards, key }: KanbanColumn) => (
    <Droppable
      droppableId={key}
      key={`kanbanListColumn-${key}`}
      isDropDisabled={key === 'NEW'}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-1/4 p-4 rounded bg-gray-100 kanban-column"
          id={`kanban-column-${key}`}
          data-status={key}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          {cards.map((card, index) => (
            <Draggable
              id={`kanbanCard-${card.id}`}
              key={`kanbanCard-${card.id}`}
              draggableId={String(card.id)}
              index={index}
              isDragDisabled={card.status === KanbanCardStatus.NEW}
            >
              {(provided) => (
                <div
                  className="kanban-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    card={card}
                    onAdd={handleAddCard}
                    onDelete={handleDeleteCard}
                  ></Card>
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  )
  if (loading || !kanbanCardStatusTitles) {
    return <KanbanBoardSkeleton></KanbanBoardSkeleton>
  }

  return (
    <div className="flex space-x-4" key={`renders-${renders}`}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.values(kanbanCardStatusTitles).map(renderColumn)}
      </DragDropContext>
    </div>
  )
}

export default KanbanBoard
