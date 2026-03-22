const posts = [
  { id: 1, text: 'Hello World! This is my first post.', likes: 12 },
  { id: 2, text: 'Loving this new post feed!', likes: 7 },
  { id: 3, text: 'Cursor-based pagination is pretty cool.', likes: 3 },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Post Feed</h1>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow p-4">
              <p className="text-gray-700 text-sm">{post.text}</p>
              <div className="mt-3 flex items-center gap-1 text-gray-400 text-xs">
                <span>♥</span>
                <span>{post.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
