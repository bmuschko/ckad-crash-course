# Setting up an Ingress Controller

## Using Minikube

If you are using minikube, you will need to use the following command line options when starting the cluster. See the [minikube documentation](https://minikube.sigs.k8s.io/docs/handbook/addons/ingress-dns/) for more information on setting up an Ingress Controller and DNS. The Ingress Controller add-on to minikube uses the [F5 NGINX Ingress Controller](https://www.nginx.com/products/nginx-ingress-controller/) implementation.

```
$ minikube addons enable ingress
💡  ingress is an addon maintained by Kubernetes. For any concerns contact minikube on GitHub.
You can view the list of minikube maintainers at: https://github.com/kubernetes/minikube/blob/master/OWNERS
💡  After the addon is enabled, please run "minikube tunnel" and your ingress resources would be available at "127.0.0.1"
    ▪ Using image registry.k8s.io/ingress-nginx/controller:v1.7.0
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v20230312-helm-chart-4.5.2-28-g66a760794
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v20230312-helm-chart-4.5.2-28-g66a760794
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled
```

> **_IMPORTANT:_** As explained by the output of the command, you will have to run the command `minikube tunnel` later to make the Ingress of the exercise available on `localhost`. Refer to the solution for more information.

The Ingress controller will run as a Pod in the `ingress-nginx` namespace. Make sure that the Pod `ingress-nginx-controller-...` transitions into the "Running" status.

```
$ kubectl get pods -n ingress-nginx
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create--1-x9fzz     0/1     Completed   0          2m27s
ingress-nginx-admission-patch--1-v66xb      0/1     Completed   1          2m27s
ingress-nginx-controller-5f66978484-knscw   1/1     Running     0          2m28s
```

## Using a Regular Kubernetes Cluster

The [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) lists a wide range of Ingress Controller implementations. The instructions below use the Ingress Controller add-on to minikube uses the [F5 NGINX Ingress Controller](https://www.nginx.com/products/nginx-ingress-controller/) implementation.

```
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
$ kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s
```

The Ingress controller will run as a Pod in the `ingress-nginx` namespace. Make sure that the Pod `ingress-nginx-controller-...` transitions into the "Running" status.

```
$ kubectl get pods -n ingress-nginx
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-nwxl7        0/1     Completed   0          2m5s
ingress-nginx-admission-patch-7cm7t         0/1     Completed   1          2m5s
ingress-nginx-controller-568764d844-c6l9b   1/1     Running     0          2m5s
```