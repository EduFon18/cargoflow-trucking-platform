USE CargoFlowDB;
GO

/* =========================================================
   CargoFlow - Analytics, SQL Reporting & Data Quality
   ========================================================= */


/* ---------------------------------------------------------
   1. Detailed operational report
   Demonstrates JOIN + selected business fields
   --------------------------------------------------------- */

SELECT
    tm.MoveReference,
    pb.BookingNumber,
    pb.CustomerName,
    pb.ContainerNumber,
    pb.Origin,
    tm.MoveDestination,
    tm.DestinationType,
    pb.PortOfLoading,
    COALESCE(c.CarrierName, 'Not Assigned') AS CarrierName,
    tm.RequestedPickupDate,
    tm.RequestedDeliveryDate,
    DATEDIFF(
        DAY,
        tm.RequestedPickupDate,
        tm.RequestedDeliveryDate
    ) AS PlannedTransitDays,
    tm.Status AS MoveStatus,
    tm.CreatedAt
FROM TruckingMove tm
INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId
LEFT JOIN Carrier c
    ON tm.CarrierId = c.CarrierId
ORDER BY tm.MoveReference;
GO


/* ---------------------------------------------------------
   2. Active move filter
   Demonstrates WHERE / filtering
   --------------------------------------------------------- */

SELECT
    tm.MoveReference,
    pb.CustomerName,
    pb.Origin,
    tm.MoveDestination,
    COALESCE(c.CarrierName, 'Not Assigned') AS CarrierName,
    tm.Status
FROM TruckingMove tm
INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId
LEFT JOIN Carrier c
    ON tm.CarrierId = c.CarrierId
WHERE tm.Status = 'Active'
ORDER BY tm.MoveReference;
GO


/* ---------------------------------------------------------
   3. Carrier performance summary
   Demonstrates GROUP BY + COUNT + AVG + SUM
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
    ) AS AveragePlannedTransitDays,
    SUM(
        DATEDIFF(
            DAY,
            tm.RequestedPickupDate,
            tm.RequestedDeliveryDate
        )
    ) AS TotalPlannedTransitDays
FROM TruckingMove tm
LEFT JOIN Carrier c
    ON tm.CarrierId = c.CarrierId
GROUP BY COALESCE(c.CarrierName, 'Not Assigned')
ORDER BY TotalMoves DESC, CarrierName;
GO


/* ---------------------------------------------------------
   4. Moves by origin
   Demonstrates GROUP BY + COUNT
   --------------------------------------------------------- */

SELECT
    pb.Origin,
    COUNT(*) AS TotalMoves
FROM TruckingMove tm
INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId
GROUP BY pb.Origin
ORDER BY TotalMoves DESC;
GO


/* ---------------------------------------------------------
   5. Moves by port of loading
   --------------------------------------------------------- */

SELECT
    pb.PortOfLoading,
    COUNT(*) AS TotalMoves
FROM TruckingMove tm
INNER JOIN ProcessedBooking pb
    ON tm.BookingId = pb.BookingId
GROUP BY pb.PortOfLoading
ORDER BY TotalMoves DESC;
GO


/* =========================================================
   DATA QUALITY CHECKS
   ========================================================= */


/* ---------------------------------------------------------
   6. NULL / missing carrier check
   --------------------------------------------------------- */

SELECT
    tm.MoveReference,
    tm.CarrierId
FROM TruckingMove tm
WHERE tm.CarrierId IS NULL;
GO


/* ---------------------------------------------------------
   7. Duplicate MoveReference check
   Expected result: 0 rows
   --------------------------------------------------------- */

SELECT
    MoveReference,
    COUNT(*) AS DuplicateCount
FROM TruckingMove
GROUP BY MoveReference
HAVING COUNT(*) > 1;
GO


/* ---------------------------------------------------------
   8. Invalid requested date check
   Expected result: 0 rows
   --------------------------------------------------------- */

SELECT
    MoveReference,
    RequestedPickupDate,
    RequestedDeliveryDate
FROM TruckingMove
WHERE RequestedDeliveryDate < RequestedPickupDate;
GO


/* ---------------------------------------------------------
   9. Required field quality check
   Expected result: 0 rows
   --------------------------------------------------------- */

SELECT
    MoveId,
    MoveReference,
    BookingId,
    MoveDestination,
    DestinationType,
    Status
FROM TruckingMove
WHERE
    MoveReference IS NULL
    OR BookingId IS NULL
    OR MoveDestination IS NULL
    OR DestinationType IS NULL
    OR Status IS NULL;
GO


/* ---------------------------------------------------------
   10. Data-quality summary
   --------------------------------------------------------- */

SELECT
    (SELECT COUNT(*)
     FROM TruckingMove) AS TotalMoves,

    (SELECT COUNT(*)
     FROM TruckingMove
     WHERE CarrierId IS NULL) AS MissingCarrierCount,

    (SELECT COUNT(*)
     FROM (
         SELECT MoveReference
         FROM TruckingMove
         GROUP BY MoveReference
         HAVING COUNT(*) > 1
     ) d) AS DuplicateMoveReferenceCount,

    (SELECT COUNT(*)
     FROM TruckingMove
     WHERE RequestedDeliveryDate < RequestedPickupDate)
     AS InvalidDateCount;
GO