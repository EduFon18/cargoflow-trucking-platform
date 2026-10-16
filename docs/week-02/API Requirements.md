1. Week 2 Frontend Workflow
The CargoFlow Week 2 prototype allows an Operations User to review a processed export booking, open the Create Trucking Move form, enter operational move information, validate the form, and create a temporary trucking move using frontend state.
During Week 3, the temporary frontend-only submission will be replaced by communication with the CargoFlow API.


2. Frontend Input Data
The Operations User enters or selects the following trucking move information:
- Move Destination / Delivery Facility
- Destination Type
- Requested Pickup Date
- Requested Delivery Date
- Carrier
- Pickup Appointment
- Delivery Appointment
- Dispatch Instructions
- Operational Notes

3. Frontend Displayed Data
The frontend displays processed booking information including:
- Booking Number
- Customer
- Container Number
- Container Type
- Pickup Location / Origin
- Port of Loading (POL)
- ERD
- Cut-Off
- Booking Status
After a successful trucking move creation, the frontend displays the move reference, booking information, trucking move details, carrier, and move status.

4. Frontend User Actions
The Operations User can:
- View processed bookings.
- Select a booking.
- Review booking details.
- Start creation of a trucking move.
- Enter trucking move information.
- Submit the trucking move form.
- Receive validation messages.
- View the trucking move creation result.

5. Data Sent to the API

The React frontend will send the following information to the CargoFlow API when creating a trucking move:

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

6. Data Returned by the API

{
  "moveReference": "CF-0001",
  "bookingNumber": "BK-1001",
  "customer": "Demo Customer A",
  "containerNumber": "MSCU1234567",
  "origin": "Toronto, ON",
  "moveDestination": "CN Brampton",
  "destinationType": "Rail / Intermodal Terminal",
  "pol": "Montreal",
  "carrier": "Carrier A",
  "requestedPickupDate": "2026-10-19",
  "requestedDeliveryDate": "2026-10-20",
  "status": "Active"
}

7. Primary Week 3 Integration

Primary Integration: Create Trucking Move
Frontend: React Create Trucking Move Form
HTTP Method: POST
API Route: /moves
Backend: FastAPI
Successful Status Code: 201 Created
Flow:
Operations User → React Form → POST /moves → FastAPI → JSON Response → React Confirmation Screen

8. Functional Requirements Mapping

| API Feature | CargoFlow Requirement |
|---|---|
| Create trucking move from processed booking | FR-003 |
| Generate move reference | FR-004 |
| Store/return move information | FR-005 |
| Associate carrier with move | FR-007 |
| Record scheduling information | FR-010 |
| Initial move status | FR-011 |
| Return operational move information to frontend | FR-013 / FR-017 |