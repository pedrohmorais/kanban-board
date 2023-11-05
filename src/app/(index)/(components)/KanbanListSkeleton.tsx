import React from 'react'
import CardSkeleton from './CardSkeleton'

function ColumnSkeleton() {
  return (
    <div className="w-1/4 p-4 rounded bg-gray-100">
      <div className="w-6/12 h-4 bg-gray-200 rounded"></div>
      <CardSkeleton></CardSkeleton>
      <CardSkeleton></CardSkeleton>
      <CardSkeleton></CardSkeleton>
      <CardSkeleton></CardSkeleton>
    </div>
  )
}

function KanbanBoardSkeleton() {
  return (
    <div className="flex space-x-4">
      <ColumnSkeleton></ColumnSkeleton>
      <ColumnSkeleton></ColumnSkeleton>
      <ColumnSkeleton></ColumnSkeleton>
      <ColumnSkeleton></ColumnSkeleton>
    </div>
  )
}

export default KanbanBoardSkeleton
