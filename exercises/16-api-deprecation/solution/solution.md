# Solution

This exercise verifies your comfortability-level with API deprecations and how to handle them appropriately. If you are tring to create both objects with Kubernetes 1.26, you will find that the API version `apps/v1beta2` assigned to the Deployment definition cannot be found.

```
$ kubectl apply -f ./
configmap/data-config created
error: resource mapping not found for name: "nginx" namespace: "" from "deployment.yaml": no matches for kind "Deployment" in version "apps/v1beta2"
ensure CRDs are installed first
```

Don't let the error message mislead you. A Deployment is a built-in API primitive and therefore doesn't require you to install a CRD for it. Checking on the available API version confirms that `apps/v1beta2` indeed does not exist.

```
$ kubectl api-versions
admissionregistration.k8s.io/v1
apiextensions.k8s.io/v1
apiregistration.k8s.io/v1
apps/v1
authentication.k8s.io/v1
authorization.k8s.io/v1
autoscaling/v1
autoscaling/v2
batch/v1
certificates.k8s.io/v1
coordination.k8s.io/v1
discovery.k8s.io/v1
events.k8s.io/v1
flowcontrol.apiserver.k8s.io/v1beta2
flowcontrol.apiserver.k8s.io/v1beta3
networking.k8s.io/v1
node.k8s.io/v1
policy/v1
rbac.authorization.k8s.io/v1
scheduling.k8s.io/v1
storage.k8s.io/v1
storage.k8s.io/v1beta1
v1
```

Checking on the [Kubernetes blog](https://kubernetes.io/blog/2019/07/18/api-deprecations-in-1-16/), you will find that the API version `apps/v1beta2` has been removed with Kubernetes 1.16. The replacement API, `apps/v1`, has been introduced in Kubernetes 1.9.

> Migrate to use the apps/v1 API version, available since v1.9. Existing persisted data can be retrieved/updated via the new version.

Modify the Deployment manifest file by replacing the API version.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  template:
    metadata:
      labels:
        run: app
    spec:
      containers:
      - image: nginx:1.23.4
        name: nginx
        ports:
        - containerPort: 80
        envFrom:
        - configMapRef:
            name: data-config
```

Trying to create the Deployment object reveals that another portion of the configuration is required with API version `apps/v1`, the label selector of the template.

```
$ kubectl apply -f ./
configmap/data-config unchanged
The Deployment "nginx" is invalid:
* spec.selector: Required value
* spec.template.metadata.labels: Invalid value: map[string]string{"run":"app"}: `selector` does not match template `labels`
```

Change the Deployment definition so that it selects the label of the Pod template.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      run: app
  template:
    metadata:
      labels:
        run: app
    spec:
      containers:
      - image: nginx:1.23.4
        name: nginx
        ports:
        - containerPort: 80
        envFrom:
        - configMapRef:
            name: data-config
```

Both object can now be created.

```
$ kubectl apply -f ./
configmap/data-config unchanged
deployment.apps/nginx created

$ kubectl get deployments,configmaps
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx   2/2     2            2           45s

NAME                         DATA   AGE
configmap/data-config        2      19m
```