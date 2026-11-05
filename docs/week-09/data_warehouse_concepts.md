# CargoFlow Data Warehouse Concepts & Analytical Architecture

## Overview

CargoFlow currently stores operational trucking data in Azure SQL Database using a normalized relational model.

The operational database supports day-to-day application activities such as reviewing processed bookings, assigning carriers, creating trucking moves, and recording move status information.

For analytical purposes, the same operational data can be reorganized into a dimensional model designed for reporting and business analysis.

---

## Operational Data vs Analytical Data

### Operational Data

Operational data supports daily transactions and application workflows.

In CargoFlow, the operational database contains:

- ProcessedBooking
- Carrier
- TruckingMove
- MoveStatusHistory

This data is highly detailed and structured around application transactions.

Examples include:

- Creating a trucking move
- Assigning a carrier
- Updating a move status
- Recording pickup and delivery dates
- Tracking move history

Operational data is optimized for frequent inserts, updates, and lookups.

### Analytical Data

Analytical data is organized to support reporting, aggregation, trend analysis, and decision-making.

Instead of focusing on individual transactions, analytical data can answer questions such as:

- How many trucking moves are handled by each carrier?
- Which origins generate the most trucking moves?
- What is the average planned transit time?
- Which destinations receive the most moves?
- How does move volume change over time?

The analytical model therefore focuses on measurable business events and descriptive dimensions.

---

## OLTP vs OLAP

### OLTP — Online Transaction Processing

CargoFlowDB currently functions as an OLTP system.

The OLTP database is designed for:

- Fast transactional operations
- Creating and updating trucking moves
- Maintaining data integrity
- Managing relationships through primary and foreign keys
- Supporting the FastAPI application

Example:

An Operations User creates a new trucking move through the CargoFlow application.

FastAPI writes the transaction to the `TruckingMove` table.

### OLAP — Online Analytical Processing

An OLAP-style model is designed for analysis rather than transactional processing.

The analytical layer would organize CargoFlow data into facts and dimensions.

This allows SQL queries to efficiently calculate:

- Total trucking moves
- Average transit time
- Moves by carrier
- Moves by customer
- Moves by origin
- Moves by destination
- Move activity by date

The OLAP model reduces the complexity of analytical queries and makes business reporting easier to understand.

---

## CargoFlow Analytical Data Flow

The CargoFlow analytical flow is:

Azure SQL Database  
`CargoFlowDB`

↓

Operational Source Tables

- ProcessedBooking
- Carrier
- TruckingMove
- MoveStatusHistory

↓

ETL Pipeline

- Extract trucking move data
- Join booking information
- Join carrier information
- Validate data quality
- Remove internal operational IDs where appropriate
- Standardize reporting fields

↓

Analytical / Dimensional Model

- FactTruckingMove
- DimCarrier
- DimCustomer
- DimOrigin
- DimDestination
- DimDate

↓

Analytics & SQL Reporting

The analytical layer can support dashboards, SQL reports, carrier analysis, operational performance analysis, and future data mining.

---

## Fact and Dimension Model

### FactTruckingMove

`FactTruckingMove` represents the central business event.

Each row represents one trucking move.

Possible measures include:

- MoveCount
- PlannedTransitDays
- PickupDateKey
- DeliveryDateKey

Foreign keys connect the fact table to descriptive dimensions.

Example structure:

- MoveReference
- CarrierKey
- CustomerKey
- OriginKey
- DestinationKey
- PickupDateKey
- DeliveryDateKey
- PlannedTransitDays
- MoveStatus

---

## Dimension Tables

### DimCarrier

Describes the carrier assigned to a move.

Example attributes:

- CarrierKey
- CarrierName
- IsActive

### DimCustomer

Describes the customer associated with the processed booking.

Example attributes:

- CustomerKey
- CustomerName

### DimOrigin

Describes the inland origin of the trucking move.

Example attributes:

- OriginKey
- OriginName

Examples:

- Toronto, ON
- Calgary, AB

### DimDestination

Describes the trucking delivery destination.

Example attributes:

- DestinationKey
- DestinationName
- DestinationType
- PortOfLoading

Examples:

- CN Brampton
- CN Calgary

### DimDate

Provides reusable calendar attributes for reporting.

Example attributes:

- DateKey
- FullDate
- Year
- Month
- MonthName
- Day
- DayOfWeek

The date dimension can be used for pickup dates, delivery dates, creation dates, and future operational milestones.

---

## Star Schema Concept

The CargoFlow analytical model follows a star-schema concept.

The central fact table is:

`FactTruckingMove`

It connects to:

- DimCarrier
- DimCustomer
- DimOrigin
- DimDestination
- DimDate

This structure simplifies analytical queries because descriptive information is separated into dimensions while measurable trucking move information remains in the fact table.

---

## Small Proof of Concept

The project does not require a separate production data warehouse for this academic proof of concept.

Instead, existing Azure SQL operational data is used to demonstrate dimensional-style analytical queries.

The current SQL reporting already demonstrates:

- Carrier workload
- Move counts
- Average planned transit duration
- Total planned transit days
- Move distribution by origin
- Move distribution by port of loading

These reports represent the types of analytical outputs that a future dimensional model could support.

---

## Business Value

A dimensional analytical model can help CargoFlow Operations answer business questions more efficiently.

Examples include:

- Which carrier handles the highest number of moves?
- Which inland origins generate the most trucking activity?
- Which destinations are used most frequently?
- What is the average planned transit time by carrier?
- How does trucking volume change by month?
- Which operational corridors have the highest activity?

As the project grows, the analytical model can support dashboards, historical reporting, performance indicators, and data mining.

---

## Conclusion

CargoFlow currently uses Azure SQL Database as an operational OLTP database.

The proposed analytical architecture extends the project by introducing an OLAP-style dimensional model centered around `FactTruckingMove` and supporting dimension tables.

The design demonstrates how operational trucking data can be transformed into a structure optimized for reporting, analytics, and future business intelligence.