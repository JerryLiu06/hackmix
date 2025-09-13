import { useState } from 'react'
import axios from 'axios'

interface Song {
  title: string
  artist: string
  album?: string
  duration?: string
}

interface PlaylistResponse {
  playlist: Song[]
  vibe: string
}

function App() {
  const [vibe, setVibe] = useState('')
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generatePlaylist = async () => {
    if (!vibe.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await axios.post<PlaylistResponse>('http://localhost:8000/generate-playlist', {
        vibe: vibe.trim()
      })
      setPlaylist(response.data.playlist)
    } catch (err) {
      setError('Failed to generate playlist. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎵 HackMix
          </h1>
          <p className="text-xl text-gray-300">
            Generate a playlist that matches your vibe
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="Describe your vibe (e.g., 'chill summer evening', 'high energy workout', 'nostalgic rainy day')"
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onKeyPress={(e) => e.key === 'Enter' && generatePlaylist()}
              />
              <button
                onClick={generatePlaylist}
                disabled={loading || !vibe.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {playlist.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Playlist
              </h2>
              <div className="space-y-3">
                {playlist.map((song, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-white font-semibold">{song.title}</h3>
                      <p className="text-gray-300">{song.artist}</p>
                      {song.album && (
                        <p className="text-gray-400 text-sm">{song.album}</p>
                      )}
                    </div>
                    {song.duration && (
                      <div className="text-gray-300 text-sm">
                        {song.duration}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App