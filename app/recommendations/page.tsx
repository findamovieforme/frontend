// app/recommendations/page.tsx
import Link from 'next/link'
import { NavigationBar } from '../components/navbar'

interface Recommendation {
  id: number
  title: string
  artist: string
  thumbnail: string
  youtubeLink: string
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Song One',
    artist: 'Artist A',
    thumbnail: '/thumbnails/song1.jpg',
    youtubeLink: 'https://www.youtube.com/watch?v=example1',
  },
  // Add more recommendations
]

export default function RecommendationsPage() {
  return (
    <>
      <NavigationBar />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Music Recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((music) => (
            <div key={music.id} className="bg-white p-4 rounded shadow">
              <img src={music.thumbnail} alt={music.title} className="mb-2 w-full h-40 object-cover" />
              <h3 className="font-semibold">{music.title}</h3>
              <p className="text-gray-600 mb-2">{music.artist}</p>
              <div className="flex space-x-2">
                <a
                  href={music.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Play on YouTube
                </a>
                <Link
                  href={`/music/${music.id}`}
                  className="flex-1 text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Open
                </Link>
              </div>
              <button className="mt-2 w-full bg-gray-200 py-1 rounded hover:bg-gray-300">Like</button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
