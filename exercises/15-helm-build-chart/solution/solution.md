# Solution

Create the file `Chart.yaml` in the current directory:

```
$ vim Chart.yaml
```

Add the following content to the file:

```yaml
apiVersion: 1.0.0
name: web-app
version: 2.5.4
```

Create the file `values.yaml` in the current directory:

```
$ vim values.yaml
```

Add the following content to the file:

```yaml
service_port: 80
container_port: 3000
```

Create the `templates` subdirectory.

```
$ mkdir templates
```

Create the file `web-app-pod-template.yaml` in the directory `templates` with the content shown below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello-world
  namespace: {{ .Release.Namespace }}
  labels:
    app: hello-world
spec:
  containers:
  - image: bmuschko/nodejs-hello-world:1.0.0
    name: hello-world
    ports:
    - containerPort: {{ .Values.container_port }}
      protocol: TCP
```

Create the file `web-app-service-template.yaml` in the directory `templates`. Add the following content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-world-service
  namespace: {{ .Release.Namespace }}
spec:
  type: ClusterIP
  selector:
    app: hello-world
  ports:
  - protocol: TCP
    port: {{ .Values.service_port }}
    targetPort: {{ .Values.container_port }}
```

The templates directory should contain both files:

```
$ ls templates
web-app-pod-template.yaml  web-app-service-template.yaml
```

Bundle the template files into a chart archive file. The chart archive file is a compressed TAR file with the file ending `.tgz`. The `package` command evaluates the metadata information from the `Chart.yaml` to derive the chart archive file name:

```
$ helm package .
Successfully packaged chart and saved it to: /Users/bmuschko/dev/tmp/helm/web-app-2.5.4.tgz
```

The file `web-app-2.5.4.tgz` should exist in the current directory:

```
$ ls web-app-2.5.4.tgz
web-app-2.5.4.tgz
```

Install the chart with the custom namespace `web-app`.

```
$ helm install --namespace web-app --create-namespace --set service_port=9090 hello-world .
NAME: hello-world
LAST DEPLOYED: Thu May 18 16:55:31 2023
NAMESPACE: web-app
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

The objects from the chart now exist in the `web-app` namespace.

```
$ kubectl get services,pods -n web-app
NAME                          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/hello-world-service   ClusterIP   10.110.146.91   <none>        9090/TCP   70s

NAME              READY   STATUS    RESTARTS   AGE
pod/hello-world   1/1     Running   0          70s
```

Uninstall the chart with the following command. Make sure to provide the namespace.

```
$ helm uninstall hello-world -n web-app
release "hello-world" uninstalle
```