# Solution

Start by creating the Pod definition as YAML file.

```shell
$ kubectl run secured --image=nginx --restart=Never -o yaml --dry-run > secured.yaml
```

Edit the YAML file, add a volume and a volume mount. Add a security context with the relevant group ID.

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: secured
  name: secured
spec:
  securityContext:
    fsGroup: 3000
  containers:
  - image: nginx
    name: secured
    volumeMounts:
    - name: data-vol
      mountPath: /data/app
    resources: {}
  volumes:
  - name: data-vol
    emptyDir: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

Create the Pod and log into the container. Create the file in the directory of the volume mount. The group ID should be 3000 as defined by the security context.

```shell
$ kubectl create -f secured.yaml
pod/secured created
$ kubectl exec -it secured -- sh
# cd /data/app
# touch logs.txt
# ls -l
-rw-r--r-- 1 root 3000 0 Mar 11 15:56 logs.txt
# exit
```