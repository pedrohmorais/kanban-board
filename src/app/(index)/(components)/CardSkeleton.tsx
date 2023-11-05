import React from 'react'

function CardSkeleton() {
  return (
    <div className="w-full p-4 rounded bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="w-6/12 h-4 bg-gray-200 rounded"></div>
        <div className="w-8/12 h-4 mt-4 bg-gray-200 rounded"></div>
        <div className="w-4/12 h-4 mt-4 bg-gray-200 rounded"></div>
        <div className="w-10/12 h-4 mt-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default CardSkeleton
