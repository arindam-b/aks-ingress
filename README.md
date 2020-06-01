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
kubectl apply -f ingress.yaml

# Tear down
helm list --namespace ingress-basic
helm uninstall nginx-ingress --namespace ingress-basic

kubectl delete -f deploy-weatherapp.yml
kubectl delete -f deploy-cityguideapp.yml

kubectl delete -f namespace.yml