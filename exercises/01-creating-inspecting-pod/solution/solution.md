# Solution

First, create the namespace.

```shell
$ kubectl create namespace ckad-prep
```

Next, create the Pod in the new namespace.

```shell
$ kubectl run mypod --image=nginx:2.3.5 --restart=Never --port=80 --namespace=ckad-prep
pod/mypod created
```

You will see that the image cannot be pulled as it doesn't exist with this tag.

```shell
$ kubectl get pod -n ckad-prep
NAME    READY   STATUS             RESTARTS   AGE
mypod   0/1     ImagePullBackOff   0          1m
```

The list of events can give you a deeper insight.

```shell
$ kubectl describe pod -n ckad-prep
...
Events:
  Type     Reason                 Age                 From                         Message
  ----     ------                 ----                ----                         -------
  Normal   Scheduled              3m3s                default-scheduler            Successfully assigned mypod to docker-for-desktop
  Normal   SuccessfulMountVolume  3m2s                kubelet, docker-for-desktop  MountVolume.SetUp succeeded for volume "default-token-jbcl6"
  Normal   Pulling                84s (x4 over 3m2s)  kubelet, docker-for-desktop  pulling image "nginx:2.3.5"
  Warning  Failed                 83s (x4 over 3m1s)  kubelet, docker-for-desktop  Failed to pull image "nginx:2.3.5": rpc error: code = Unknown desc = Error response from daemon: manifest for nginx:2.3.5 not found
  Warning  Failed                 83s (x4 over 3m1s)  kubelet, docker-for-desktop  Error: ErrImagePull
  Normal   BackOff                69s (x6 over 3m)    kubelet, docker-for-desktop  Back-off pulling image "nginx:2.3.5"
  Warning  Failed                 69s (x6 over 3m)    kubelet, docker-for-desktop  Error: ImagePullBackOff
```

Go ahead and edit the existing Pod. Alternatively, you could also just use the `kubectl set image pod mypod mypod=nginx --namespace=ckad-prep` command.

```shell
$ kubectl edit pod mypod --namespace=ckad-prep
```

After setting an image that does exist, the Pod should render the status `Running`.

```shell
$ kubectl get pod -n ckad-prep
NAME    READY   STATUS    RESTARTS   AGE
mypod   1/1     Running   0          14m
```

You can shell into the container and run the `ls` command.

```shell
$ kubectl exec mypod -it --namespace=ckad-prep  -- /bin/sh
# ls
bin  boot  dev	etc  home  lib	lib64  media  mnt  opt	proc  root  run  sbin  srv  sys  tmp  usr  var
# exit
```

Retrieve the IP address of the Pod with the `-o wide` command line option.

```shell
$ kubectl get pods -o wide -n ckad-prep
NAME    READY   STATUS    RESTARTS   AGE   IP               NODE
mypod   1/1     Running   0          12m   192.168.60.149   docker-for-desktop
```

Remember to use the `--rm` to create a temporary Pod.

```shell
$ kubectl run busybox --image=busybox --rm -it --restart=Never -n ckad-prep -- /bin/sh
If you don't see a command prompt, try pressing enter.
# wget -O- 192.168.60.149:80
Connecting to 192.168.60.149:80 (192.168.60.149:80)
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
-                    100% |**********************************************************************|   612  0:00:00 ETA
# exit
```

The logs of the Pod should show a single line indicating our request.

```shell
$ kubectl logs mypod -n ckad-prep
192.168.60.162 - - [17/May/2019:13:35:59 +0000] "GET / HTTP/1.1" 200 612 "-" "Wget" "-"
```

Delete the Pod and namespace after you are done.

```shell
$ kubectl delete pod mypod --namespace=ckad-prep
pod "mypod" deleted
$ kubectl delete namespace ckad-prep
namespace "ckad-prep" deleted
```