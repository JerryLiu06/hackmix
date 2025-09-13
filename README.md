# Financial Visualization Agent 📊

A powerful financial data visualization tool that analyzes uploaded data files and generates interactive charts based on natural language queries. Built with TypeScript + React + Tailwind CSS for the frontend and Python + FastAPI for the backend.

## Project Structure

```
hackmix/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── App.tsx    # Main application component
│   │   ├── components/
│   │   │   ├── LineChart.tsx    # Line chart component
│   │   │   └── HeatmapChart.tsx # Heatmap chart component
│   │   ├── main.tsx   # React entry point
│   │   └── index.css  # Tailwind CSS imports
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Python FastAPI backend
│   ├── main.py        # FastAPI application with data processing
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
3. Upload a CSV or Excel file containing your financial data
4. Enter a natural language query about your data (e.g., "Show quarterly revenue trends", "Display monthly expenses by category")
5. Click "Search" to generate interactive visualizations
6. Use the action buttons to like, download, or share your charts

## Features

- **File Upload**: Support for CSV and Excel files with drag-and-drop interface
- **Natural Language Queries**: Ask questions about your data in plain English
- **Interactive Charts**: Line charts and heatmaps with hover effects and legends
- **Responsive Design**: Clean, modern interface that works on all devices
- **Real-time Analysis**: Fast data processing and visualization generation

## API Endpoints

- `GET /` - API status
- `POST /analyze-data` - Analyze uploaded data and generate visualizations
- `GET /health` - Health check

## Supported File Formats

- CSV files (.csv)
- Excel files (.xls, .xlsx)

## Future Enhancements

- Advanced AI-powered data analysis
- More chart types (bar charts, pie charts, scatter plots)
- Data export functionality
- User authentication and saved analyses
- Integration with popular financial data sources
- Custom chart styling and theming
