# Solution

Start by creating a basic definition of a Pod. The following YAML manifest defines the Pod named `hello` with a single container running the image `bmuschko/nodejs-hello-world:1.0.0`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  containers:
  - image: bmuschko/nodejs-hello-world:1.0.0
    name: hello
    ports:
    - name: nodejs-port
      containerPort: 3000
```

Add a Volume to the Pod and mount it in the container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  containers:
  - image: bmuschko/nodejs-hello-world:1.0.0
    name: hello
    ports:
    - name: nodejs-port
      containerPort: 3000
    volumeMounts:
    - name: log-volume
      mountPath: "/var/log"
  volumes:
  - name: log-volume
    emptyDir: {}
```

Lastly, define the resource requirements for the container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  containers:
  - image: bmuschko/nodejs-hello-world:1.0.0
    name: hello
    ports:
    - name: nodejs-port
      containerPort: 3000
    volumeMounts:
    - name: log-volume
      mountPath: "/var/log"
    resources:
      requests:
        cpu: 100m
        memory: 500Mi
        ephemeral-storage: 1Gi
      limits:
        memory: 500Mi
        ephemeral-storage: 2Gi
  volumes:
  - name: log-volume
    emptyDir: {}
```

Create the Pod object with the following command:

```
$ kubectl apply -f pod.yaml
pod/hello created
```

The cluster in this scenario consists of three nodes, one control-plane node and two worker nodes. Be aware that your setup will likely look different.

```
$ kubectl get nodes
NAME           STATUS   ROLES           AGE   VERSION
minikube       Ready    control-plane   65s   v1.26.3
minikube-m02   Ready    <none>          44s   v1.26.3
minikube-m03   Ready    <none>          26s   v1.26.3
```

The `-o wide` flag renders the node the Pod is running on, in this case the node named `minikube-m03`.

```
$ kubectl get pod hello -o wide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE           NOMINATED NODE   READINESS GATES
hello   1/1     Running   0          25s   10.244.2.2   minikube-m03   <none>           <none>
```

The details of the Pod provide information about the container's resource requirements.

```
$ kubectl describe pod hello
...
Containers:
  hello:
    ...
    Limits:
      ephemeral-storage:  2Gi
      memory:             500Mi
    Requests:
      cpu:                100m
      ephemeral-storage:  1Gi
      memory:             500M
...
```