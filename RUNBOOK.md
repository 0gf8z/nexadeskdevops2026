# Runbook NexaDesk

## Deploy

1. Confirmar o pipeline verde.
2. Criar a imagem da API.
3. Aplicar staging.
4. Testar /health e /ready.
5. Aplicar prod.
6. Conferir os pods.

## Comandos

```bash
kubectl apply -f environments/staging/app.yaml
kubectl get pods -n staging
kubectl apply -f environments/prod/app.yaml
kubectl rollout status deployment/api -n prod
```

## Rollback

```bash
kubectl rollout undo deployment/api -n prod
kubectl rollout status deployment/api -n prod
```

## Incidente

1. Registrar o horário em America/Fortaleza.
2. Conferir os pods.
3. Conferir os logs.
4. Testar /health.
5. Fazer rollback se necessário.
6. Registrar a causa.
