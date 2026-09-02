# Runbook NexaDesk API

## Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Código commitado na branch main
- [ ] Pipeline do GitHub Actions passou (build verde)
- [ ] Staging foi atualizado com a nova imagem
- [ ] Health check em staging responde com status 200
- [ ] Aprovação para subir em produção

## Passos do Deploy

1. Fazer push do código para a branch main
2. Aguardar o job build terminar no GitHub Actions
3. Verificar se o job staging atualizou o manifest
4. Confirmar que o Argo CD sincronizou staging
5. Verificar se o job producao atualizou o manifest de produção
6. Confirmar que o Argo CD sincronizou produção
7. Testar as rotas /health e /tickets em produção

## Resposta a Incidentes

### API fora do ar

1. Verificar se o pod está rodando:
   ```bash
   kubectl get pods -n nexadesk-prod
   ```

2. Verificar logs do pod:
   ```bash
   kubectl logs -n nexadesk-prod -l app=nexadesk-api
   ```

3. Verificar se o service está ok:
   ```bash
   kubectl get svc -n nexadesk-prod
   ```

4. Se necessário, fazer rollback para a versão anterior editando o manifest de produção

### Erros após deploy

1. Verificar status do readinessProbe no Kubernetes
2. Verificar se a imagem nova está no GHCR
3. Verificar se o Argo CD sincronizou o ambiente
4. Se o erro persistir, reverter o manifest para a imagem anterior

## Rollback Rápido

Para voltar para a versão anterior:

1. Editar o arquivo `environments/prod/deploymentprod.yaml`
2. Trocar a linha `image:` para a versão anterior
3. Commitar e fazer push para a main
4. O Argo CD vai sincronizar automaticamente

## Contatos

- Time de DevOps: responsável pelo pipeline e Kubernetes
- Time de Desenvolvimento: responsável pelo código da API
