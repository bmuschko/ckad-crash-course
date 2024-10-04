# Solution

Start by creating the Pod definition as YAML file in `pod.yaml`. Initially, you will only define the container with its command.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-security-context
spec:
  containers:
  - name: busybox
    image: busybox:1.28
    command: ["sh", "-c", "sleep 1h"]
```

Enhance the Pod definition by adding the Volume.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-security-context
spec:
  containers:
  - name: busybox
    image: busybox:1.28
    command: ["sh", "-c", "sleep 1h"]
    volumeMounts:
    - name: vol
      mountPath: /data/test
  volumes:
  - name: vol
    emptyDir: {}
```

Finally, define the security context. Some of the security context attribute can only be set on the Pod-level, some others can only be defined on the container-level.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-security-context
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: busybox
    image: busybox:1.28
    command: ["sh", "-c", "sleep 1h"]
    volumeMounts:
    - name: vol
      mountPath: /data/test
    securityContext:
      allowPrivilegeEscalation: false
  volumes:
  - name: vol
    emptyDir: {}
```

Create the Pod with the following command.

```
$ kubectl apply -f pod.yaml
pod/busybox-security-context created
```

Open an interactive shell to the container. Create the file in the directory of the volume mount. The file user ID should be 1000, the group ID should be 2000, as defined by the security context.

```
$ kubectl exec -it busybox-security-context -- sh
/ $ cd /data/test
/data/test $ touch logs.txt
/data/test $ ls -l
total 0
-rw-r--r--    1 1000     2000             0 May 23 01:10 logs.txt
/data/test $ exit
command terminated with exit code 1
```