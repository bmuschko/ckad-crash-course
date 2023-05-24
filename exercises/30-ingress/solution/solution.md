# Solution

If you are running Minikube you should be able to find the Ingress Controller Pod by running the following command in the `ingress-nginx` namespace.

```
$ kubectl get pods -n ingress-nginx
NAME                                        READY   STATUS      RESTARTS   AGE
...
ingress-nginx-controller-799c9469f7-d8whx   1/1     Running     0          4h24m
...
```

Create the Deployment with the following command.

```
$ kubectl create deployment web --image=bmuschko/nodejs-hello-world:1.0.0
deployment.apps/web created

$ kubectl get deployment web
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
web    1/1     1            1           6s
```

Afterward, expose the application with a Service.

```
$ kubectl expose deployment web --type=NodePort --port=3000
service/web exposed

$ kubectl get service web
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE
web          NodePort    10.97.2.103   <none>        3000:31769/TCP   5s
```

Identify one of the node's IP address.

```
$ kubectl get nodes -o wide
NAME       STATUS   ROLES                  AGE   VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE              KERNEL-VERSION   CONTAINER-RUNTIME
minikube   Ready    control-plane,master   21h   v1.22.3   192.168.64.38   <none>        Buildroot 2021.02.4   4.19.202         docker://20.10.8
```

Make a call to the application using the `curl` command. The application will respond with a "Hello World" message.

```
$ curl 192.168.64.38:31769
Hello World
```

Create an Ingress using the following manifest in the file `ingress.yaml`.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello-world-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
    - host: hello-world.exposed
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 3000
```

Create the Ingress object from the YAML manifest.

```
$ kubectl apply -f ingress.yaml
ingress.networking.k8s.io/hello-world-ingress created
```

List the Ingress object. The value for the IP address will populate after waiting for a little while. You may have to run the command multiple times.

```
$ kubectl get ingress hello-world-ingress
NAME                  CLASS   HOSTS                 ADDRESS         PORTS   AGE
hello-world-ingress   nginx   hello-world.exposed   192.168.64.38   80      72s
```

Edit the file `/etc/hosts` via `sudo vim /etc/hosts`. Add the following entry to map the host name `hello-world.exposed` to the node's IP address.

```
192.168.64.38 hello-world.exposed
```

The Ingress will now render the value `localhost` in the column "ADDRESS".

```
$ kubectl get ingress hello-world-ingress
NAME                  CLASS   HOSTS                 ADDRESS     PORTS   AGE
hello-world-ingress   nginx   hello-world.exposed   localhost   80      79s
```

Make a `curl` call to the host name mapped by the Ingress. The call should be routed toward the backend and respond with the message "Hello World".

```
$ curl hello-world.exposed
Hello World
```