# Solution

Create the namespace `h92` using an imperative command.

```
$ kubectl create ns h92
namespace/h92 created
```

Start by creating a YAML manifest file, e.g. in the file named `nginx-pod.yaml`. Add the basic definition for the nginx web server. The initial file contents could look as follows:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: h92
spec:
  containers:
  - name: nginx
    image: nginx:1.21.6
```

Add the Volumes with their corresponding mount paths. The modified YAML manifest could look as shown below.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: h92
spec:
  containers:
  - name: nginx
    image: nginx:1.21.6
    volumeMounts:
    - name: nginx-run
      mountPath: /var/run
    - name: nginx-cache
      mountPath: /var/cache/nginx
    - name: nginx-data
      mountPath: /usr/local/nginx
  volumes:
  - name: nginx-run
    emptyDir: {}
  - name: nginx-data
    emptyDir: {}
  - name: nginx-cache
    emptyDir: {}
```

For security reasons, it's advisable to make the [container's temporary file system read-only](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/). You can do so by setting `spec.securityContext.readOnlyRootFilesystem` to `true`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: h92
spec:
  containers:
  - name: nginx
    image: nginx:1.21.6
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: nginx-run
      mountPath: /var/run
    - name: nginx-cache
      mountPath: /var/cache/nginx
    - name: nginx-data
      mountPath: /usr/local/nginx
  volumes:
  - name: nginx-run
    emptyDir: {}
  - name: nginx-data
    emptyDir: {}
  - name: nginx-cache
    emptyDir: {}
```

Create the Pod object and ensure that its status transitions into "Running".

```
$ kubectl apply -f nginx-pod.yaml
pod/nginx created
$ kubectl get pod nginx -n h92
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          36s
```