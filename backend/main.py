from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import (
    get_processed_bookings,
    get_carriers,
    create_trucking_move_in_db,
)

from models import TruckingMoveCreate, TruckingMoveResponse


app = FastAPI(
    title="CargoFlow API",
    description="Backend API for the CargoFlow container trucking move management platform.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    return {
        "message": "CargoFlow API is running",
        "status": "healthy"
    }

@app.get("/bookings")
def read_processed_bookings():
    return get_processed_bookings()


@app.get("/carriers")
def read_carriers():
    return get_carriers()


@app.post(
    "/moves",
    response_model=TruckingMoveResponse,
    status_code=201
)
def create_trucking_move(move: TruckingMoveCreate):

    if move.requestedDeliveryDate < move.requestedPickupDate:
        raise HTTPException(
            status_code=400,
            detail="Requested delivery date cannot be earlier than requested pickup date."
        )

    if (
        move.pickupAppointment is not None
        and move.deliveryAppointment is not None
        and move.deliveryAppointment < move.pickupAppointment
    ):
        raise HTTPException(
            status_code=400,
            detail="Delivery appointment cannot be earlier than pickup appointment."
        )

    processed_bookings = get_processed_bookings()

    booking = next(
        (
            booking
            for booking in processed_bookings
            if booking["bookingNumber"] == move.bookingNumber
        ),
        None,
    )

    if booking is None:
        raise HTTPException(
            status_code=404,
            detail="Processed booking not found."
        )

    created_move_data = create_trucking_move_in_db(move)

    if created_move_data is None:
        raise HTTPException(
            status_code=404,
            detail="Processed booking not found."
        )

    created_move = TruckingMoveResponse(
        moveReference=created_move_data["moveReference"],
        bookingNumber=created_move_data["bookingNumber"],
        customer=created_move_data["customer"],
        containerNumber=created_move_data["containerNumber"],
        containerType=created_move_data["containerType"],
        origin=created_move_data["origin"],
        moveDestination=created_move_data["moveDestination"],
        destinationType=created_move_data["destinationType"],
        pol=created_move_data["pol"],
        carrier=created_move_data["carrier"],
        requestedPickupDate=created_move_data["requestedPickupDate"],
        requestedDeliveryDate=created_move_data["requestedDeliveryDate"],
        status=created_move_data["status"],
    )

    return created_move    