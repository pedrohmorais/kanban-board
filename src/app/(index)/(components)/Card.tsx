'use client'
import ReactMarkdown from 'react-markdown'
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
import React, { ChangeEvent, useEffect, useState } from 'react'

type CardProps = {
  card: KanbanCard
  onAdd: (card: KanbanCard) => void
  onDelete: (card: KanbanCard) => void
}

function Card({ card, onAdd, onDelete }: CardProps) {
  const { id, title, status, content } = card
  const [currentTitle, setCurrentTitle] = useState(title)
  const [currentContent, setCurrentContent] = useState(content)
  const [editableTitle, setEditableTitle] = useState(title)
  const [editableContent, setEditableContent] = useState(content)
  // const [invalidFields, setInvalidFields] = useState(true)
  const [adding, setAdding] = useState(false)
  const [upddating, setUpddating] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const isNewCard = status === KanbanCardStatus.NEW

  // useEffect(() => {
  //   let valid = true
  //   if (!editableTitle) {
  //     valid = false
  //   }
  //   if (!editableContent) {
  //     valid = false
  //   }
  //   setInvalidFields(valid)
  // }, [editableTitle, editableContent])

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
    return <h2 className="text-lg font-semibold mb-2">{currentTitle}</h2>
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
    return (
      <ReactMarkdown className="text-gray-700">{currentContent}</ReactMarkdown>
    )
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
    })
      .then(() => {
        setCurrentTitle(editableTitle)
        setCurrentContent(editableContent)
        setEditMode(false)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message)
      })
      .finally(() => {
        setUpddating(false)
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
    setEditableTitle(currentTitle)
    setEditableContent(currentContent)
    setEditMode(false)
  }

  const renderAddBtn = () => {
    const isBtnDisabled = !editableTitle.trim() || !editableContent.trim()
    return (
      <button
        onClick={() => addCard()}
        disabled={adding || isBtnDisabled}
        className={`bg-green-500 text-white py-2 px-4 rounded-full ${
          isBtnDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <PlusIcon className="h-5 w-5 text-white" />
      </button>
    )
  }
  const editBtn = (
    <button
      onClick={() => setEditMode(!editMode)}
      disabled={upddating}
      className="bg-blue-600 text-white py-2 px-4 rounded-full"
    >
      <PencilSquareIcon className="h-5 w-5 text-white" />
    </button>
  )
  const saveBtn = () => {
    const isSaveButtonDisabled =
      !editableTitle.trim() || !editableContent.trim()

    return (
      <button
        onClick={() => updateCard()}
        disabled={upddating || isSaveButtonDisabled}
        className={`bg-green-600 text-white py-2 px-4 rounded-full ${
          isSaveButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <DocumentCheckIcon className="h-5 w-5 text-white" />
      </button>
    )
  }
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
          {isNewCard && renderAddBtn()}
          {!isNewCard && !editMode && editBtn}
          {!isNewCard && !editMode && deleteBtn}
          {editMode && saveBtn()}
          {editMode && discardBtn}
        </div>
      </div>
    </div>
  )
}
export default Card
