# CargoFlow — Container Trucking Move Management Platform

## Project Overview

CargoFlow is an academic cloud database management proof-of-concept designed to manage container trucking moves from processed bookings through operational execution.

The platform demonstrates how a trucking operations workflow can integrate:

- Frontend application development
- REST API services
- Cloud database storage
- ETL and data processing
- Analytical reporting
- Cloud storage
- Automation
- CI/CD
- Security
- Monitoring

The project was developed as an individual final project for the Cloud Database Management program.

---

## Project Objective

The objective of CargoFlow is to demonstrate an end-to-end cloud-based solution for managing trucking moves associated with processed container bookings.

The main operational workflow is:

Processed Booking  
→ Operations Review  
→ Create Trucking Move  
→ Assign Carrier  
→ Track Move Status  
→ Store Operational Data  
→ Process and Analyze Data

The project focuses on demonstrating technical integration rather than implementing a full production transportation management system.

---

## Project Type

CargoFlow is an individual academic proof-of-concept.

**Project contributor:** Eduardo

---

## Main Technologies

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- PyODBC

### Database

- Microsoft SQL Server
- Azure SQL Database
- SQL Server Management Studio

### Data Processing

- Python
- Pandas
- CSV
- ETL pipeline

### Cloud Services

- Azure SQL Database
- Azure Blob Storage
- Azure Monitor
- GitHub Actions

### DevOps

- Git
- GitHub
- GitHub Actions
- Docker

---

## Final Implemented Architecture

CargoFlow uses a hybrid development and cloud architecture.

### Local Application Layer

The operational application currently runs in the local development environment.

The application flow is:

Operations User  
→ React + Vite Frontend  
→ FastAPI REST API  
→ Azure SQL Database

The backend can also run inside a Docker container.

### Azure Cloud Layer

Azure services used by CargoFlow include:

- Azure SQL Database
- Azure Blob Storage
- Azure Monitor

Azure SQL Database stores operational CargoFlow records.

Azure Blob Storage stores raw and cleaned analytical data.

Azure Monitor provides database monitoring metrics.

### GitHub Cloud Layer

GitHub provides:

- Source control
- Project history
- CI pipeline
- Automated business analysis workflow
- Secrets management
- Workflow artifacts

The final architecture diagram is available at:

`docs/final/CargoFlow Final Implemented Architecture.png`

---

## Database Design

CargoFlow uses Azure SQL Database as the operational cloud database.

Important tables include:

- `ProcessedBooking`
- `TruckingMove`
- `Carrier`
- `MoveStatusHistory`

The database maintains relationships between processed bookings, trucking moves, carriers, and operational status history.

---

## API

CargoFlow uses FastAPI as the backend REST API.

Important endpoints include:

- `GET /bookings`
- `GET /carriers`
- `POST /moves`

The API validates operational information and inserts new trucking moves into the database.

FastAPI automatically provides Swagger documentation through:

`http://127.0.0.1:8000/docs`

---

## Frontend

The CargoFlow frontend was developed using React and Vite.

The application includes:

- Operations dashboard
- Processed bookings
- Trucking move creation
- Carrier selection
- Pickup and delivery dates
- Move confirmation
- Trucking move visibility

The frontend communicates with FastAPI using HTTP REST requests.

---

## End-to-End Validation

The complete operational flow was successfully validated.

The implemented flow is:

React Frontend  
→ FastAPI  
→ Azure SQL Database  
→ CargoFlow Result

During final validation, a trucking move was created from the CargoFlow frontend.

The API returned:

`201 Created`

The new move reference was:

`CF-0004`

The record was subsequently verified directly inside Azure SQL Database using SQL Server Management Studio.

This demonstrates that the implemented application successfully connects the frontend, API, and cloud database.

---

## ETL Pipeline

CargoFlow includes a Python ETL pipeline.

The ETL process performs:

### Extract

Operational trucking move data is extracted from Azure SQL Database.

### Transform

Python and Pandas transform the operational data into a cleaner analytical format.

Transformations include:

- Business-friendly field names
- Date validation
- Missing-value handling
- Removal of unnecessary internal identifiers
- Data-quality checks

### Load / Output

The process generates:

- Raw CSV data
- Cleaned CSV data

The datasets can also be stored in Azure Blob Storage.

Blob Storage structure:

`raw/`

`cleaned/`

---

## Business Analysis

CargoFlow includes descriptive business analysis using Python and Pandas.

A prepared synthetic dataset containing 50 trucking moves was created for academic analytical demonstration.

The operational Azure SQL database remains separate from this synthetic analytical dataset.

The analysis includes:

- Carrier workload
- Origin distribution
- Destination distribution
- Planned transit time
- Move status distribution
- Monthly move volume

Example findings include:

- MEDLOG handled 30% of the analytical workload
- Toronto was the highest-volume origin
- Vancouver was the most frequent destination
- Average planned transit time was 2.12 days
- 56% of analyzed moves were closed

The synthetic data is used only to demonstrate analytical techniques and should not be interpreted as real carrier performance.

---

## Automation

CargoFlow uses GitHub Actions for cloud automation.

The automated business analysis workflow supports:

