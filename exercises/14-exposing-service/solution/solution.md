# Solution

Create a deployment with 2 replicas first. You should end up with one deployment and two Pods.

```shell
$ kubectl run myapp --image=nginx --restart=Always --replicas=2 --port=80
deployment.apps/myapp created
$ kubectl get deployments,pods
NAME                          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/myapp   2         2         2            2           59s

NAME                         READY   STATUS    RESTARTS   AGE
pod/myapp-7bc568bfdd-972wg   1/1     Running   0          59s
pod/myapp-7bc568bfdd-l5nmz   1/1     Running   0          59s
```

Expose the service with the type `ClusterIP` and the target port 80.

```shell
$ kubectl expose deploy myapp --target-port=80
service/myapp exposed
$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
myapp        ClusterIP   10.108.88.208   <none>        80/TCP    15s
```

Determine the cluster IP and use it for the `wget` command.

```shell
$ kubectl run tmp --image=busybox --restart=Never -it --rm -- wget -O- 10.108.88.208:80
Connecting to 10.108.88.208:80 (10.108.88.208:80)
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
myapp        NodePort    10.108.88.208   <none>        80:30441/TCP   3m
```

Run a `wget` or `curl` command against the service using port `30441`. On Docker for Windows/Mac you may have to use localhost or 127.0.0.1 (see [issue](https://github.com/docker/for-win/issues/1950)).

```shell
$ wget -O- localhost:30441
--2019-05-10 16:32:35--  http://localhost:30441/
Resolving localhost (localhost)... ::1, 127.0.0.1
Connecting to localhost (localhost)|::1|:30441... connected.
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