NexaDesk DevOps
Estrutura

    app/api/ — Código fonte da API Node.js
    .github/workflows/ — Pipeline CI/CD (GitHub Actions)
    environments/staging/ — Manifestos Kubernetes para staging
    environments/prod/ — Manifestos Kubernetes para produção
    argocd-app.yaml — Configuração GitOps (ArgoCD)
    observabilidade/ — Dashboard Grafana

Executar localmente

cd app/api
npm install
node index.js

Acesse:

    http://localhost:3000/health
    http://localhost:3000/tickets

Pipeline CI/CD

    Push no GitHub dispara o workflow
    Instala dependências, executa testes e lint
    Build e push da imagem Docker para o GHCR
    Promoção automática da imagem nos manifests de staging e produção
    ArgoCD sincroniza o cluster Kubernetes com o repositório

Deploy no Minikube

minikube start
kubectl apply -f environments/staging/deploymentstaging.yaml
kubectl apply -f environments/prod/deploymentprod.yaml
kubectl get pods -n nexadesk-staging
kubectl get pods -n nexadesk-prod

Grafana

Usuario: admin Senha: admin

Importe o arquivo observabilidade/grafana.json no menu Dashboards > Import.
Fuso horário

America/Fortaleza

## Rollback

```bash
kubectl rollout undo deployment/nexadesk-api -n nexadesk-staging
kubectl rollout undo deployment/nexadesk-api -n nexadesk-prod