- Manual execution
- Scheduled execution
- Dataset validation
- Python environment configuration
- Pandas analysis
- Result generation
- Artifact upload
- Failure handling
- Run history

The workflow demonstrates:

Input Data  
→ Cloud Processing  
→ Analytical Result

---

## CI/CD

CargoFlow includes a dedicated GitHub Actions CI pipeline.

The CI pipeline runs automatically when changes are pushed to the `main` branch.

The pipeline includes:

### Backend Validation

- Python dependency installation
- Python syntax validation
- FastAPI application smoke test

### Frontend Build

- Node.js environment setup
- `npm ci`
- React production build using Vite

### Docker Build

- Backend Docker image build
- Docker image validation

### Final Pipeline Validation

The pipeline completes only when the required jobs execute successfully.

This provides automated validation of the CargoFlow source code before further deployment or development.

---

## Docker

The CargoFlow FastAPI backend can run inside Docker.

The backend Dockerfile:

- Uses Python 3.12
- Installs Microsoft ODBC Driver 18
- Installs Python dependencies
- Copies backend source code
- Exposes port 8000
- Starts FastAPI using Uvicorn

Example build:

```bash
docker build -t cargoflow-api ./backend
```

Example local execution:

```bash
docker run -p 8001:8000 cargoflow-api
```

Environment variables are required when connecting the container to Azure SQL Database.

---

## Security and Secrets

CargoFlow does not store database credentials directly inside application source code.

Database configuration uses environment variables:

- `DB_SERVER`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

Sensitive local environment files are excluded from Git using `.gitignore`.

Examples include:

- `.env`
- `.env.*`
- `backend/.env.azure`
- `backend/.env.docker`

GitHub Repository Secrets were also configured for protected workflow credentials.

No passwords are intentionally committed to the repository.

---

## Monitoring

CargoFlow uses Azure Monitor to monitor Azure SQL Database.

Monitoring evidence includes:

### Successful Connections

Azure Monitor records successful database connections.

### CPU Percentage

Azure Monitor tracks Azure SQL CPU utilization over time.

### Failed Connections

Failed database connections can also be monitored for troubleshooting and operational visibility.

This demonstrates basic cloud database monitoring for the CargoFlow environment.

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd cargoflow-trucking-platform
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create or activate a Python virtual environment.

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Database Environment Variables

The backend expects:

```text
DB_SERVER
DB_NAME
DB_USER
DB_PASSWORD
```

These should be stored securely in environment variables or a local `.env` file that is excluded from Git.

### 4. Start Backend with Azure Environment

From the backend directory:

```bash
python -m dotenv -f .env.azure run -- uvicorn main:app --reload
```

Backend:

`http://127.0.0.1:8000`

Swagger:

`http://127.0.0.1:8000/docs`

### 5. Frontend Setup

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend:

`http://localhost:5173`

---

## Testing and Validation

CargoFlow was validated through multiple methods.

### API Testing

FastAPI Swagger was used to test endpoints and verify API responses.

### Database Validation

SQL Server Management Studio was used to confirm data stored in Azure SQL.

### Frontend Validation

The React application was used to create trucking moves through the complete application workflow.

### Docker Validation

The FastAPI backend was successfully built and tested in Docker.

### CI Validation

GitHub Actions successfully executed:

- Backend validation
- Frontend production build
- Docker build
- Final CI validation

### Data Validation

Python ETL scripts and SQL queries were used to verify data quality and analytical outputs.

---

## Project Results

CargoFlow successfully demonstrates:

- Functional React frontend
- Functional FastAPI backend
- Azure SQL integration
- Trucking move creation
- Cloud database persistence
- Docker containerization
- ETL processing
- Azure Blob Storage
- SQL analytics
- Data-quality validation
- Analytical architecture
- Python/Pandas business analysis
- GitHub Actions automation
- CI pipeline
- Secure secrets handling
- Azure Monitor metrics
- End-to-end application validation

---

## Known Limitations

CargoFlow is an academic proof-of-concept and not a production transportation management system.

Current limitations include:

- Frontend and FastAPI are not permanently hosted in Azure
- Authentication and authorization are simplified
- The application does not implement all operational user roles
- Full carrier milestone tracking is not implemented
- Production alerting is not configured
- Analytical data is partially synthetic
- Predictive machine learning is not implemented
- Automated production deployment is not implemented
- The dataset is too small for production forecasting
- Additional testing would be required before production use

---

## Future Improvements

Possible future improvements include:

- Azure-hosted frontend and API
- Microsoft Entra ID authentication
- Role-based access control
- Carrier portal
- Customer visibility portal
- Real-time move status updates
- Automated Azure deployment
- Application Insights
- Automated alerts
- Larger analytical datasets
- Carrier performance scoring
- Delay prediction
- Workload forecasting
- Production data warehouse

---

## Conclusion

CargoFlow demonstrates an end-to-end cloud database management proof-of-concept for container trucking operations.

The project integrates application development, API services, Azure SQL Database, cloud storage, ETL, analytics, automation, CI/CD, security, monitoring, and operational validation into one connected solution.

The project provides a technical foundation that could be expanded into a more complete cloud-based trucking move management platform.