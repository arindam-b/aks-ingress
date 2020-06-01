Reference: https://docs.microsoft.com/en-us/azure/aks/ingress-basic

# Login
az login

az account set -s 0ec1f351-d07c-4610-9699-90c9a990432b

# Get cluster details

az aks get-credentials --resource-group=aks-rg --name=my-aks

# Kubernetes dashboard

az aks browse --resource-group=aks-rg --name=my-aks

# Create a namespace for your ingress resources
kubectl apply -f namespace.yml

# Add the official stable repository
helm repo add stable https://kubernetes-charts.storage.googleapis.com/

# Use Helm to deploy an NGINX ingress controller
helm install nginx-ingress stable/nginx-ingress \
    --namespace ingress-basic \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux

kubectl get service -l app=nginx-ingress --namespace ingress-basic

# Deploy applications
kubectl apply -f deploy-weatherapp.yml
kubectl apply -f deploy-cityguideapp.yml

# Create an ingress route
kubectl apply -f ingress.yml

# Tear down
helm list --namespace ingress-basic
helm uninstall nginx-ingress --namespace ingress-basic

kubectl delete -f deploy-weatherapp.yml
kubectl delete -f deploy-cityguideapp.yml

kubectl delete -f namespace.yml