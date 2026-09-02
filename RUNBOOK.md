# Runbook NexaDesk

## Checklist de Deploy

1. Verificar se o pipeline do GitHub Actions está verde
2. Confirmar que a imagem foi publicada no GHCR
3. Verificar se os manifests foram atualizados pela promoção
4. Aplicar staging e validar endpoints `/health` e `/ready`
5. Aplicar produção e aguardar pods prontos
6. Conferir dashboard Grafana após deploy

## Comandos de Verificação

```bash
kubectl get pods -n nexadesk-staging
kubectl get pods -n nexadesk-prod
kubectl logs deployment/nexadesk-api -n nexadesk-prod
kubectl rollout status deployment/nexadesk-api -n nexadesk-prod
```

## Rollback

```bash
kubectl rollout undo deployment/nexadesk-api -n nexadesk-prod
kubectl rollout status deployment/nexadesk-api -n nexadesk-prod
```

## Resposta a Incidentes

1. Anotar o horário do incidente (America/Fortaleza)
2. Verificar status dos pods: `kubectl get pods -n nexadesk-prod`
3. Verificar logs: `kubectl logs deployment/nexadesk-api -n nexadesk-prod`
4. Testar endpoint `/health`
5. Se necessário, executar rollback
6. Registrar causa raiz e ações tomadas

