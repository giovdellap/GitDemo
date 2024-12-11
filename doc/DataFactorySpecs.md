## Come costruire i log

1) Definire wli (same as rate)
2) Prendere token random
3) Prendere temperatura random
4) Prendere parameters random
5) Assegnare satifaction in base alla tabella
6) Assegnare generations in base alla tabella

### Satisfaction table

Satisfaction = 5 meno:
- wli_factor: wli * 0.1 (0.25)
- tokens_factor: tokens * 0.5 / 10000 
- if ((wli_factor + tokens_factor) > 0.75
  - togli ulteriore (wli_factor + tokens_factor)
- temperature_factor: 
  - if (temp > 0.4) => temp else 0

### Generations table

Generations = 1/2 (random) più:
- tokens / 5000
- wli * 0.2 (0.4)
- if (temp > 0.4) => temp*2 else 0


## Come costruire le requests

1) Prendere input_tokens random
2) Prendere total_tokens come input_tokens + rand(10000, 70000)
3) Prendere stream_messages random
4) (solo ChartAnalyzer) prendere input_dimension random
5) Assegnare loading_time in base alla tabella

### Loading time table

loading_time = 0 più:
- base time in base allo slot
- stream_messages * 2 se LOW/MEDIUM, * 3.5 se HIGH
- total_tokens / 2000
- se input_dimension > 2500, add rand(25, 50)