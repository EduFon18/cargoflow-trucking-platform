from pathlib import Path
import pandas as pd


# ---------------------------------------------------------
# Project paths
# ---------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_FILE = (
    PROJECT_ROOT
    / "data"
    / "synthetic"
    / "cargoflow_trucking_moves_synthetic.csv"
)


# ---------------------------------------------------------
# Load prepared dataset
# ---------------------------------------------------------

def load_data():
    print("=" * 65)
    print("CargoFlow Business Analysis")
    print("=" * 65)

    print("\n[1] Loading prepared dataset...")

    df = pd.read_csv(DATA_FILE)

    print(f"Dataset loaded successfully.")
    print(f"Total records: {len(df)}")

    return df


# ---------------------------------------------------------
# Prepare analytical fields
# ---------------------------------------------------------

def prepare_data(df):
    print("\n[2] Preparing analytical fields...")

    df["RequestedPickupDate"] = pd.to_datetime(
        df["RequestedPickupDate"]
    )

    df["RequestedDeliveryDate"] = pd.to_datetime(
        df["RequestedDeliveryDate"]
    )

    df["PlannedTransitDays"] = (
        df["RequestedDeliveryDate"]
        - df["RequestedPickupDate"]
    ).dt.days

    print("PlannedTransitDays calculated successfully.")

    return df


# ---------------------------------------------------------
# Business analysis
# ---------------------------------------------------------

def analyze_data(df):
    print("\n[3] Running business analysis...")

    total_moves = len(df)

    moves_by_carrier = (
        df.groupby("CarrierName")
        .size()
        .sort_values(ascending=False)
    )

    moves_by_origin = (
        df.groupby("Origin")
        .size()
        .sort_values(ascending=False)
    )

    moves_by_destination = (
        df.groupby("MoveDestination")
        .size()
        .sort_values(ascending=False)
    )

    average_transit = df["PlannedTransitDays"].mean()

    carrier_transit = (
        df.groupby("CarrierName")["PlannedTransitDays"]
        .agg(["count", "mean"])
        .sort_values("count", ascending=False)
    )

    print("\n" + "=" * 65)
    print("ANALYSIS RESULTS")
    print("=" * 65)

    print(f"\nTotal trucking moves: {total_moves}")

    print("\nMoves by carrier:")
    print(moves_by_carrier)

    print("\nMoves by origin:")
    print(moves_by_origin)

    print("\nMoves by destination:")
    print(moves_by_destination)

    print(
        f"\nAverage planned transit time: "
        f"{average_transit:.2f} days"
    )

    print("\nCarrier workload and transit analysis:")
    print(carrier_transit)

    print("\nMoves by status:")
    status_summary = df["MoveStatus"].value_counts()
    print(status_summary)

    print("\nMonthly move volume:")
    df["PickupMonth"] = (
        df["RequestedPickupDate"]
        .dt.to_period("M")
        .astype(str)
    )

    monthly_summary = (
        df.groupby("PickupMonth")
        .size()
        .sort_index()
    )

    print(monthly_summary)

    print("\n" + "=" * 65)
    print("BUSINESS FINDINGS")
    print("=" * 65)

    if not moves_by_carrier.empty:
        top_carrier = moves_by_carrier.index[0]
        top_carrier_moves = moves_by_carrier.iloc[0]

        share = (
            top_carrier_moves / total_moves * 100
            if total_moves > 0
            else 0
        )

        print(
            f"\n1. {top_carrier} handles the largest share "
            f"of the current workload: "
            f"{top_carrier_moves} moves ({share:.1f}%)."
        )

    if not moves_by_origin.empty:
        top_origin = moves_by_origin.index[0]
        top_origin_moves = moves_by_origin.iloc[0]

        print(
            f"2. {top_origin} is the most active origin "
            f"with {top_origin_moves} moves."
        )

    if not moves_by_destination.empty:
        top_destination = moves_by_destination.index[0]
        top_destination_moves = moves_by_destination.iloc[0]

        print(
            f"3. {top_destination} is the most frequent "
            f"destination with {top_destination_moves} moves."
        )

    print(
        f"4. Average planned transit duration is "
        f"{average_transit:.2f} days."
    )

    print("\n" + "=" * 65)
    print("LIMITATION")
    print("=" * 65)

    print(
        "\nThe current CargoFlow analytical dataset contains "
        f"{total_moves} synthetic trucking moves created for academic demonstration. "
        "The analysis demonstrates the analytical approach, "
        "but production historical data would be required for predictive conclusions."
    )

    print("\n" + "=" * 65)
    print("ANALYSIS COMPLETED SUCCESSFULLY")
    print("=" * 65)


# ---------------------------------------------------------
# Main
# ---------------------------------------------------------

def main():
    df = load_data()
    df = prepare_data(df)
    analyze_data(df)


if __name__ == "__main__":
    main()