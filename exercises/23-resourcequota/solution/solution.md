# Solution

Start by creating the Pod definition as YAML file.

First create the namespace and the resource quota in the namespace.

```
$ kubectl create namespace rq-demo
namespace/rq-demo created

$ kubectl apply -f resourcequota.yaml --namespace=rq-demo
resourcequota/app created

$ kubectl describe quota --namespace=rq-demo
Name:            app
Namespace:       rq-demo
Resource         Used  Hard
--------         ----  ----
pods             0     2
requests.cpu     0     2
requests.memory  0     500Mi
```

Next, create the YAML file named `pod.yaml` with more requested memory than available in the quota. You can start by running the command `kubectl run mypod --image=nginx -o yaml --dry-run=client --restart=Never > pod.yaml` and then edit the produced YAML file. Remember to _replace_ the `resources` attribute that has been created automatically.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - image: nginx
    name: mypod
    resources:
      requests:
        cpu: "0.5"
        memory: "1Gi"
  restartPolicy: Never
```

Create the Pod and observe the error message.

```
$ kubectl apply -f pod.yaml --namespace=rq-demo
Error from server (Forbidden): error when creating "pod.yaml": pods "mypod" is forbidden: exceeded quota: app, requested: requests.memory=1Gi, used: requests.memory=0, limited: requests.memory=500Mi
```

Lower the memory settings to less than `500Mi` (e.g. `255Mi`) and create the Pod.

```
$ kubectl apply -f pod.yaml --namespace=rq-demo
pod/mypod created

$ kubectl describe quota --namespace=rq-demo
Name:            app
Namespace:       rq-demo
Resource         Used   Hard
--------         ----   ----
pods             1      2
requests.cpu     500m   2
requests.memory  255Mi  500Mi
```
