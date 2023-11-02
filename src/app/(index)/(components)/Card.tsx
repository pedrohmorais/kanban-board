import { KanbanCard } from '@/app/types/KanbanCard.model'
import { KanbanCardStatus } from '@/app/types/KanbanCardStatus.model'
import { PlusIcon } from '@heroicons/react/24/solid'
import React, { ChangeEvent, useState } from 'react'

type CardProps = {
  card: KanbanCard
}

function Card({ card: { title, status, content } }: CardProps) {
  const [editableTitle, setEditableTitle] = useState(title)
  const [editableContent, setEditableContent] = useState(content)
  const isNewCard = status === KanbanCardStatus.NEW
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value)
  }
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)
  }
  const renderTitle = () => {
    if (isNewCard) {
      return (
        <input
          placeholder="Título"
          type="text"
          className="text-lg font-semibold mb-2 w-full"
          value={editableTitle}
          onChange={handleTitleChange}
        />
      )
    }
    return <h2 className="text-lg font-semibold mb-2">{title}</h2>
  }
  const renderContent = () => {
    if (isNewCard) {
      return (
        <textarea
          className="text-gray-700 w-full h-24 resize-none"
          rows={4}
          value={editableContent}
          onChange={handleContentChange}
        />
      )
    }
    return <p className="text-gray-700">{content}</p>
  }
  const addCard = () => {
    console.log('adicionar card')
  }
  const renderAddBtn = (
    <button
      onClick={() => addCard()}
      className="bg-green-500 text-white py-2 px-4 rounded-full"
    >
      <PlusIcon className="h-5 w-5 text-white" />
    </button>
  )
  return (
    <div className="w-full p-4 rounded bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-4">
        {renderTitle()}
        {renderContent()}
        <div className="flex items-center justify-between mt-4">
          {isNewCard && renderAddBtn}
        </div>
      </div>
    </div>
  )
}
export default Card