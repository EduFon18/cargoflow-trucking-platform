from datetime import date, datetime

from pydantic import BaseModel


class TruckingMoveCreate(BaseModel):
    bookingNumber: str
    moveDestination: str
    destinationType: str
    requestedPickupDate: date
    requestedDeliveryDate: date
    carrier: str = "Not Assigned"
    pickupAppointment: datetime | None = None
    deliveryAppointment: datetime | None = None
    dispatchInstructions: str | None = None
    operationalNotes: str | None = None


class TruckingMoveResponse(BaseModel):
    moveReference: str
    bookingNumber: str
    customer: str
    containerNumber: str
    containerType: str
    origin: str
    moveDestination: str
    destinationType: str
    pol: str
    carrier: str
    requestedPickupDate: date
    requestedDeliveryDate: date
    status: str