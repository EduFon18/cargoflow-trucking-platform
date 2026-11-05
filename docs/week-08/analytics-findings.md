# CargoFlow Analytics, SQL Reporting & Data Quality Findings

## Overview

This analysis evaluates CargoFlow trucking move data stored in Azure SQL Database using SQL reporting queries and data quality checks.

The objective is to demonstrate analytical reporting, aggregation, filtering, joins, and validation of operational trucking data.

## Analytical Results

The current CargoFlow dataset contains three trucking moves.

Carrier activity shows:

- MEDLOG is assigned to 2 trucking moves.
- HARLYN is assigned to 1 trucking move.
- The average planned transit time is 1 day for both carriers.
- MEDLOG represents the largest share of the current sample workload.

The detailed operational report combines trucking move, processed booking, customer, container, origin, destination, carrier, scheduling, and status information into a single reporting view.

This demonstrates how CargoFlow can provide Operations users with centralized visibility of trucking moves instead of reviewing separate operational data sources.

## Data Quality Results

The following checks were performed:

- Missing carrier assignments
- Duplicate MoveReference values
- Invalid pickup and delivery date sequences
- Required operational fields

Results:

- Total trucking moves: 3
- Missing carrier assignments: 0
- Duplicate MoveReference values: 0
- Invalid requested date sequences: 0

No data-quality issues were identified in the current sample dataset.

## Identified Issues and Fixes

During project development, data consistency controls were implemented to prevent common operational data issues.

### Duplicate Move References

CargoFlow generates unique move references and the database also enforces uniqueness on the `MoveReference` field.

This prevents duplicate operational move identifiers.

### Invalid Pickup and Delivery Dates

The system validates that the requested delivery date cannot occur before the requested pickup date.

This rule is enforced in both application logic and the database schema.

### Missing Carrier Values

Carrier assignments may be optional during the initial move creation process.

Reporting queries use `COALESCE` to represent missing carrier values as:

`Not Assigned`

This provides a readable business value instead of displaying NULL.

### Internal Database IDs

Internal identifiers such as `MoveId`, `BookingId`, and `CarrierId` are useful for relational database processing but are not necessary in business reporting datasets.

The ETL process removes these internal IDs from the cleaned analytical dataset.

## Business Interpretation

The analytical queries demonstrate how CargoFlow can support operational decision-making.

Carrier-level reporting can help Operations identify:

- Carrier workload distribution
- Average planned transit duration
- Total move volume
- Potential carrier concentration

Origin and destination reporting can help identify recurring trucking corridors and areas with higher operational activity.

Data quality validation helps ensure that reporting and future analytics are based on reliable operational data.

As the CargoFlow dataset grows, the same SQL reporting approach can be expanded to analyze carrier performance, delays, transit times, customer activity, origin-to-destination patterns, and operational exceptions.

## Conclusion

CargoFlow successfully demonstrates SQL-based operational reporting and data quality validation using Azure SQL Database.

The implemented queries provide both technical validation of the project data and business-oriented insights that can support trucking operations and future analytics development.