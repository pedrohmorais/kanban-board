'use client'
import { KanbanCard } from '@/app/types/KanbanCard.model'
import { KanbanCardStatus } from '@/app/types/KanbanCardStatus.model'
import { CardsService } from '@/services/client/cards.service'
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  NoSymbolIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/solid'
import React, { ChangeEvent, useState } from 'react'

type CardProps = {
  card: KanbanCard
  onAdd: (card: KanbanCard) => void
  onDelete: (card: KanbanCard) => void
}

function Card({ card, onAdd, onDelete }: CardProps) {
  const { id, title, status, content } = card
  const [editableTitle, setEditableTitle] = useState(title)
  const [adding, setAdding] = useState(false)
  const [upddating, setUpddating] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editableContent, setEditableContent] = useState(content)
  const isNewCard = status === KanbanCardStatus.NEW
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value)
  }
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)
  }
  const renderTitle = () => {
    if (isNewCard || editMode) {
      return (
        <input
          placeholder="Title"
          type="text"
          className="text-lg p-2 rounded font-semibold mb-2 w-full"
          value={editableTitle}
          onChange={handleTitleChange}
        />
      )
    }
    return <h2 className="text-lg font-semibold mb-2">{title}</h2>
  }
  const renderContent = () => {
    if (isNewCard || editMode) {
      return (
        <textarea
          placeholder="Content"
          className="text-gray-700 p-2 rounded w-full h-24 resize-none"
          rows={4}
          value={editableContent}
          onChange={handleContentChange}
        />
      )
    }
    return <p className="text-gray-700">{content}</p>
  }
  const resetNewCard = () => {
    setEditableTitle('')
    setEditableContent('')
  }
  const addCard = () => {
    setAdding(true)
    CardsService.addCards({
      content: editableContent,
      status: KanbanCardStatus.TODO,
      title: editableTitle,
    })
      .then((newCard) => {
        resetNewCard()
        onAdd(newCard as KanbanCard)
      })
      .finally(() => {
        setAdding(false)
      })
  }
  const updateCard = () => {
    setUpddating(true)
    CardsService.updateCard({
      id,
      content: editableContent,
      status,
      title: editableTitle,
    }).finally(() => {
      setUpddating(false)
      setEditMode(false)
    })
  }
  const deleteCard = () => {
    setUpddating(true)
    CardsService.deleteCard(id)
      .then(() => {
        resetNewCard()
        onDelete(card)
      })
      .finally(() => {
        setUpddating(false)
      })
  }
  const discardChanges = () => {
    setEditableTitle(title)
    setEditableContent(content)
    setEditMode(false)
  }

  const renderAddBtn = (
    <button
      onClick={() => addCard()}
      disabled={adding}
      className="bg-green-500 text-white py-2 px-4 rounded-full"
    >
      <PlusIcon className="h-5 w-5 text-white" />
    </button>
  )
  const editBtn = (
    <button
      onClick={() => setEditMode(!editMode)}
      disabled={upddating}
      className="bg-blue-600 text-white py-2 px-4 rounded-full"
    >
      <PencilSquareIcon className="h-5 w-5 text-white" />
    </button>
  )
  const saveBtn = (
    <button
      onClick={() => updateCard()}
      disabled={upddating}
      className="bg-green-600 text-white py-2 px-4 rounded-full"
    >
      <DocumentCheckIcon className="h-5 w-5 text-white" />
    </button>
  )
  const deleteBtn = (
    <button
      onClick={() => deleteCard()}
      disabled={upddating || editMode}
      className="bg-red-500 text-white py-2 px-4 rounded-full"
    >
      <TrashIcon className="h-5 w-5 text-white" />
    </button>
  )

  const discardBtn = (
    <button
      onClick={() => discardChanges()}
      disabled={upddating}
      className="bg-red-500 text-white py-2 px-4 rounded-full"
    >
      <NoSymbolIcon className="h-5 w-5 text-white" />
    </button>
  )
  return (
    <div className="w-full mt-4 rounded bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-4">
        {renderTitle()}
        {renderContent()}
        <div className="flex items-center justify-between mt-4">
          {isNewCard && renderAddBtn}
          {!isNewCard && !editMode && editBtn}
          {!isNewCard && !editMode && deleteBtn}
          {editMode && saveBtn}
          {editMode && discardBtn}
        </div>
      </div>
    </div>
  )
}
export default Card
