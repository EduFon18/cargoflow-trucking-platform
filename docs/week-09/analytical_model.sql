USE CargoFlowDB;
GO

/* =========================================================
   CargoFlow Analytical Model - Proof of Concept
   Purpose:
   Demonstrate dimensional-style analytical reporting
   using the current CargoFlow operational database.
   ========================================================= */


/* ---------------------------------------------------------
   1. Analytical Fact-Style Dataset
   One row = one trucking move
   --------------------------------------------------------- */

SELECT
    tm.MoveReference,

    -- Customer Dimension
    pb.CustomerName,

    -- Carrier Dimension
    COALESCE(c.CarrierName, 'Not Assigned') AS CarrierName,

    -- Origin Dimension
    pb.Origin,

    -- Destination Dimension
    tm.MoveDestination,
    tm.DestinationType,
    pb.PortOfLoading,

    -- Date Attributes
    tm.RequestedPickupDate,
    YEAR(tm.RequestedPickupDate) AS PickupYear,
    MONTH(tm.RequestedPickupDate) AS PickupMonth,

    tm.RequestedDeliveryDate,
    YEAR(tm.RequestedDeliveryDate) AS DeliveryYear,
    MONTH(tm.RequestedDeliveryDate) AS DeliveryMonth,

    -- Measures
    1 AS MoveCount,

    DATEDIFF(
        DAY,
        tm.RequestedPickupDate,
        tm.RequestedDeliveryDate
    ) AS PlannedTransitDays,

    tm.Status AS MoveStatus

FROM TruckingMove tm

INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId

LEFT JOIN Carrier c
    ON tm.CarrierId = c.CarrierId

ORDER BY tm.MoveReference;
GO


/* ---------------------------------------------------------
   2. Analytical Query - Carrier Dimension
   --------------------------------------------------------- */

SELECT
    COALESCE(c.CarrierName, 'Not Assigned') AS CarrierName,

    COUNT(*) AS TotalMoves,

    AVG(
        CAST(
            DATEDIFF(
                DAY,
                tm.RequestedPickupDate,
                tm.RequestedDeliveryDate
            ) AS DECIMAL(10,2)
        )
    ) AS AveragePlannedTransitDays

FROM TruckingMove tm

LEFT JOIN Carrier c
    ON tm.CarrierId = c.CarrierId

GROUP BY
    COALESCE(c.CarrierName, 'Not Assigned')

ORDER BY
    TotalMoves DESC;
GO


/* ---------------------------------------------------------
   3. Analytical Query - Origin Dimension
   --------------------------------------------------------- */

SELECT
    pb.Origin,
    COUNT(*) AS TotalMoves

FROM TruckingMove tm

INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId

GROUP BY
    pb.Origin

ORDER BY
    TotalMoves DESC;
GO


/* ---------------------------------------------------------
   4. Analytical Query - Destination Dimension
   --------------------------------------------------------- */

SELECT
    tm.MoveDestination,
    tm.DestinationType,
    pb.PortOfLoading,
    COUNT(*) AS TotalMoves

FROM TruckingMove tm

INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId

GROUP BY
    tm.MoveDestination,
    tm.DestinationType,
    pb.PortOfLoading

ORDER BY
    TotalMoves DESC;
GO


/* ---------------------------------------------------------
   5. Analytical Query - Customer Dimension
   --------------------------------------------------------- */

SELECT
    pb.CustomerName,
    COUNT(*) AS TotalMoves

FROM TruckingMove tm

INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId

GROUP BY
    pb.CustomerName

ORDER BY
    TotalMoves DESC;
GO


/* ---------------------------------------------------------
   6. Analytical Query - Date Dimension Concept
   --------------------------------------------------------- */

SELECT
    YEAR(tm.RequestedPickupDate) AS PickupYear,
    MONTH(tm.RequestedPickupDate) AS PickupMonth,
    COUNT(*) AS TotalMoves

FROM TruckingMove tm

GROUP BY
    YEAR(tm.RequestedPickupDate),
    MONTH(tm.RequestedPickupDate)

ORDER BY
    PickupYear,
    PickupMonth;
GO