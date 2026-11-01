USE CargoFlowDB;
GO

CREATE TABLE ProcessedBooking (
    BookingId INT IDENTITY(1,1) PRIMARY KEY,
    BookingNumber VARCHAR(50) NOT NULL UNIQUE,
    CustomerName VARCHAR(150) NOT NULL,
    ContainerNumber VARCHAR(20) NOT NULL,
    ContainerType VARCHAR(20) NOT NULL,
    Origin VARCHAR(150) NOT NULL,
    MoveDestination VARCHAR(150) NOT NULL,
    DestinationType VARCHAR(100) NOT NULL,
    PortOfLoading VARCHAR(100) NOT NULL,
    ERD DATE NOT NULL,
    CutOff DATETIME2 NOT NULL,
    Status VARCHAR(50) NOT NULL
);
GO

CREATE TABLE Carrier (
    CarrierId INT IDENTITY(1,1) PRIMARY KEY,
    CarrierName VARCHAR(150) NOT NULL UNIQUE,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE TruckingMove (
    MoveId INT IDENTITY(1,1) PRIMARY KEY,
    MoveReference VARCHAR(50) NOT NULL UNIQUE,
    BookingId INT NOT NULL,
    CarrierId INT NULL,
    MoveDestination VARCHAR(150) NOT NULL,
    DestinationType VARCHAR(100) NOT NULL,
    RequestedPickupDate DATE NOT NULL,
    RequestedDeliveryDate DATE NOT NULL,
    PickupAppointment DATETIME2 NULL,
    DeliveryAppointment DATETIME2 NULL,
    DispatchInstructions VARCHAR(1000) NULL,
    OperationalNotes VARCHAR(1000) NULL,
    Status VARCHAR(50) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_TruckingMove_ProcessedBooking
        FOREIGN KEY (BookingId)
        REFERENCES ProcessedBooking(BookingId),

    CONSTRAINT FK_TruckingMove_Carrier
        FOREIGN KEY (CarrierId)
        REFERENCES Carrier(CarrierId),

    CONSTRAINT CK_TruckingMove_RequestedDates
        CHECK (RequestedDeliveryDate >= RequestedPickupDate)
);
GO

CREATE TABLE MoveStatusHistory (
    StatusHistoryId INT IDENTITY(1,1) PRIMARY KEY,
    MoveId INT NOT NULL,
    Status VARCHAR(50) NOT NULL,
    EventTimestamp DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    Notes VARCHAR(1000) NULL,

    CONSTRAINT FK_MoveStatusHistory_TruckingMove
        FOREIGN KEY (MoveId)
        REFERENCES TruckingMove(MoveId)
);
GO