# CargoFlow Week 6 – Cloud Deployment Documentation

## Overview

Week 6 extends CargoFlow from a local development environment to a cloud-connected architecture using Microsoft Azure services.

The application now demonstrates communication between the Dockerized FastAPI backend, Azure SQL Database, and Azure Blob Storage.

## Cloud Architecture

The Week 6 architecture includes:

- React + Vite frontend
- FastAPI REST API
- Docker container
- Azure SQL Database
- Azure Blob Storage
- CSV data preparation workflow
- GitHub source control

The updated architecture diagram is stored as:

`docs/week-06/CargoFlow Week 6 Architecture.png`

## Azure Resource Group

Resource Group:

`rg-cargoflow`

The resource group organizes the CargoFlow Azure resources used during the project.

## Azure SQL Database

SQL Server:

`cargoflow-sqlserver26`

Database:

`CargoFlowDB`

Region:

`Canada Central`

The cloud database contains the following main tables:

- ProcessedBooking
- Carrier
- TruckingMove
- MoveStatusHistory

Primary keys and foreign key relationships were validated after deployment.

## Database Migration

The CargoFlow database schema was recreated in Azure SQL Database using the existing project SQL scripts.

Seed data was also inserted to validate the cloud database.

The migrated data includes:

- Processed bookings
- Carriers
- Trucking moves
- Move status history

## FastAPI to Azure SQL Integration

The FastAPI backend connects to Azure SQL Database using environment variables and pyODBC.

Sensitive database credentials are stored locally and are excluded from GitHub through `.gitignore`.

The following API endpoints were successfully tested against Azure SQL Database:

- `GET /bookings`
- `GET /carriers`
- `POST /moves`

A new trucking move was successfully created through FastAPI and confirmed directly in Azure SQL Database.

## Docker to Azure SQL Integration

The FastAPI backend was containerized using Docker.

The Docker container connects directly to Azure SQL Database using environment variables.

The container was tested through:

`http://127.0.0.1:8001/docs`

Successful tests included:

- `GET /bookings` → HTTP 200
- `GET /carriers` → HTTP 200
- `POST /moves` → HTTP 201

The Docker test created trucking move:

`CF-0003`

The new move and its initial status history were successfully confirmed in Azure SQL Database.

## Azure Blob Storage

Storage Account:

`cargoflowstorage26`

Container:

`cargoflow-data`

Access:

`Private`

Region:

`Canada Central`

The container includes two logical data areas:

`raw/`

Contains:

`cargoflow_trucking_moves_raw.csv`

`cleaned/`

Contains:

`cargoflow_trucking_moves_cleaned.csv`

This structure separates raw exported operational data from cleaned and transformed data prepared for analytics.

## Data Flow

The Week 6 application flow is:

Operations User  
→ React Web Application  
→ Dockerized FastAPI REST API  
→ Azure SQL Database  
→ Data Export and Preparation  
→ Azure Blob Storage

FastAPI communicates with Azure SQL using pyODBC.

Operational data can then be exported, cleaned, transformed, and stored in Azure Blob Storage for future analytics and ETL workflows.

## Security

The following security practices were used:

- Azure SQL firewall configuration
- Private Blob Storage container
- Environment variables for database credentials
- Credentials excluded from GitHub
- Encrypted Azure SQL connections
- Microsoft-managed encryption for Azure Storage

## Validation Results

The cloud deployment was successfully validated through:

- Azure SQL connection from SSMS
- Schema validation
- Primary key validation
- Foreign key validation
- Seed data validation
- FastAPI read operations
- FastAPI write operations
- Docker read operations
- Docker write operations
- Azure Blob Storage upload verification
- GitHub commit and push evidence

## Conclusion

CargoFlow now demonstrates a functional cloud-connected architecture using React, FastAPI, Docker, Azure SQL Database, and Azure Blob Storage.

The Week 6 implementation proves that the application can read and write operational trucking data in Azure SQL Database while also using Azure Blob Storage for structured raw and cleaned data files.