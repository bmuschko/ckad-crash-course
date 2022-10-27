# Solution

Create the namespace `t23`.

```
$ kubectl create namespace t23
```

Create the service account `api-call` in the namespace.

```
$ kubectl create serviceaccount api-call -n t23
```

Define a YAML manifest file with the name `pod.yaml`. The contents of a file define a Pod that makes a HTTPS GET call to the API server to retrieve the list of Services in the `default` namespace.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: service-list
  namespace: t23
spec:
  serviceAccountName: api-call
  containers:
  - name: service-list
    image: alpine/curl:3.14
    command: ['sh', '-c', 'while true; do curl -s -k -m 5 -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" https://kubernetes.default.svc.cluster.local/api/v1/namespaces/default/services; sleep 10; done']
```

Create the Pod with the following command.

```
$ kubectl apply -f pod.yaml
```

Check the logs of the Pod. The API call is not authorized, as shown in the log output below.

```
$ kubectl logs service-list -n t23
{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "services is forbidden: User \"system:serviceaccount:t23 \
              :api-call\" cannot list resource \"services\" in API \
              group \"\" in the namespace \"default\"",
  "reason": "Forbidden",
  "details": {
    "kind": "services"
  },
  "code": 403
}
```

Create the YAML manifest in the file `clusterrole.yaml`, as shown below.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: list-services-clusterrole
rules:
- apiGroups: [""]
  resources: ["services"]
  verbs: ["list"]
```

Reference the ClusterRole in a RoleBinding defined in the file `rolebinding.yaml`. The subject should list the service account `api-call` in the namespace `t23`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: serviceaccount-service-rolebinding
subjects:
- kind: ServiceAccount
  name: api-call
  namespace: t23
roleRef:
  kind: ClusterRole
  name: list-services-clusterrole
  apiGroup: rbac.authorization.k8s.io
```

Create both objects from the YAML manifests.

```
$ kubectl apply -f clusterrole.yaml
$ kubectl apply -f rolebinding.yaml
```

The API call running inside of the container should now be authorized and be allowed to list the Service objects in the `default` namespace. As shown in the output below, the namespace currently hosts at least one Service object, the `kubernetes.default` Service.

```
$ kubectl logs service-list -n t23
{
  "kind": "ServiceList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion": "1108"
  },
  "items": [
     {
       "metadata": {
         "name": "kubernetes",
         "namespace": "default",
         "uid": "30eb5425-8f60-4bb7-8331-f91fe0999e20",
         "resourceVersion": "199",
         "creationTimestamp": "2022-09-08T18:06:52Z",
         "labels": {
           "component": "apiserver",
           "provider": "kubernetes"
       },
       ...
     }
  ]
}
```