from fastapi.responses import JSONResponse
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import StreamingResponse
from starlette.responses import FileResponse

app = FastAPI()
# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to the specific origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/filenames")
def get_filenames(directory_path: str = '/home/trent/dashboard/public/assets/time_lapses'):
    try:
        filenames = sorted(os.listdir(directory_path))
        return JSONResponse(content=filenames)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

#/api/get_mp4?filename=my_video
@app.get("/get_time_lapse")
def get_video(filename: str = Query(..., description="Name of the MP4 file")):
    mp4_file_path = f"/home/trent/dashboard/public/assets/time_lapses/{filename}"  # Replace with the actual path to your MP4 files

    if not os.path.isfile(mp4_file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # return StreamingResponse(open(mp4_file_path, mode="rb"), media_type="video/mp4")
    return FileResponse(mp4_file_path, media_type="video/mp4")


if __name__ == "__main__":
    uvicorn.run(app, host="192.168.0.20", port=8000)