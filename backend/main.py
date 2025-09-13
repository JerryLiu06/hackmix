from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import io
import random

app = FastAPI(title="Financial Visualization Agent API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChartData(BaseModel):
    lineChartData: List[Dict[str, Any]]
    heatmapData: List[Dict[str, Any]]


class VisualizationResponse(BaseModel):
    charts: ChartData
    query: str


def generate_sample_line_chart_data() -> List[Dict[str, Any]]:
    """Generate sample line chart data for monthly net payouts"""
    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    data = []

    for i, month in enumerate(months):
        data.append(
            {
                "month": month,
                "location1": round(6 + i * 0.8 + random.uniform(-1, 1), 1),
                "location2": round(3 + i * 0.6 + random.uniform(-0.8, 0.8), 1),
            }
        )

    return data


def generate_sample_heatmap_data() -> List[Dict[str, Any]]:
    """Generate sample heatmap data for anomalies in employer tax spend"""
    cohorts = ["Cohort 1", "Cohort 2", "Cohort 3", "Cohort 4"]
    quarters = ["Q1", "Q2", "Q3", "Q4", "Q5"]
    data = []

    for cohort in cohorts:
        row = {"cohort": cohort}
        for quarter in quarters:
            # Generate values with some anomalies (higher values)
            if cohort == "Cohort 2" and quarter == "Q3":
                row[quarter] = random.randint(80, 95)  # Anomaly
            elif cohort == "Cohort 3" and quarter == "Q2":
                row[quarter] = random.randint(75, 90)  # Anomaly
            else:
                row[quarter] = random.randint(20, 60)  # Normal range
        data.append(row)

    return data


def process_uploaded_file(file: UploadFile) -> pd.DataFrame:
    """Process uploaded CSV or Excel file"""
    try:
        content = file.file.read()

        if file.filename.endswith(".csv"):
            df = pd.read_csv(io.StringIO(content.decode("utf-8")))
        elif file.filename.endswith((".xls", ".xlsx")):
            df = pd.read_excel(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        return df
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Financial Visualization Agent API is running!"}


@app.post("/analyze-data", response_model=VisualizationResponse)
async def analyze_data(file: UploadFile = File(...), query: str = Form(...)):
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        # Process the uploaded file
        df = process_uploaded_file(file)

        # For now, return sample data based on the query
        # In a real implementation, you would analyze the actual data
        line_chart_data = generate_sample_line_chart_data()
        heatmap_data = generate_sample_heatmap_data()

        charts = ChartData(lineChartData=line_chart_data, heatmapData=heatmap_data)

        return VisualizationResponse(charts=charts, query=query)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze data: {str(e)}")


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
