# CargoFlow Data Mining & Business Analysis

## Business Question

What operational patterns can be identified in CargoFlow trucking moves by carrier, origin, destination, move status, monthly volume, and planned transit time?

## Prepared Dataset

For the analytical demonstration, CargoFlow uses a prepared synthetic dataset containing **50 trucking moves**.

File:

`data/synthetic/cargoflow_trucking_moves_synthetic.csv`

The dataset was created specifically for academic analytical testing because the operational proof-of-concept Azure SQL database currently contains only a small number of live test records.

The synthetic dataset follows the same structure as the CargoFlow cleaned operational dataset and represents realistic trucking move scenarios.

The operational Azure SQL data remains unchanged.

## Analytical Approach

The analysis uses descriptive data analysis with **Python and Pandas**.

The script:

`analysis/cargoflow_business_analysis.py`

loads the prepared dataset and calculates operational metrics including:

- Total trucking moves
- Moves by carrier
- Moves by origin
- Moves by destination
- Average planned transit time
- Carrier workload and transit performance
- Move status distribution
- Monthly move volume

This approach was selected because CargoFlow is currently a proof-of-concept and does not yet contain enough historical production data for predictive machine-learning models.

## Analysis Results

### Total Trucking Moves

The prepared analytical dataset contains:

**50 trucking moves**

### Carrier Workload

Carrier distribution:

- MEDLOG: 15 moves
- Musket: 11 moves
- P&W: 9 moves
- HARLYN: 8 moves
- BEST CHOICE: 7 moves

MEDLOG handles the largest share of the simulated workload with:

**30% of all trucking moves**

The remaining workload is distributed across four additional carriers.

### Origin Analysis

Origin distribution:

- Toronto: 16 moves
- Brampton: 10 moves
- Calgary: 9 moves
- Edmonton: 8 moves
- Winnipeg: 7 moves

Toronto represents the highest-volume origin with:

**16 moves (32% of the dataset)**

### Destination Analysis

The most frequent destinations include:

- Vancouver: 12 moves
- Montreal: 8 moves
- Saint John: 7 moves
- CN Brampton: 6 moves
- CN Edmonton: 5 moves
- CN Calgary: 5 moves
- Philadelphia: 4 moves
- New York: 3 moves

Vancouver is the most frequent destination with:

**12 trucking moves**

### Planned Transit Time

The average planned transit duration across the dataset is:

**2.12 days**

Carrier-level transit analysis also demonstrates that planned transit time can be compared across carriers to identify differences in expected operational performance.

### Move Status Distribution

The dataset includes multiple operational statuses.

The largest status group is:

**Move Closed: 28 moves**

This represents:

**56% of the analyzed trucking moves**

The remaining records represent moves at different stages of the trucking workflow, including:

- Container Gated In
- Active
- Arrived at Rail/Port
- Loading Completed
- Empty Container Picked Up
- Carrier Assigned

This demonstrates how CargoFlow can analyze both completed and in-progress transportation activity.

### Monthly Move Volume

Monthly trucking volume:

- August 2026: 18 moves
- September 2026: 14 moves
- October 2026: 18 moves

August and October show the highest simulated volume with **18 moves each**.

Monthly volume analysis could help Operations identify changes in workload and future capacity requirements.

## Business Interpretation

The analysis demonstrates several operational patterns.

MEDLOG carries the largest share of the analyzed workload, but the overall volume remains distributed across five carriers. This provides an example of how CargoFlow could monitor carrier concentration and workload allocation.

Toronto is the most active origin, while Vancouver is the most frequent destination. These patterns can help identify high-volume transportation corridors.

The average planned transit time of 2.12 days provides an operational benchmark that could later be compared with actual transit performance.

The status distribution also provides visibility into how many moves are completed versus still progressing through the trucking workflow.

Finally, monthly volume analysis demonstrates how CargoFlow could support capacity planning and workload monitoring over time.

## Limitations

The analytical dataset contains **50 synthetic trucking moves created for academic demonstration**.

The records are not production transactions and should not be interpreted as actual carrier performance or real operational volume.

The current analysis is descriptive rather than predictive.

A production implementation would require:

- Larger historical datasets
- Actual completed trucking movements
- Actual pickup and delivery timestamps
- Delay and exception information
- Carrier performance history
- Seasonal patterns
- Cost information

With sufficient production history, CargoFlow could later support predictive analysis such as delay prediction, carrier performance scoring, and workload forecasting.

## Business Conclusion

The CargoFlow analytical proof-of-concept demonstrates how trucking move data can be transformed into useful operational information.

The analysis identifies:

- Carrier workload distribution
- High-volume origins
- High-volume destinations
- Planned transit patterns
- Move status distribution
- Monthly workload trends

Although the current dataset is synthetic, the same analytical approach can scale to real operational CargoFlow data as the platform accumulates production history.