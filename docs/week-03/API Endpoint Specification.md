# Week 3 — API Endpoint Specification

## Primary Endpoint

| Attribute | Definition |
|---|---|
| Endpoint Name | Create Trucking Move |
| HTTP Method | POST |
| Route | `/moves` |
| Purpose | Create a trucking move from a processed booking |
| Request Format | JSON |
| Response Format | JSON |
| Successful Status | `201 Created` |

## Purpose
The POST /moves endpoint allows the CargoFlow React frontend to submit validated trucking move information to the FastAPI backend. The API processes the request, generates a temporary move reference, creates an in-memory trucking move object, and returns the created move to the frontend.


## Request Body

```json
{
  "bookingNumber": "BK-1001",
  "moveDestination": "CN Brampton",
  "destinationType": "Rail / Intermodal Terminal",
  "requestedPickupDate": "2026-10-19",
  "requestedDeliveryDate": "2026-10-20",
  "carrier": "Carrier A",
  "pickupAppointment": "2026-10-19T14:30",
  "deliveryAppointment": "2026-10-20T15:30",
  "dispatchInstructions": "Deliver before terminal cut-off.",
  "operationalNotes": ""
}
```

## Successful Response

{
  "moveReference": "CF-0001",
  "bookingNumber": "BK-1001",
  "customer": "Demo Customer A",
  "containerNumber": "MSCU1234567",
  "containerType": "40HC",
  "origin": "Toronto, ON",
  "moveDestination": "CN Brampton",
  "destinationType": "Rail / Intermodal Terminal",
  "pol": "Montreal",
  "carrier": "Carrier A",
  "requestedPickupDate": "2026-10-19",
  "requestedDeliveryDate": "2026-10-20",
  "status": "Active"
}

Successful response:
HTTP 201 Created


## Validation Requirements

API Validation Rules
- Booking Number is required.
- Move Destination is required.
- Destination Type is required.
- Requested Pickup Date is required.
- Requested Delivery Date is required.
- Requested Delivery Date cannot be earlier than Requested Pickup Date.
- The request body must contain valid JSON.
- Invalid requests must not create a trucking move.

## Status codes

| Status Code | Meaning | CargoFlow Use |
|---|---|---|
| `201 Created` | Resource created successfully | Trucking move created |
| `400 Bad Request` | Invalid request | Business validation fails |
| `422 Unprocessable Entity` | Request structure/data validation fails | FastAPI/Pydantic validation |
| `404 Not Found` | Resource not found | Future use when a requested booking/move does not exist |

## Functional Requirements Mapping

| API Behavior | Requirement |
|---|---|
| Create trucking move | FR-003 |
| Generate move reference | FR-004 |
| Store/process move information | FR-005 |
| Associate carrier | FR-007 |
| Record scheduling information | FR-010 |
| Create initial move status | FR-011 |