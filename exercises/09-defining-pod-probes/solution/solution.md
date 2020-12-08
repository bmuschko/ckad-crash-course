# Solution

Create the intial YAML with the following command.

```shell
$ kubectl run hello --image=bmuschko/nodejs-hello-world:1.0.0 --port=3000 -o yaml --dry-run=client --restart=Never > pod.yaml
```

Edit the YAML file and add the probes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: hello
  name: hello
spec:
  containers:
  - image: bmuschko/nodejs-hello-world:1.0.0
    name: hello
    ports:
    - name: nodejs-port
      containerPort: 3000
    readinessProbe:
      httpGet:
        path: /
        port: nodejs-port
      initialDelaySeconds: 2
    livenessProbe:
      httpGet:
        path: /
        port: nodejs-port
      initialDelaySeconds: 5
      periodSeconds: 8
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

Create the Pod from the YAML file, shell into the Pod as soon as it is running and execute the `curl` command.

```shell
$ kubectl create -f pod.yaml
pod/hello created
$ kubectl exec hello -it -- /bin/sh
# curl localhost:3000
Hello World
# exit
```

Rendering the logs of the Pod reveals additional log output.

```shell
$ kubectl logs pod/hello
Magic happens on port 3000
```