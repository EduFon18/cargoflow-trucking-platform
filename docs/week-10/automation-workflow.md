# CargoFlow Automated Cloud Workflow

## Overview

CargoFlow uses GitHub Actions as an automated cloud workflow to execute the project ETL pipeline.

The workflow connects to Azure SQL Database, extracts CargoFlow trucking move data, transforms the data through the existing Python ETL process, and produces raw and cleaned CSV datasets.

## Workflow Architecture

The automated data flow is:

Azure SQL Database — CargoFlowDB

↓

GitHub Actions Cloud Runner

↓

CargoFlow ETL Script  
`etl/cargoflow_etl.py`

↓

Raw Dataset  
`data/raw/cargoflow_trucking_moves_raw.csv`

↓

Cleaned Dataset  
`data/cleaned/cargoflow_trucking_moves_cleaned.csv`

↓

GitHub Actions Artifact

## Trigger Configuration

The workflow supports two execution methods.

### Manual Trigger

`workflow_dispatch`

This allows the workflow to be started manually from the GitHub Actions interface.

### Scheduled Trigger

A scheduled GitHub Actions trigger is configured using cron.

The workflow is scheduled to run automatically every Monday.

This demonstrates scheduled cloud automation without requiring manual execution of the ETL script.

## Secure Database Configuration

Azure SQL credentials are not stored in the repository.

The workflow uses encrypted GitHub Repository Secrets:

- DB_SERVER
- DB_NAME
- DB_USER
- DB_PASSWORD

These values are passed to the ETL process as environment variables during workflow execution.

The local `.env.azure` file remains excluded from GitHub.

## Automated Processing

The GitHub Actions workflow performs the following steps:

1. Checks out the CargoFlow repository.
2. Configures Python.
3. Installs Microsoft ODBC Driver 18.
4. Installs Python dependencies.
5. Validates required database configuration.
6. Runs the CargoFlow ETL pipeline.
7. Generates raw and cleaned datasets.
8. Uploads successful ETL outputs as GitHub Actions artifacts.

## Input, Processing and Result

### Input

CargoFlow operational trucking data stored in Azure SQL Database.

### Processing / Automation

GitHub Actions automatically executes the Python ETL workflow.

The ETL process extracts operational records, joins business information, transforms fields, validates data, and generates business-ready datasets.

### Result

The automated workflow produces:

- Raw trucking move CSV data
- Cleaned and transformed trucking move CSV data
- Downloadable GitHub Actions artifacts
- Workflow execution history and logs

## Failure Handling

The workflow includes explicit failure handling.

If a workflow step fails, GitHub Actions executes a failure-handling step that creates an ETL failure report.

The report contains workflow execution information and directs the user to the GitHub Actions logs for troubleshooting.

The failure report is uploaded as an artifact when applicable.

## Monitoring and Run History

GitHub Actions maintains execution history for the workflow.

Each run records:

- Trigger type
- Execution status
- Start time
- Duration
- Individual workflow steps
- Execution logs
- Generated artifacts

This provides traceability and operational evidence for the automated workflow.

## Conclusion

The CargoFlow GitHub Actions workflow demonstrates a functional cloud automation process connecting Azure SQL Database with the existing CargoFlow ETL pipeline.

The workflow securely automates data extraction and transformation, supports manual and scheduled execution, produces reusable output artifacts, and includes failure-handling capability.