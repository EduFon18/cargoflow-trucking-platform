USE CargoFlowDB;
GO

-- Seed Carriers
INSERT INTO Carrier (CarrierName, IsActive)
VALUES
    ('Musket', 1),
    ('P&W', 1),
    ('MEDLOG', 1),
    ('HARLYN', 1),
    ('BEST CHOICE', 1);
GO

-- Seed Processed Bookings
INSERT INTO ProcessedBooking (
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
)
VALUES
(
    'BK-1001',
    'Demo Customer A',
    'MSCU1234567',
    '40HC',
    'Toronto, ON',
    'CN Brampton',
    'Rail / Intermodal Terminal',
    'Montreal',
    '2026-10-15',
    '2026-10-17T16:00:00',
    'Processed'
),
(
    'BK-1002',
    'Demo Customer B',
    'TGHU7654321',
    '40HC',
    'Calgary, AB',
    'CN Calgary',
    'Rail / Intermodal Terminal',
    'Vancouver',
    '2026-10-16',
    '2026-10-18T14:00:00',
    'Processed'
);
GO

-- Seed Initial Trucking Move
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
VALUES (
    'CF-0001',
    (SELECT BookingId
     FROM ProcessedBooking
     WHERE BookingNumber = 'BK-1001'),

    (SELECT CarrierId
     FROM Carrier
     WHERE CarrierName = 'MEDLOG'),

    'CN Brampton',
    'Rail / Intermodal Terminal',
    '2026-10-19',
    '2026-10-20',
    '2026-10-19T14:30:00',
    '2026-10-20T15:30:00',
    'Deliver before terminal cut-off.',
    'Initial CargoFlow database test move.',
    'Active'
);
GO

-- Seed Initial Status History
INSERT INTO MoveStatusHistory (
    MoveId,
    Status,
    Notes
)
VALUES (
    (SELECT MoveId
     FROM TruckingMove
     WHERE MoveReference = 'CF-0001'),
    'Active',
    'Trucking move created and activated.'
);
GO