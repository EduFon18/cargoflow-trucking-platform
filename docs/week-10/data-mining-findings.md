# CargoFlow Data Mining & Business Analysis Findings

## Business Question

What operational patterns can be identified in CargoFlow trucking moves by carrier, origin, destination, and planned transit time?

## Prepared Dataset

The analysis uses the cleaned CargoFlow trucking move dataset:

`data/cleaned/cargoflow_trucking_moves_cleaned.csv`

The dataset was produced by the CargoFlow ETL pipeline from Azure SQL Database.

The cleaned dataset contains business-friendly trucking move information including:

- Move reference
- Booking number
- Customer
- Container information
- Origin
- Destination
- Carrier
- Pickup date
- Delivery date
- Move status

Internal database identifiers were removed during the ETL transformation process.

## Analytical Approach

A descriptive business analysis was implemented using Python and Pandas.

The analysis calculates:

- Total trucking moves
- Trucking moves by carrier
- Trucking moves by origin
- Trucking moves by destination
- Planned transit duration
- Average planned transit time
- Carrier workload distribution

A new analytical field called `PlannedTransitDays` is calculated from the difference between requested pickup and requested delivery dates.

## Results

The current dataset contains 3 trucking moves.

### Carrier Activity

MEDLOG handles 2 of the 3 moves.

HARLYN handles 1 of the 3 moves.

This means MEDLOG represents approximately 66.7% of the current sample workload.

### Origin Activity

Toronto, ON is the most active origin in the current sample with 2 trucking moves.

Calgary, AB has 1 trucking move.

### Destination Activity

CN Brampton is the most frequent destination in the current dataset with 2 trucking moves.

CN Calgary has 1 trucking move.

### Planned Transit Time

The current sample has an average planned transit duration of approximately 1 day.

The current trucking moves show consistent planned transit durations.

## Interpretation of Results

The results demonstrate how CargoFlow operational data can be transformed into useful business information.

Carrier workload analysis can help Operations identify whether trucking activity is concentrated with one carrier.

Origin and destination analysis can identify recurring transportation corridors and locations with higher operational activity.

Transit-time analysis provides a foundation for future comparison between planned and actual move performance.

With a larger dataset, these same analytical methods could help identify:

- Carrier concentration
- High-volume trucking corridors
- Transit-time differences
- Operational bottlenecks
- Customer activity patterns
- Seasonal changes in trucking volume

## Limitations

The current CargoFlow dataset contains only 3 trucking moves.

This dataset is sufficient to demonstrate the analytical process, but it is too small to support statistically meaningful predictive conclusions.

The analysis should therefore be interpreted as a proof of concept.

Future versions of CargoFlow could use a larger historical dataset containing hundreds or thousands of trucking moves.

Additional variables such as actual pickup times, actual delivery times, delays, exceptions, and carrier acceptance information would improve the analysis.

## Business Conclusion

The CargoFlow business analysis successfully demonstrates how operational trucking data can support business decision-making.

The current results indicate carrier concentration around MEDLOG and recurring activity between Toronto and CN Brampton within the sample dataset.

Although the dataset is small, the analytical workflow provides a scalable foundation for future reporting, performance analysis, and data mining.

As more operational data becomes available, CargoFlow could expand this analysis to support carrier performance evaluation, delay prediction, operational planning, and transportation trend analysis.