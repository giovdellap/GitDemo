## DESCRIPTION

### Generic description

Our company provides AI tools for finance brokers.
A customer, using our website, can use 4 tools to analyze market trends.
Each usage of a tool consists of a request about specific companies/market partitions, with user-specified parameters.

### Company systems

Each request is served by one of our in-house AI models. These models elaborate in-house stored data to provide a response to the user.
When some of the input datas are missing, a request to an external AI service is sent. In this case, the user request must wait until the missing data is received from the external service. 

## PROBLEM

We have received complaints about the quality of our services.
The complaints are about output quality and loading time.

### Output Quality problems

Output quality problems are:
- Low quality responses (low satisfaction)
- Customer has to re-generate various times to obtain a satisfactory response (high generations)

We want to identify correlations between low/high satisfaction and:
- tokens
- wli
- tokens/wli rateo (we suspect that high/high is a cause)
- temperature (Chart Generator/Chart Analyzer only)
- presence_penalty (GraphPredictor/ChartGenerator only)

We also want to identify correlations between high generations and:
- tokens
- wli
- temperature (Chart Generator/Chart Analyzer only)

### Loading time

Customers are warned that, in some cases, the response takes more time that usual, due to the fact that our systems must interrogate an external service before the can elaborate a response.
Still, we have received complaints about the fact that sometimes it takes twice as long as usual.

We want to identify correlations between high loading time requests and:
- input_tokens
- total_tokens
- weekday and hour
- stream_messages
- input_dimension (SpecialRequests only)

## RESULTS

### Low Satisfaction
- high tokens slightly worse
- high wli slightly worse
- high tokens/high wli worse
- high temperature worse
- presence penalty doesn't matter
- ChartGenerator worse
- ChartAnalyzer worse
- MarketTracker better

### High generations
- tokens worse
- wli slightly worse
- high temperature worse
- ChartGenerator better
- ChartAnalyzer better
- GraphPredictor worse
- MarketTracker worse

### High loading time
- weekday and hour worse (to be defined)
- stream_messages no
- total_tokens worse
- input_tokens no
- input_dimension worse (every value higher than LOW takes a lot more time)

