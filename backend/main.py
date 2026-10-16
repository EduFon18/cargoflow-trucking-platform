from fastapi import FastAPI

app = FastAPI(
    title="CargoFlow API",
    description="Backend API for the CargoFlow container trucking move management platform.",
    version="0.1.0"
)


@app.get("/")
def read_root():
    return {
        "message": "CargoFlow API is running",
        "status": "healthy"
    }