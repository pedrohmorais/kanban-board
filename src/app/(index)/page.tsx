import KanbanList from './(components)/KanbanList'

export default async function Home() {
  const username = process.env.API_LOGIN || ''
  const password = process.env.API_PASSWORD || ''
  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 pt-20">
      <div className="container mx-auto">
        <KanbanList username={username} password={password}></KanbanList>
      </div>
    </main>
  )
}
