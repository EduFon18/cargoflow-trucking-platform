import pyodbc


def get_db_connection():
    connection = pyodbc.connect(
        "DRIVER={ODBC Driver 18 for SQL Server};"
        "SERVER=localhost;"
        "DATABASE=CargoFlowDB;"
        "Trusted_Connection=yes;"
        "TrustServerCertificate=yes;"
    )

    return connection

def get_processed_bookings():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            BookingNumber,
            CustomerName,
            ContainerNumber,
            ContainerType,
            Origin,
            MoveDestination,
            DestinationType,
            PortOfLoading,
            ERD,
            CutOff,
            Status
        FROM ProcessedBooking
        ORDER BY BookingId
    """)

    rows = cursor.fetchall()

    bookings = []

    for row in rows:
        bookings.append({
            "bookingNumber": row.BookingNumber,
            "customer": row.CustomerName,
            "containerNumber": row.ContainerNumber,
            "containerType": row.ContainerType,
            "origin": row.Origin,
            "moveDestination": row.MoveDestination,
            "destinationType": row.DestinationType,
            "pol": row.PortOfLoading,
            "erd": row.ERD,
            "cutOff": row.CutOff,
            "status": row.Status,
        })

    cursor.close()
    connection.close()

    return bookings

def get_carriers():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            CarrierId,
            CarrierName,
            IsActive
        FROM Carrier
        WHERE IsActive = 1
        ORDER BY CarrierName
    """)

    rows = cursor.fetchall()

    carriers = []

    for row in rows:
        carriers.append({
            "carrierId": row.CarrierId,
            "carrierName": row.CarrierName,
            "isActive": bool(row.IsActive),
        })

    cursor.close()
    connection.close()

    return carriers

def create_trucking_move_in_db(move):
    connection = get_db_connection()
    cursor = connection.cursor()

    # Find the processed booking
    cursor.execute("""
        SELECT
            BookingId,
            CustomerName,
            ContainerNumber,
            ContainerType,
            Origin,
            PortOfLoading
        FROM ProcessedBooking
        WHERE BookingNumber = ?
    """, move.bookingNumber)

    booking = cursor.fetchone()

    if booking is None:
        cursor.close()
        connection.close()
        return None

    # Find carrier if one was provided
    carrier_id = None

    if move.carrier and move.carrier != "Not Assigned":
        cursor.execute("""
            SELECT CarrierId
            FROM Carrier
            WHERE CarrierName = ?
        """, move.carrier)

        carrier = cursor.fetchone()

        if carrier is not None:
            carrier_id = carrier.CarrierId

    # Find the highest existing CargoFlow move number
    cursor.execute("""
        SELECT ISNULL(
            MAX(
                TRY_CAST(
                    SUBSTRING(MoveReference, 4, 20)
                    AS INT
                )
            ),
            0
        )
        FROM TruckingMove
        WHERE MoveReference LIKE 'CF-%'
    """)

    last_number = cursor.fetchone()[0]
    next_number = last_number + 1

    move_reference = f"CF-{next_number:04d}"

    # Insert the trucking move
    cursor.execute("""
        INSERT INTO TruckingMove (
            MoveReference,
            BookingId,
            CarrierId,
            MoveDestination,
            DestinationType,
            RequestedPickupDate,
            RequestedDeliveryDate,
            PickupAppointment,
            DeliveryAppointment,
            DispatchInstructions,
            OperationalNotes,
            Status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
        move_reference,
        booking.BookingId,
        carrier_id,
        move.moveDestination,
        move.destinationType,
        move.requestedPickupDate,
        move.requestedDeliveryDate,
        move.pickupAppointment,
        move.deliveryAppointment,
        move.dispatchInstructions,
        move.operationalNotes,
        "Active",
    )

    # Get the MoveId that was just created
    cursor.execute("""
        SELECT MoveId
        FROM TruckingMove
        WHERE MoveReference = ?
    """, move_reference)

    created_move = cursor.fetchone()
    move_id = created_move.MoveId

    # Create initial status history
    cursor.execute("""
        INSERT INTO MoveStatusHistory (
            MoveId,
            Status,
            Notes
        )
        VALUES (?, ?, ?)
    """,
        move_id,
        "Active",
        "Trucking move created and activated."
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "moveReference": move_reference,
        "bookingNumber": move.bookingNumber,
        "customer": booking.CustomerName,
        "containerNumber": booking.ContainerNumber,
        "containerType": booking.ContainerType,
        "origin": booking.Origin,
        "moveDestination": move.moveDestination,
        "destinationType": move.destinationType,
        "pol": booking.PortOfLoading,
        "carrier": move.carrier,
        "requestedPickupDate": move.requestedPickupDate,
        "requestedDeliveryDate": move.requestedDeliveryDate,
        "status": "Active",
    }