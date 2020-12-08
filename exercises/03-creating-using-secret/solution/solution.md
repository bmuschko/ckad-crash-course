# Solution

It's easy to create the secret from the command line. Furthermore, execute the `run` command to generate the YAML file for the Pod.

```shell
$ kubectl create secret generic db-credentials --from-literal=db-password=passwd
secret/db-credentials created
$ kubectl get secrets
NAME              TYPE      DATA   AGE
db-credentials    Opaque    1      26s
$ kubectl run backend --image=nginx -o yaml --dry-run=client --restart=Never > pod.yaml
```

Edit the YAML file and create an environment that reads the relevant key from the secret.

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: backend
  name: backend
spec:
  containers:
  - image: nginx
    name: backend
    env:
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: db-password
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

Create the Pod by pointing the `create` command to the YAML file.

```shell
$ kubectl create -f pod.yaml
```

You can find the environment variable by shelling into the container and running the `env` command.

```shell
$ kubectl exec -it backend -- /bin/sh
# env
DB_PASSWORD=passwd
# exit
```

## Optional

>  What is one of the benefit of using a Secret over a ConfigMap?

A Secret is distributed only to the nodes running Pods that actually require access to it. Moreover, Secrets are stored in memory and are never written to a physical storage.