
## API do Cardápio

| Método | Caminho | Envia | Devolve |
|--------|---------|-------|---------|
| GET | `/produtos` | - | 200: lista |
| GET | `/produtos/:id` | - | 200: produto ou 404 |
| POST | `/produtos` | { nome, preco, categoria, estoque} | 201 ou 400 |
| POST | `/produtos:id/desconto` | { percentual} | 200 ou 400 ou 404 |
| POST | `/produtos/:id/vender` | { quantidade } | 200 ou 400 ou 404 |
