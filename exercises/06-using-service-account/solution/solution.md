# Solution

First, create the service acccount with either the imperative or declarative approach. The following command uses the imperative command `create serviceaccount`.

```
$ kubectl create serviceaccount backend-team
serviceaccount/backend-team created
```

Starting with Kubernetes 1.24, a service account does not automatically create a corresponding Secret object anymore. Listing the service account renders the value in the "SECRETS" column.

```
$ kubectl get sa backend-team
NAME           SECRETS   AGE
backend-team   0         2m22s
```

The YAML representation of the live object doe not have the attribute `secrets` anymore.

```
$ kubectl get serviceaccount backend-team -o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: "2022-09-18T20:01:44Z"
  name: backend-team
  namespace: default
  resourceVersion: "406"
  uid: 2d13e770-46ee-4549-b44b-b9f10a147241
```

You can create a new Pod and assign the service account to it.

```
$ kubectl run backend --image=nginx --restart=Never --overrides='{ "spec": { "serviceAccountName": "backend-team" } }'
pod/backend created
```

The default behavior of a service account is to automount the token at `/var/run/secrets/kubernetes.io/serviceaccount/token`. To view the token value, shell into the Pod and navigate to `cat` the file contents.

```
$ kubectl exec -it backend -- /bin/sh
# cat /var/run/secrets/kubernetes.io/serviceaccount/token
eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImJhY2tlbmQtdGVhbS10b2tlbi1kbTJmZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJiYWNrZW5kLXRlYW0iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxNzM0MzVjMS00NDJmLTExZTktOGRjMy0wMjUwMDAwMDAwMDEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpiYWNrZW5kLXRlYW0ifQ.DjWUxEMNUmQVoXd4b-eIjxboj3w3k7hS5hfV8mm8eoEPz3HJJMgjIpAaurcvo1pp2Ggpd1kIhQvfRqI6-u57f80N5UqXt_qATJfonat2NNXX8pXmFNoPig9LB-pbo8TN_pYGWNworXsxmK9w6V9eaRosIinRp0u-cvijQbsBw3lxWgGo9S4G-7f19mMKN1Pg2xS2J6fKX9IKvhHrUkM91nwcwmsO0use5B4TGbuRa9METiGsfEpegvzMPBbPl0B_T1ANH_pck0LFNtvKe0g1v5zpKx2lRF9WdFAqPsG7BJ1dEH88JtBHzD59OhxIPqtyT4sXKjACBN_ka5ZADMzPJg
```
