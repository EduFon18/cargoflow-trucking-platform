# CargoFlow AI Prompt Log

## Purpose

Artificial intelligence was used as a development assistant during the CargoFlow project.

AI was used mainly to help with:

- Project planning
- Code explanations
- Debugging
- SQL queries
- FastAPI development
- Docker configuration
- ETL design
- Data analysis
- GitHub Actions
- Documentation
- Architecture planning

AI-generated suggestions were not accepted automatically. Results were validated using development tools, cloud services, application testing, and database verification.

---

## 1. Project Scope and Architecture

### AI-Assisted Task

AI was used to help define the CargoFlow proof-of-concept scope, system components, user roles, and trucking move workflow.

### Example Prompt

"Help me define a small CargoFlow proof-of-concept for container trucking operations using React, FastAPI, SQL Server, and Azure."

### Result

The project was structured around:

- React frontend
- FastAPI backend
- Azure SQL Database
- ETL pipeline
- Azure Blob Storage
- Analytics
- GitHub Actions
- Docker
- Azure Monitor

### Validation

The architecture was validated by implementing the individual components and confirming that they could work together.

The final implemented architecture reflects only technologies that were actually used in the project.

---

## 2. FastAPI Backend Development

### AI-Assisted Task

AI helped explain and develop FastAPI endpoints for:

- Retrieving processed bookings
- Retrieving carriers
- Creating trucking moves

### Example Prompt

"Help me create a FastAPI POST endpoint that creates a trucking move and validates pickup and delivery dates."

### Result

The backend implemented endpoints including:

- `GET /bookings`
- `GET /carriers`
- `POST /moves`

### Validation

The API was validated using:

- FastAPI Swagger
- Browser requests
- Frontend integration
- HTTP status codes

Successful move creation returned:

`201 Created`

---

## 3. Azure SQL Database Integration

### AI-Assisted Task

AI helped configure the Python database connection using PyODBC and environment variables.

### Example Prompt

"Help me connect my FastAPI application to Azure SQL Database without hardcoding credentials."

### Result

Database configuration uses:

- `DB_SERVER`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

### Validation

The connection was validated through:

- FastAPI API requests
- SQL Server Management Studio
- Direct verification of inserted records in Azure SQL

A final end-to-end move, `CF-0004`, was successfully created through the frontend and verified in Azure SQL Database.

---

## 4. Docker Configuration

### AI-Assisted Task

AI helped create and troubleshoot the Dockerfile for the FastAPI backend.

### Example Prompt

"Help me create a Dockerfile for FastAPI that includes Microsoft ODBC Driver 18 for Azure SQL."

### Result

The Docker image includes:

- Python 3.12
- Microsoft ODBC Driver 18
- Backend dependencies
- FastAPI application
- Uvicorn startup

### Validation

Docker was validated by:

- Building the image locally
- Running the backend container
- Testing API endpoints
-