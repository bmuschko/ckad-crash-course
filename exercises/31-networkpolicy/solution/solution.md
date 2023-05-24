# Solution

Create the objects from the `setup.yaml` file.

```
$ kubectl apply -f setup.yaml
namespace/k1 created
namespace/k2 created
pod/busybox created
pod/nginx created
networkpolicy.networking.k8s.io/default-deny-ingress created
```

Check on the Pods in namespace `k1` and `k2`.

```
$ kubectl get pod -n k1
NAME      READY   STATUS    RESTARTS   AGE
busybox   1/1     Running   0          3s

$ kubectl get pod -n k2 -o wide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          14s   10.0.0.101   minikube   <none>           <none>
```

Open a connection to the Pod `nginx` won't be allowed and times out.

```
$ kubectl exec -it busybox -n k1 -- wget --timeout=5 10.0.0.101:80
Connecting to 10.0.0.101:80 (10.0.0.101:80)
wget: download timed out
command terminated with exit code 1
```

Define a NetworkPolicy in `allow-ingress-networkpolicy.yaml` that will allow ingress access from the namespace `k1` to `k2`.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-networkpolicy
  namespace: k2
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              role: consumer
      ports:
        - protocol: TCP
          port: 80
```

Create the object from the YAML manifest.

```
$ kubectl apply -f allow-ingress-networkpolicy.yaml
networkpolicy.networking.k8s.io/allow-ingress-networkpolicy created
```

You can now make a call from any Pod in namespace `k1` to the Pod `nginx` in namespace `k2`.

```
$ kubectl exec -it busybox -n k1 -- wget --timeout=5 10.0.0.101:80
Connecting to 10.0.0.101:80 (10.0.0.101:80)
saving to 'index.html'
index.html           100% |********************************|   615  0:00:00 ETA
'index.html' saved
```