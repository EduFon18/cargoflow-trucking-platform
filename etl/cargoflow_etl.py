from pathlib import Path
import csv
import sys
from datetime import date, datetime

# ---------------------------------------------------------
# Project paths
# ---------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
BACKEND_DIR = PROJECT_ROOT / "backend"

RAW_DIR = PROJECT_ROOT / "data" / "raw"
CLEANED_DIR = PROJECT_ROOT / "data" / "cleaned"

RAW_FILE = RAW_DIR / "cargoflow_trucking_moves_raw.csv"
CLEANED_FILE = CLEANED_DIR / "cargoflow_trucking_moves_cleaned.csv"

# Allow this ETL script to import backend/database.py
sys.path.insert(0, str(BACKEND_DIR))

from dotenv import load_dotenv

# Load Azure SQL credentials
load_dotenv(BACKEND_DIR / ".env.azure")

from database import get_db_connection


# ---------------------------------------------------------
# EXTRACT
# ---------------------------------------------------------

def extract_data():
    print("=" * 60)
    print("CargoFlow ETL Pipeline")
    print("=" * 60)

    print("\n[1/4] EXTRACT")
    print("Connecting to CargoFlowDB in Azure SQL...")

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            tm.MoveId,
            tm.MoveReference,
            tm.BookingId,
            pb.BookingNumber,
            pb.CustomerName,
            pb.ContainerNumber,
            pb.ContainerType,
            pb.Origin,
            tm.MoveDestination,
            tm.DestinationType,
            pb.PortOfLoading,
            tm.CarrierId,
            c.CarrierName,
            tm.RequestedPickupDate,
            tm.RequestedDeliveryDate,
            tm.Status,
            tm.CreatedAt
        FROM TruckingMove tm
        INNER JOIN ProcessedBooking pb
            ON tm.BookingId = pb.BookingId
        LEFT JOIN Carrier c
            ON tm.CarrierId = c.CarrierId
        ORDER BY tm.MoveId;
    """)

    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()

    extracted_data = []

    for row in rows:
        extracted_data.append(dict(zip(columns, row)))

    cursor.close()
    connection.close()

    print(f"Successfully extracted {len(extracted_data)} records from Azure SQL.")

    return extracted_data


# ---------------------------------------------------------
# RAW OUTPUT
# ---------------------------------------------------------

def save_raw_data(records):
    print("\n[2/4] RAW DATA")

    RAW_DIR.mkdir(parents=True, exist_ok=True)

    if not records:
        print("No records available to write.")
        return

    fieldnames = list(records[0].keys())

    with open(RAW_FILE, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        writer.writeheader()

        for record in records:
            writer.writerow(record)

    print(f"Raw file created successfully:")
    print(f"  {RAW_FILE}")


# ---------------------------------------------------------
# TRANSFORM + DATA QUALITY
# ---------------------------------------------------------

def transform_data(records):
    print("\n[3/4] TRANSFORM & DATA QUALITY")

    cleaned_records = []
    seen_move_references = set()

    rejected_records = 0

    for record in records:

        move_reference = record["MoveReference"]

        # Required MoveReference validation
        if not move_reference:
            rejected_records += 1
            continue

        # Duplicate validation
        if move_reference in seen_move_references:
            rejected_records += 1
            continue

        seen_move_references.add(move_reference)

        pickup_date = record["RequestedPickupDate"]
        delivery_date = record["RequestedDeliveryDate"]

        # Date validation
        if (
            pickup_date is not None
            and delivery_date is not None
            and delivery_date < pickup_date
        ):
            rejected_records += 1
            continue

        # Handle NULL carrier
        carrier_name = record["CarrierName"]

        if carrier_name is None:
            carrier_name = "Not Assigned"

        cleaned_record = {
            "MoveReference": move_reference,
            "BookingNumber": record["BookingNumber"],
            "CustomerName": record["CustomerName"],
            "ContainerNumber": record["ContainerNumber"],
            "ContainerType": record["ContainerType"],
            "Origin": record["Origin"],
            "MoveDestination": record["MoveDestination"],
            "DestinationType": record["DestinationType"],
            "PortOfLoading": record["PortOfLoading"],
            "CarrierName": carrier_name,
            "RequestedPickupDate": format_value(pickup_date),
            "RequestedDeliveryDate": format_value(delivery_date),
            "MoveStatus": record["Status"],
            "CreatedAt": format_value(record["CreatedAt"]),
        }

        cleaned_records.append(cleaned_record)

    print(f"Records received:       {len(records)}")
    print(f"Records transformed:    {len(cleaned_records)}")
    print(f"Records rejected:       {rejected_records}")
    print("Duplicate MoveReference check: PASSED")
    print("Pickup/Delivery date check:    PASSED")
    print("NULL carrier handling:         COMPLETED")
    print("Internal IDs removed:          COMPLETED")
    print("Status renamed to MoveStatus:  COMPLETED")

    return cleaned_records


def format_value(value):
    if isinstance(value, datetime):
        return value.isoformat()

    if isinstance(value, date):
        return value.isoformat()

    return value


# ---------------------------------------------------------
# LOAD CLEANED OUTPUT
# ---------------------------------------------------------

def save_cleaned_data(records):
    print("\n[4/4] LOAD")

    CLEANED_DIR.mkdir(parents=True, exist_ok=True)

    if not records:
        print("No cleaned records available to write.")
        return

    fieldnames = list(records[0].keys())

    with open(CLEANED_FILE, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        writer.writeheader()

        for record in records:
            writer.writerow(record)

    print("Cleaned dataset created successfully:")
    print(f"  {CLEANED_FILE}")


# ---------------------------------------------------------
# PIPELINE
# ---------------------------------------------------------

def run_pipeline():
    try:
        extracted_data = extract_data()

        save_raw_data(extracted_data)

        cleaned_data = transform_data(extracted_data)

        save_cleaned_data(cleaned_data)

        print("\n" + "=" * 60)
        print("CARGOFLOW ETL PIPELINE COMPLETED SUCCESSFULLY")
        print("=" * 60)

        print("\nPipeline summary:")
        print("Source:      Azure SQL Database - CargoFlowDB")
        print(f"Extracted:   {len(extracted_data)} records")
        print(f"Transformed: {len(cleaned_data)} records")
        print(f"Raw output:  {RAW_FILE}")
        print(f"Clean output:{CLEANED_FILE}")

    except Exception as error:
        print("\n" + "=" * 60)
        print("CARGOFLOW ETL PIPELINE FAILED")
        print("=" * 60)
        print(f"\nError: {error}")

        raise


if __name__ == "__main__":
    run_pipeline()