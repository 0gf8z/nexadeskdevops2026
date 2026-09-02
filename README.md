# NexaDesk API

API simples de gestão de tickets feita com Node.js e Docker.

## Estrutura

```

├── app/api/                          # Código da API
│   ├── Dockerfile                    # Imagem Docker da API
│   └── index.js                      # Servidor HTTP com rotas
├── argocd-app.yaml                   # Aplicação Argo CD (GitOps)
├── environments/
│   ├── prod/deploymentprod.yaml      # Manifests de produção
│   └── staging/deploymentstaging.yaml# Manifests de staging
├── observabilidade/grafana.json      # Dashboard Grafana
├── README.md                         # Este arquivo
└── RUNBOOK.md                        # Checklist de deploy e incidentes
```

## Executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/0gf8z/nexadeskdevops2026.git
cd nexadeskdevops2026/app/api
```

### 2. Rodar com Node.js

```bash
npm install
node index.js
```

A API estará em http://localhost:3000

### 3. Rodar com Docker

Na raiz do projeto:

```bash
docker build -t nexadesk-api app/api
docker run -p 3000:3000 nexadesk-api
```

## Rotas da API

| Rota       | Descrição              |
|------------|------------------------|
| /health    | Health check           |
| /ready     | Readiness probe        |
| /tickets   | Lista de chamados      |

## Fluxo de Deploy (CI/CD)

O deploy é feito automaticamente pelo GitHub Actions com promoção entre ambientes.

1. **Push na main** dispara o pipeline
2. **Build**: cria a imagem Docker e envia para o GHCR
3. **Staging**: atualiza o manifest de staging e o Argo CD aplica no cluster
4. **Produção**: só depois que staging termina, atualiza o manifest de produção

A ordem do pipeline é:

```
build --> staging --> producao
```

## GitOps

O Argo CD observa o repositório e sincroniza automaticamente o ambiente de staging.

## Observabilidade

O arquivo `observabilidade/grafana.json` contém o dashboard com painéis para:

- Disponibilidade da API
- Tempo de resposta
- Erros após deploy
- Chamados atendidos

## Documentação operacional

Consulte o arquivo **RUNBOOK.md** para o checklist de deploy e resposta a incidentes.
