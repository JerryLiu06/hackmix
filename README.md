# HackMix 🎵

A playlist generator that creates music mixes based on your vibe description. Built with TypeScript + React + Tailwind CSS for the frontend and Python + FastAPI for the backend.

## Project Structure

```
hackmix/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── App.tsx    # Main application component
│   │   ├── main.tsx   # React entry point
│   │   └── index.css  # Tailwind CSS imports
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Python FastAPI backend
│   ├── main.py        # FastAPI application
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:5173`
3. Enter a vibe description (e.g., "chill summer evening", "high energy workout")
4. Click "Generate" to create your playlist

## API Endpoints

- `GET /` - API status
- `POST /generate-playlist` - Generate a playlist based on vibe
- `GET /health` - Health check

## Future Enhancements

- Integration with Spotify API for real song data
- User authentication and saved playlists
- Advanced vibe analysis using AI
- Social sharing features
- Music streaming integration