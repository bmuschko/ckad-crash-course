# Solution

## Creating the Service

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
$ kubectl expose deployment web --type=ClusterIP --port=3000
service/web exposed

$ kubectl get service web
NAME   TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
web    ClusterIP   10.100.86.59   <none>        3000/TCP   6s
```

Determine the cluster IP and the port for the Service. In this case, it's `10.109.149.59:3000`. Alternatively, you can use the DNS name `web`. Use the information to execute a `wget` command from another Pod.

```
$ kubectl run tmp --image=busybox:1.36.1 --restart=Never -it --rm -- wget -O- web:3000
Connecting to web:3000 (10.100.86.59:3000)
writing to stdout
Hello World
-                    100% |********************************|    12  0:00:00 ETA
written to stdout
pod "tmp" deleted
```

## Creating the Ingress

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

## Accessing the Ingress

Accessing the Ingress differs depending on the Kubernetes cluster you are using. Follow the instructions in the section based on your Kubernetes cluster setup.

### Using a Regular Kubernetes Cluster

Edit the file `/etc/hosts` via `sudo vim /etc/hosts`. Add the following entry to map the host name `hello-world.exposed` to the node's IP address.

```
192.168.64.38 hello-world.exposed
```

Make a `curl` call to the host name mapped by the Ingress. The call should be routed toward the backend and respond with the message "Hello World".

```
$ curl hello-world.exposed
Hello World
```

### Using Minikube

Minikube requires you to open a tunnel before you can access an ingress. In a new terminal window, run the following command and leave it running.

```
$ minikube tunnel
✅  Tunnel successfully started

📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

❗  The service/ingress hello-world-ingress requires privileged ports to be exposed: [80 443]
🔑  sudo permission will be asked for it.
🏃  Starting tunnel for service hello-world-ingress.
```

Edit the file `/etc/hosts` via `sudo vim /etc/hosts`. Add the following entry to map the host name `hello-world.exposed` to the IP address `127.0.0.1`. **Do not use the minikube IP address here, as it is not exposed to the host.**

```
127.0.0.1 hello-world.exposed
```

Make a `curl` call to the host name mapped by the Ingress. The call should be routed toward the backend and respond with the message "Hello World".

```
$ curl hello-world.exposed
Hello World
```