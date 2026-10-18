from fastapi import FastAPI, HTTPException

from models import TruckingMoveCreate, TruckingMoveResponse


app = FastAPI(
    title="CargoFlow API",
    description="Backend API for the CargoFlow container trucking move management platform.",
    version="0.1.0"
)


mock_bookings = {
    "BK-1001": {
        "customer": "Demo Customer A",
        "containerNumber": "MSCU1234567",
        "containerType": "40HC",
        "origin": "Toronto, ON",
        "pol": "Montreal",
    },
    "BK-1002": {
        "customer": "Demo Customer B",
        "containerNumber": "TGHU7654321",
        "containerType": "40HC",
        "origin": "Calgary, AB",
        "pol": "Vancouver",
    },
}


created_moves = []


@app.get("/")
def read_root():
    return {
        "message": "CargoFlow API is running",
        "status": "healthy"
    }


@app.post(
    "/moves",
    response_model=TruckingMoveResponse,
    status_code=201
)
def create_trucking_move(move: TruckingMoveCreate):
    booking = mock_bookings.get(move.bookingNumber)

    if booking is None:
        raise HTTPException(
            status_code=404,
            detail="Processed booking not found."
        )

    move_reference = f"CF-{len(created_moves) + 1:04d}"

    created_move = TruckingMoveResponse(
        moveReference=move_reference,
        bookingNumber=move.bookingNumber,
        customer=booking["customer"],
        containerNumber=booking["containerNumber"],
        containerType=booking["containerType"],
        origin=booking["origin"],
        moveDestination=move.moveDestination,
        destinationType=move.destinationType,
        pol=booking["pol"],
        carrier=move.carrier,
        requestedPickupDate=move.requestedPickupDate,
        requestedDeliveryDate=move.requestedDeliveryDate,
        status="Active",
    )

    created_moves.append(created_move)

    return created_move