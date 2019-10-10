# Solution

First, create the service acccount and inspect it.

```shell
$ kubectl create serviceaccount backend-team
serviceaccount/backend-team created
$ kubectl get serviceaccount backend-team -o yaml --export
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2019-05-09T22:43:54Z
  name: backend-team
  namespace: default
  resourceVersion: "1888067"
  selfLink: /api/v1/namespaces/default/serviceaccounts/backend-team
  uid: ecd3b7ea-72ab-11e9-96c5-025000000001
secrets:
- name: backend-team-token-hskch
```

Next, you can create a new Pod and assign the service account to it.

```shell
$ kubectl run backend --image=nginx --restart=Never --serviceaccount=backend-team
```

You can print out the token from the volume source at `/var/run/secrets/kubernetes.io/serviceaccount`.

```shell
$ kubectl exec -it backend -- /bin/sh
# cat /var/run/secrets/kubernetes.io/serviceaccount/token
eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImJhY2tlbmQtdGVhbS10b2tlbi1kbTJmZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJiYWNrZW5kLXRlYW0iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxNzM0MzVjMS00NDJmLTExZTktOGRjMy0wMjUwMDAwMDAwMDEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpiYWNrZW5kLXRlYW0ifQ.DjWUxEMNUmQVoXd4b-eIjxboj3w3k7hS5hfV8mm8eoEPz3HJJMgjIpAaurcvo1pp2Ggpd1kIhQvfRqI6-u57f80N5UqXt_qATJfonat2NNXX8pXmFNoPig9LB-pbo8TN_pYGWNworXsxmK9w6V9eaRosIinRp0u-cvijQbsBw3lxWgGo9S4G-7f19mMKN1Pg2xS2J6fKX9IKvhHrUkM91nwcwmsO0use5B4TGbuRa9METiGsfEpegvzMPBbPl0B_T1ANH_pck0LFNtvKe0g1v5zpKx2lRF9WdFAqPsG7BJ1dEH88JtBHzD59OhxIPqtyT4sXKjACBN_ka5ZADMzPJg
```