# Solution

You can assign labels upon Pod creation with the `--labels` option.

```shell
$ kubectl run frontend --image=nginx --restart=Never --labels=env=prod,team=shiny
pod/frontend created
$ kubectl run backend --image=nginx --restart=Never --labels=env=prod,team=legacy,app=v1.2.4
pod/backend created
$ kubectl run database --image=nginx --restart=Never --labels=env=prod,team=storage
pod/database created
```

Edit the existing Pods with the `edit` command and add the annotations as follows:

```shell
$ kubectl edit pod frontend
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    commit: 2d3mg3
    contact: John Doe
  name: frontend
...
```

```shell
$ kubectl edit pod backend
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    contact: 'Mary Harris'
  name: backend
...
```

Render all Pods and their Pods including their assigned labels.

```shell
$ kubectl get pods --show-labels
NAME       READY   STATUS    RESTARTS   AGE   LABELS
backend    1/1     Running   0          41s   app=v1.2.4,env=prod,team=legacy
database   1/1     Running   0          8s    env=prod,team=storage
frontend   1/1     Running   0          1m    env=prod,team=shiny
```

You can combine the selector rules into one expression.

```shell
$ kubectl get pods -l 'team in (shiny, legacy)',env=prod --show-labels
NAME       READY   STATUS    RESTARTS   AGE   LABELS
backend    1/1     Running   0          19m   app=v1.2.4,env=prod,team=legacy
frontend   1/1     Running   0          20m   env=prod,team=shiny
```

You can add and remove labels with the `label` command. The selection now doesn't match for the `backend` Pod anymore.

```shell
$ kubectl label pods backend env-
pod/backend labeled
$ kubectl get pods -l 'team in (shiny, legacy)',env=prod --show-labels
NAME       READY   STATUS    RESTARTS   AGE   LABELS
frontend   1/1     Running   0          23m   env=prod,team=shiny
```

The `grep` command can help with rendering any YAML code around the identified search term.

```shell
$ kubectl get pods -o yaml | grep -C 3 'annotations:'
- apiVersion: v1
  kind: Pod
  metadata:
    annotations:
      cni.projectcalico.org/podIP: 192.168.60.163/32
      contact: Mary Harris
    creationTimestamp: 2019-05-10T17:57:38Z
--
--
- apiVersion: v1
  kind: Pod
  metadata:
    annotations:
      cni.projectcalico.org/podIP: 192.168.60.147/32
    creationTimestamp: 2019-05-10T17:58:11Z
    labels:
--
--
- apiVersion: v1
  kind: Pod
  metadata:
    annotations:
      cni.projectcalico.org/podIP: 192.168.60.159/32
      commit: 2d3mg3
      contact: John Doe
```