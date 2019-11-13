# Solution

Create the namespace 

```shell
$ kubectl create namespace app-stack
namespace/app-stack created

$ vim app-stack.yaml
$ kubectl create -f app-stack.yaml
pod/frontend created
pod/backend created
pod/database created

$ kubectl get pods --namespace app-stack
NAME       READY   STATUS    RESTARTS   AGE
backend    1/1     Running   0          22s
database   1/1     Running   0          22s
frontend   1/1     Running   0          22s
```

The following definition ensures that all rules are fulfilled.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-stack-network-policy
  namespace: app-stack
spec:
  podSelector:
    matchLabels:
      app: todo
      tier: database
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: todo
          tier: backend
    ports:
    - protocol: TCP
      port: 3306
```

Create the network policy.

```shell
$ vim app-stack-network-policy.yaml
$ kubectl create -f app-stack-network-policy.yaml
$ kubectl get networkpolicy --namespace app-stack
NAME                       POD-SELECTOR             AGE
app-stack-network-policy   app=todo,tier=database   5s
```