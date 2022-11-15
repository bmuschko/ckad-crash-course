# Solution

Create the ConfigMap and point to the text file upon creation.

```
$ kubectl create configmap db-config --from-env-file=config.txt
configmap/db-config created
$ kubectl run backend --image=nginx -o yaml --dry-run=client --restart=Never > pod.yaml
```

The final YAML file should look similar to the following code snippet.

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
    envFrom:
      - configMapRef:
          name: db-config
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

Create the Pod by pointing the `create` command to the YAML file.

```
$ kubectl create -f pod.yaml
```

Log into the Pod and run the `env` command.

```
$ kubectl exec backend -it -- /bin/sh
# env
DB_URL=localhost:3306
DB_USERNAME=postgres
...
# exit
```

## Optional

> How would you approach hot reloading of values defined by a ConfigMap consumed by an application running in Pod?

Changes to environment variables are only reflected if the Pod is restarted. Alternatively, you can mount a ConfigMap as file and poll changes from the mounted file periodically, however, it requires the application to build in the logic.
