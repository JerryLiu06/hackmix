import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Upload, Search, ThumbsUp, ThumbsDown, Download, Share } from 'lucide-react'
import LineChart from './components/LineChart'
import HeatmapChart from './components/HeatmapChart'

interface ChartData {
  lineChartData: any[]
  heatmapData: any[]
}

interface VisualizationResponse {
  charts: ChartData
  query: string
}

function App() {
  const [query, setQuery] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [charts, setCharts] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
      setError('')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  })

  const searchData = async () => {
    if (!query.trim() || !uploadedFile) return

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('query', query.trim())

      const response = await axios.post<VisualizationResponse>('http://localhost:8000/analyze-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setCharts(response.data.charts)
    } catch (err) {
      setError('Failed to analyze data. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Warp Agent Challenge
          </h1>
        </div>

        {/* Upload and Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            {/* File Upload */}
            <div
              {...getRootProps()}
              className={`flex-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : uploadedFile
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              {uploadedFile ? (
                <p className="text-sm text-green-600 font-medium">
                  {uploadedFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop your file here...'
                    : 'Upload CSV or Excel file'}
                </p>
              )}
            </div>

            {/* Search Input */}
            <div className="flex-2 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Show quarterly revenue trends"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && searchData()}
              />
              <button
                onClick={searchData}
                disabled={loading || !query.trim() || !uploadedFile}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                {loading ? 'Analyzing...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Charts Section */}
        {charts && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <LineChart
              data={charts.lineChartData}
              title="Monthly Net Payouts by Location and Tax Category"
              xKey="month"
              yKeys={[
                { key: 'location1', color: '#3b82f6', name: 'Location 1' },
                { key: 'location2', color: '#10b981', name: 'Location 2' }
              ]}
            />

            {/* Heatmap Chart */}
            <HeatmapChart
              data={charts.heatmapData}
              title="Anomalies in Employer Tax Spend"
              rowKey="cohort"
              columns={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
            />
          </div>
        )}

        {/* Footer Actions */}
        {charts && (
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ThumbsUp className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ThumbsDown className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Download className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Share className="h-5 w-5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App