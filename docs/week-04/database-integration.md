# Week 4 — Database Integration

## Overview

During Week 4, CargoFlow was upgraded from an in-memory proof of concept to a database-backed application using Microsoft SQL Server.

The React frontend, FastAPI backend, and CargoFlowDB database now operate as an integrated end-to-end system.

## Implemented Architecture

Operations User  
→ React Web Application  
→ FastAPI REST API  
→ Microsoft SQL Server  
→ CargoFlowDB

## API Endpoints

- GET /bookings
- GET /carriers
- POST /moves

## Database Tables

- ProcessedBooking
- Carrier
- TruckingMove
- MoveStatusHistory

## Implemented Database Features

- Primary keys
- Foreign key relationships
- UNIQUE constraints
- Required and optional fields
- Requested pickup/delivery date validation
- Persistent trucking move storage
- Automatic CargoFlow move reference generation
- Automatic initial MoveStatusHistory record

## Frontend Integration

The React frontend now retrieves processed bookings and active carriers from FastAPI instead of using hardcoded frontend data.

New trucking moves created through React are submitted to FastAPI and stored permanently in SQL Server.

## Persistence Test

CargoFlow move CF-0004 was created through the React frontend and stored in SQL Server.

FastAPI was stopped and restarted.

After the API restart, CF-0004 and its associated Active status history remained available in CargoFlowDB.

This confirmed that CargoFlow trucking move information is persisted in SQL Server rather than stored temporarily in application memory.

## Week 4 Result

CargoFlow now supports the following complete workflow:

Processed Booking  
→ React  
→ FastAPI  
→ SQL Server  
→ TruckingMove  
→ MoveStatusHistory  
→ API Response  
→ React Confirmation