from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random

app = FastAPI(title="HackMix API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Song(BaseModel):
    title: str
    artist: str
    album: Optional[str] = None
    duration: Optional[str] = None

class VibeRequest(BaseModel):
    vibe: str

class PlaylistResponse(BaseModel):
    playlist: List[Song]
    vibe: str

SAMPLE_SONGS = [
    Song(title="Blinding Lights", artist="The Weeknd", album="After Hours", duration="3:20"),
    Song(title="Watermelon Sugar", artist="Harry Styles", album="Fine Line", duration="2:54"),
    Song(title="Levitating", artist="Dua Lipa", album="Future Nostalgia", duration="3:23"),
    Song(title="Good 4 U", artist="Olivia Rodrigo", album="Sour", duration="2:58"),
    Song(title="Stay", artist="The Kid LAROI & Justin Bieber", duration="2:21"),
    Song(title="Peaches", artist="Justin Bieber ft. Daniel Caesar & Giveon", album="Justice", duration="3:18"),
    Song(title="Industry Baby", artist="Lil Nas X & Jack Harlow", duration="3:32"),
    Song(title="Heat Waves", artist="Glass Animals", album="Dreamland", duration="3:58"),
    Song(title="As It Was", artist="Harry Styles", album="Harry's House", duration="2:47"),
    Song(title="Anti-Hero", artist="Taylor Swift", album="Midnights", duration="3:20"),
    Song(title="Flowers", artist="Miley Cyrus", album="Endless Summer Vacation", duration="3:20"),
    Song(title="Unholy", artist="Sam Smith ft. Kim Petras", duration="2:36"),
    Song(title="Calm Down", artist="Rema & Selena Gomez", duration="3:59"),
    Song(title="Shivers", artist="Ed Sheeran", album="=", duration="3:27"),
    Song(title="Ghost", artist="Justin Bieber", album="Justice", duration="2:33"),
]

def generate_playlist_for_vibe(vibe: str) -> List[Song]:
    vibe_lower = vibe.lower()

    playlist_size = random.randint(8, 12)

    available_songs = SAMPLE_SONGS.copy()
    random.shuffle(available_songs)

    return available_songs[:playlist_size]

@app.get("/")
async def root():
    return {"message": "HackMix API is running!"}

@app.post("/generate-playlist", response_model=PlaylistResponse)
async def generate_playlist(request: VibeRequest):
    if not request.vibe.strip():
        raise HTTPException(status_code=400, detail="Vibe description cannot be empty")

    try:
        playlist = generate_playlist_for_vibe(request.vibe)
        return PlaylistResponse(playlist=playlist, vibe=request.vibe)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate playlist: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)