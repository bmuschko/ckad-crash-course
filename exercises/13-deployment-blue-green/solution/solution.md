# Solution

Define the initial Deployment in the file `blue-deployment.yaml`, as shown below.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      version: blue
  template:
    metadata:
      labels:
        version: blue
    spec:
      containers:
      - image: nginx:1.23.0
        name: nginx
        ports:
        - containerPort: 80
```

Create the Deployment object using the following command. Wait until all replicas transition into the "Running" status.

```
$ kubectl apply -f blue-deployment.yaml
deployment.apps/nginx-blue created

$ kubectl get pods -l version=blue
NAME                         READY   STATUS    RESTARTS   AGE
nginx-blue-99f499479-h9wq4   1/1     Running   0          9s
nginx-blue-99f499479-trsjf   1/1     Running   0          9s
nginx-blue-99f499479-wndkg   1/1     Running   0          9s
```

Define the Service in the file `service.yaml`, as shown below.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    version: blue
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Create the Service object using the following command. Wait until all replicas transition into the "Running" status.

```
$ kubectl apply -f service.yaml
service/nginx created
```

Now, check to ensure that the Pods can be reached using a `curl` command from a temporary Pod. The returned headers will include the nginx server version.

```
$ kubectl run tmp --image=alpine/curl:8.5.0 --restart=Never -it --rm -- curl -sI nginx.default.svc.cluster.local | grep Server
Server: nginx/1.23.0
```

Create a second Deployment in the file `green-deployment.yaml`. Make sure to change the labels and the container image tag. The manifest is shown below.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-green
spec:
  replicas: 3
  selector:
    matchLabels:
      version: green
  template:
    metadata:
      labels:
        version: green
    spec:
      containers:
      - image: nginx:1.23.4
        name: nginx
        ports:
        - containerPort: 80
```

Create the Deployment object using the following command. Wait until all replicas transition into the "Running" status.

```
$ kubectl apply -f green-deployment.yaml
deployment.apps/nginx-green created

$ kubectl get pods -l version=green
NAME                           READY   STATUS    RESTARTS   AGE
nginx-green-658cfdc9c6-8pvpp   1/1     Running   0          11s
nginx-green-658cfdc9c6-fdgm6   1/1     Running   0          11s
nginx-green-658cfdc9c6-zg6gl   1/1     Running   0          11s
```

Change the existing `service.yaml` file by changing the label value with the key `version` from `blue` to `green`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    version: green
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Apply the changes to the Service object.

```
$ kubectl apply -f service.yaml
service/nginx configured
```

Delete the initial Deployment using the following command.

```
$ kubectl delete deployment nginx-blue
deployment.apps "nginx-blue" deleted
```

Incoming traffic to the Service endpoint should now be switched over to the Pods controlled by the green Deployment.

```
$ kubectl run tmp --image=alpine/curl:8.5.0 --restart=Never -it --rm -- curl -sI nginx.default.svc.cluster.local | grep Server
Server: nginx/1.23.4
```
