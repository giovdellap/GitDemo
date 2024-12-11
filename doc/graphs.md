## Basic graphs
- bar chart
- scatterplot
- boxplot
- line graph


### Scatterplot generations/satisfaction 3D (OK)
- Y axis: satisfaction
- X axis: choose between: 
  - tokens
  - wli (non si vede un
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo
- TODO: 
  - Mettere disabled su alcuni parametri per i modelli che non li hanno

### Scatterplot loading time (OK)
- Y axis: loading time
- X axis: choose between: 
  - imput tokens
  - total tokens
  - input dimension
  - stream messages

### Boxplot WLI (OK)
- Y axis: generations / satisfaction
- X axis: WLI

### Scatterplot generations/ satisfaction color coded
- Y axis: satisfaction
- X axis: choose between: 
  - tokens
  - wli (non si vede un
  - temperature (solo chi ce l'ha)
  - presence penalty (solo chi ce l'ha)
  - tokens/wli rateo
Ogni modello è di un colore diverso
Legenda con colore e nome modello

### Multiple LineChart generations/satisfaction - model
4 graph, uno per modello
Y Axis: generations/satisfaction
X axis: media di Tokens o wli

### Multiple Linechart weekday-hour loading time
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- X values:
  - weekday
- visualizzazione:
  - un singolo valore su X


# VECCHIE IDEE

### SINGLE - Barchart satisfaction - model
- Y axis: satisfaction
- X axis: model
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X

### SINGLE - Linechart satisfaction
- Y axis: satisfaction
- X axis: (prendi la media di ogni n)
  - tokens (n = 10(1?))
  - wli (n = 1)
  - temperature (solo chi ce l'ha - n = 0.01)
  - presence penalty (solo chi ce l'ha - n = 0.01)
  - tokens/wli rateo (n = boh(0.01?))
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X
  - scegli model

### MULTIPLE - Scatterplot satisfaction
- Y axis: satisfaction
- X values:
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo
- filters:
  - scegli modello
    - apply to all graphs

### MULTIPLE - Linechart satisfaction
- Y axis: satisfaction
- X axis: (prendi la media di ogni n)
  - tokens (n = 10(1?))
  - wli (n = 1)
  - temperature (solo chi ce l'ha - n = 0.01)
  - presence penalty (solo chi ce l'ha - n = 0.01)
  - tokens/wli rateo (n = boh(0.01?))
- visualizzazione:
  - un singolo valore su X

### SINGLE - Scatterplot generations 
- Y axis: generations
- X axis: choose between: 
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X

### MULTIPLE - Scatterplot generations
- Y axis: generations
- X values:
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo

## REQUEST TABLE

### SINGLE - Barchart(linechart) weekday-hour
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- X values:
  - weekday
- visualizzazione:
  - un singolo valore su X

### MULTIPLE - linechart weekday-hour
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- visualizzazione:
  - un singolo valore su X
- filters:
  - weekday

### LEGEND - linechart weekday-hour
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- X values:
  - weekday
- visualizzazione:
  - multipli valori di X

### Linechart weekday
- Y axis: loading time
- X axis: mean of the hour for each value that has that weekday (tutte le settimane)
