# Solution

Expose the service with the type `ClusterIP` on port 80.

```
$ kubectl create service clusterip myapp --tcp=80:80
service/myapp created

$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
myapp        ClusterIP   10.109.149.59   <none>        80/TCP    4s
```

Create a Deployment and a Pod using the Deployment using the `run` command.

```
$ kubectl create deployment myapp --image=nginx:1.23.4-alpine --port=80
deployment.apps/myapp created

$ kubectl get deployments,pods
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/myapp   1/1     1            1           79s

NAME                         READY   STATUS    RESTARTS   AGE
pod/myapp-7d6cd46d65-jrc2q   1/1     Running   0          78s
```

Scale the Deployment to 2 replicas.

```
$ kubectl scale deployment myapp --replicas=2
deployment.extensions/myapp scaled

$ kubectl get deployments,pods
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/myapp   2/2     2            2           107s

NAME                         READY   STATUS    RESTARTS   AGE
pod/myapp-7d6cd46d65-8vr8t   1/1     Running   0          5s
pod/myapp-7d6cd46d65-jrc2q   1/1     Running   0          106s
```

Determine the cluster IP and the port for the Service. In this case, it's `10.109.149.59:80`. Alternatively, you can use the DNS name `myapp`. Use the information with the `wget` command.

```
$ kubectl run tmp --image=busybox --restart=Never -it --rm -- wget -O- 10.109.149.59:80
Connecting to 10.109.149.59:80 (10.109.149.59:80)
writing to stdout
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
-                    100% |********************************|   615  0:00:00 ETA
written to stdout
pod "tmp" deleted
```

Turn the type of the service into `NodePort` to expose it outside of the cluster. Now, the service should expose a port in the 30000 range.

```
$ kubectl edit service myapp
...
spec:
  type: NodePort
...

$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
myapp        NodePort    10.109.149.59   <none>        80:31205/TCP   6m44s
```

Get the internal IP address of one of the nodes of the cluster. That's `192.168.49.2` in this case.

```
$ kubectl get nodes -o wide
NAME       STATUS   ROLES           AGE   VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
minikube   Ready    control-plane   17h   v1.26.3   192.168.49.2   <none>        Ubuntu 20.04.5 LTS   5.15.49-linuxkit   docker://23.0.2
```

Run a `wget` or `curl` command against the service by using the node's internal IP address and the node port. For the setup explained above, it's `192.168.49.2:31205`.

```
$ wget -O- 192.168.49.2:31205
--2019-05-10 16:32:35--  http://192.168.49.2:31205/
Resolving localhost (localhost)... ::1, 127.0.0.1
Connecting to localhost (localhost)|::1|:31205... connected.
HTTP request sent, awaiting response... 200 OK
Length: 612 [text/html]
Saving to: ‘STDOUT’

-                                          0%[                                                                                   ]       0  --.-KB/s               <!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
-                                        100%[==================================================================================>]     612  --.-KB/s    in 0s

2019-05-10 16:32:35 (24.3 MB/s) - written to stdout [612/612]
```

## Optional

> Can you expose the Pods as a service without a deployment?

Yes, a Service does not need a Deployment to work but they can work in tandem. A Deployment manages Pods and their replication. A Service routes network requests to a set of Pods. Both primitives use label selection to connect with an associated set of Pods.

> Under what condition would you use the service type `LoadBalancer`?

The Kubernetes cluster needs to provide LoadBalancer capabilities. That's usually the case in cloud environments.
