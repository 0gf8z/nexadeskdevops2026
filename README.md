# NexaDesk DevOps

## Conteúdo

Este projeto tem uma API única e simples.

A API possui /health, /ready e /tickets.

## Executar localmente

```bash
node app/api/index.js
```

Teste no navegador:

```text
http://localhost:3000/health
http://localhost:3000/tickets
```

## Subir no Minikube

```bash
minikube start
minikube image build -t nexadesk-api:latest app/api
kubectl apply -f environments/staging/app.yaml
kubectl get pods -n staging
kubectl apply -f environments/prod/app.yaml
kubectl get pods -n prod
minikube service api -n prod
minikube service grafana -n prod
```

## Grafana

Usuario: admin
Senha: admin

Importe o arquivo observabilidade/grafana.json no menu Dashboards e Import.

## Fluxo

O pipeline faz teste e build.
A imagem vai primeiro para staging.
Depois da validação, ocorre a promoção para prod.

## Fuso

America/Fortaleza.
