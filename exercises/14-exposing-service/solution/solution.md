# Solution

Expose the service with the type `ClusterIP` on port 80.

```shell
$ kubectl create service clusterip myapp --tcp=80:80
service/myapp created
$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
myapp        ClusterIP   10.108.88.208   <none>        80/TCP    15s
```

Create a Deployment and a Pod using the Deployment using the `run` command.

```shell
$ kubectl create deployment myapp --image=nginx --port=80
deployment.apps/myapp created
$ kubectl get deployments,pods
NAME                          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/myapp   1         1         1            1           59s

NAME                         READY   STATUS    RESTARTS   AGE
pod/myapp-7bc568bfdd-972wg   1/1     Running   0          59s
```

Scale the Deployment to 2 replicas.

```shell
$ kubectl scale deployment myapp --replicas=2
deployment.extensions/myapp scaled
$ kubectl get deployments,pods
NAME                          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/myapp   2         2         2            2           69s

NAME                         READY   STATUS    RESTARTS   AGE
pod/myapp-7bc568bfdd-972wg   1/1     Running   0          69s
pod/myapp-7bc568bfdd-l5nmz   1/1     Running   0          69s
```

Determine the cluster IP and use it for the `wget` command.

```shell
$ kubectl run tmp --image=busybox --restart=Never -it --rm -- wget -O- 10.109.232.76:80
Connecting to 10.109.232.76:80 (10.109.232.76:80)
<!DOCTYPE html>
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
-                    100% |********************************|   612  0:00:00 ETA
pod "tmp" deleted
```

Turn the type of the service into `NodePort` to expose it outside of the cluster. Now, the service should expose a port in the 30000 range.

```shell
$ kubectl edit service myapp
...
spec:
  type: NodePort
...

$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
myapp        NodePort    10.109.232.76   <none>        80:30342/TCP   3m
```

Get the internal IP address of the node. That's 192.168.64.2 in this case.

```shell
$ kubectl get nodes -o wide
NAME       STATUS   ROLES    AGE    VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE               KERNEL-VERSION   CONTAINER-RUNTIME
minikube   Ready    master   175d   v1.19.2   192.168.64.2   <none>        Buildroot 2019.02.10   4.19.107         docker://19.3.8
```

Run a `wget` or `curl` command against the service using port `30342`.

```shell
$ wget -O- 192.168.64.2:30342
--2019-05-10 16:32:35--  http://192.168.64.2:30342/
Resolving localhost (localhost)... ::1, 127.0.0.1
Connecting to localhost (localhost)|::1|:30342... connected.
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

The Kubernetes cluster needs to provide LoadBalancer capapabilities. That's usually the case in cloud environments.