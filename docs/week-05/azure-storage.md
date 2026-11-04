# Week 5 — Azure Blob Storage Configuration

## Overview

CargoFlow uses Azure Blob Storage to store project datasets prepared for future ETL, analytics, and cloud data workflows.

The storage layer separates raw operational data from cleaned data that is ready for downstream processing.

## Azure Storage Account

- **Storage Account:** `cargoflowstorage26`
- **Resource Group:** `rg-cargoflow`
- **Region:** Canada Central
- **Primary Service:** Azure Blob Storage
- **Performance:** Standard
- **Redundancy:** Locally Redundant Storage (LRS)
- **Access Tier:** Hot

## Blob Container

A private Blob container was created for CargoFlow project data.

- **Container Name:** `cargoflow-data`
- **Anonymous Access:** Private
- **Public Blob Access:** Disabled

## Storage Structure

The container is organized into raw and cleaned data directories.

```text
cargoflow-data/
├── raw/
│   └── cargoflow_trucking_moves_raw.csv
│
└── cleaned/
    └── cargoflow_trucking_moves_cleaned.csv
```

### Raw Data

The `raw/` directory contains operational data exported from the CargoFlow SQL Server database with its original database-oriented structure.

File:

```text
raw/cargoflow_trucking_moves_raw.csv
```

### Cleaned Data

The `cleaned/` directory contains a transformed dataset with business-friendly fields such as booking number, customer, container, carrier, origin, destination, dates, and move status.

File:

```text
cleaned/cargoflow_trucking_moves_cleaned.csv
```

## Security Configuration

The Storage Account was configured with the following security controls:

- Secure transfer required
- HTTPS access enabled
- Minimum TLS version: 1.2
- Anonymous Blob access disabled
- Container access level set to Private
- Microsoft-managed encryption keys
- Blob soft delete enabled for 7 days
- Container soft delete enabled for 7 days

## Data Flow

The current CargoFlow cloud data flow is:

```text
CargoFlowDB
    ↓
SQL Data Export
    ↓
Raw CSV Dataset
    ↓
Data Cleaning / Transformation
    ↓
Cleaned CSV Dataset
    ↓
Azure Blob Storage
    ├── raw/
    └── cleaned/
```

## Validation

The following validations were completed:

- Azure Storage Account deployed successfully
- Private Blob container created
- Raw directory created
- Cleaned directory created
- Raw CSV uploaded successfully
- Cleaned CSV uploaded successfully
- Uploaded files verified in Azure Portal
- Container anonymous access confirmed as Private

## Result

CargoFlow now has a functional Azure cloud storage layer for project data.

The raw and cleaned datasets are stored separately and are ready to be used by future ETL, Azure Data Factory, analytics, and data mining workflows.