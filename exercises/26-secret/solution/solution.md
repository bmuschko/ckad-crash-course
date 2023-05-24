# Solution

It's easy to create the secret from the command line.

```
$ kubectl create secret generic db-credentials --from-literal=db-password=passwd
secret/db-credentials created
```

The imperative command automatically base64-encodes the provided value of the literal. You can render the details of the Scret object from the command line. The assigned value to the key `db-password` is `cGFzc3dk`.

```
$ kubectl get secret db-credentials -o yaml
apiVersion: v1
data:
  db-password: cGFzc3dk
kind: Secret
metadata:
  creationTimestamp: "2023-05-22T16:47:33Z"
  name: db-credentials
  namespace: default
  resourceVersion: "7557"
  uid: 2daf580a-b672-40dd-8c37-a4adb57a8c6c
type: Opaque
```

Execute the `run` command in combination with the `--dry-run` flag to generate the YAML file for the Pod.

```
$ kubectl run backend --image=nginx:1.23.4-alpine -o yaml --dry-run=client --restart=Never > pod.yaml
```

Edit the YAML file and create an environment that reads the key from the secret while assigning a new same for it.

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: backend
  name: backend
spec:
  containers:
  - image: nginx:1.23.4-alpine
    name: backend
    env:
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: db-password
```

Create the Pod by pointing the `apply` command to the YAML file.

```
$ kubectl apply -f pod.yaml
pod/backend created
```

You can find the environment variable in base64-decoded form by shelling into the container and running the `env` command. 

```
$ kubectl exec -it backend -- env
DB_PASSWORD=passwd
```

## Optional

>  What is one of the benefit of using a Secret over a ConfigMap?

A Secret is distributed only to the nodes running Pods that actually require access to it. Moreover, Secrets are stored in memory and are never written to a physical storage.