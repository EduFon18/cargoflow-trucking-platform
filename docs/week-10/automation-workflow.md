# CargoFlow Automated Cloud Workflow

## Overview

CargoFlow uses GitHub Actions as an automated cloud workflow to execute a business analysis process using the cleaned trucking move dataset produced by the CargoFlow ETL pipeline.

The workflow runs automatically in the GitHub cloud environment, validates the prepared dataset, executes the Python/Pandas business analysis, and stores the analysis output as a downloadable GitHub Actions artifact.

## Workflow Architecture

The automated workflow is:

Prepared CargoFlow Dataset

`data/cleaned/cargoflow_trucking_moves_cleaned.csv`

↓

GitHub Actions Cloud Runner

↓

Python Environment

↓

CargoFlow Business Analysis Script

`analysis/cargoflow_business_analysis.py`

↓

Operational Pattern Analysis

↓

Business Analysis Results

↓

GitHub Actions Artifact

## Trigger Configuration

The workflow supports two execution methods.

### Manual Trigger

The workflow includes:

`workflow_dispatch`

This allows the workflow to be started manually from the GitHub Actions interface.

### Scheduled Trigger

The workflow also includes a scheduled trigger using cron.

The workflow is configured to run automatically every Monday.

This demonstrates a scheduled cloud automation process that does not require a user to manually execute the Python script.

## Input

The workflow uses the cleaned CargoFlow trucking move dataset:

`data/cleaned/cargoflow_trucking_moves_cleaned.csv`

This dataset was previously generated through the CargoFlow ETL process.

The prepared dataset includes business-oriented information such as:

- Move reference
- Booking number
- Customer
- Container information
- Origin
- Destination
- Carrier
- Pickup date
- Delivery date
- Move status

## Processing / Automation

GitHub Actions performs the following automated steps:

1. Checks out the CargoFlow repository.
2. Configures Python 3.12.
3. Installs Pandas.
4. Verifies that the cleaned CargoFlow dataset exists.
5. Executes `analysis/cargoflow_business_analysis.py`.
6. Calculates operational business metrics.
7. Saves the analysis output to a text file.
8. Uploads the analysis results as a GitHub Actions artifact.

## Automated Business Analysis

The workflow automatically analyzes:

- Total trucking moves
- Moves by carrier
- Moves by origin
- Moves by destination
- Planned transit duration
- Average planned transit time
- Carrier workload distribution

The analysis produces business findings that can help Operations identify workload concentration, recurring transportation corridors, and transit-time patterns.

## Result

A successful workflow produces:

- Business analysis results
- Prepared CargoFlow dataset
- GitHub Actions execution logs
- Downloadable GitHub Actions artifact
- Workflow run history

The generated artifact is named:

`cargoflow-business-analysis-results`

## Successful Execution

The CargoFlow Automated Business Analysis workflow was successfully executed using GitHub Actions.

The successful workflow demonstrated:

- Dataset validation
- Python dependency installation
- Automated business analysis execution
- Business result generation
- Successful artifact upload

The workflow completed successfully in the GitHub cloud environment.

## Failure Handling

The workflow includes explicit failure-handling logic.

During initial testing, an earlier version attempted to execute the CargoFlow ETL pipeline directly against Azure SQL Database from a GitHub-hosted runner.

The Azure SQL connection timed out because the cloud runner could not establish the required database connection.

The failure-handling steps successfully:

- Detected the failed workflow
- Created a failure report
- Uploaded the failure report as a GitHub Actions artifact
- Preserved the execution logs for troubleshooting

This failure was used to validate the workflow's error-handling capability.

The workflow was subsequently adjusted to automate the business analysis using the prepared CargoFlow dataset already stored in the project.

## Run History and Monitoring

GitHub Actions maintains execution history for the automated workflow.

Each workflow run records:

- Trigger type
- Execution status
- Start time
- Duration
- Individual workflow steps
- Execution logs
- Generated artifacts

The project demonstrates both:

- A failed execution with successful failure handling
- A successful automated business analysis execution

This provides evidence of workflow monitoring, troubleshooting, and recovery.

## Input → Processing → Result

### Input

Cleaned CargoFlow trucking move dataset.

### Processing / Automation

GitHub Actions cloud runner executes the CargoFlow Python/Pandas business analysis automatically.

### Result

Business analysis results are generated and stored as a GitHub Actions artifact.

## Security

The repository does not expose database credentials.

GitHub Repository Secrets were configured during the original Azure SQL automation test to securely protect database connection values.

Sensitive credentials remain excluded from the repository.

The final automated business analysis workflow does not require direct database credentials because it uses the prepared cleaned dataset.

## Conclusion

CargoFlow successfully demonstrates a functional automated cloud workflow using GitHub Actions.

The automation validates a prepared dataset, executes business analysis in a cloud runner, produces business-oriented analytical results, stores outputs as downloadable artifacts, supports manual and scheduled execution, and includes tested failure-handling capability.

This workflow demonstrates how CargoFlow data processing and analytical activities can be automated without requiring manual execution on a local computer.