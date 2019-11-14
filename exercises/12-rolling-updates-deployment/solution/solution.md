# Solution

Generate the YAML for a Deployment plus Pod for further editing.

```shell
$ kubectl create deployment deploy --image=nginx --dry-run -o yaml > deploy.yaml
```

Edit the labels. The selector should match the labels of the Pods. Change the replicas from 1 to 3.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    tier: backend
  name: deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: v1
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: v1
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}
status: {}
```

Create the deployment by pointing it to the YAML file.

```shell
$ kubectl create -f deploy.yaml
deployment.apps/deploy created
$ kubectl get deployments
NAME     DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy   3         3         3            1           4s
```

Set the new image and check the revision history.

```shell
$ kubectl set image deployment/deploy nginx=nginx:latest
deployment.extensions/deploy image updated

$ kubectl rollout history deploy
deployment.extensions/deploy
REVISION  CHANGE-CAUSE
1         <none>
2         <none>

$ kubectl rollout history deploy --revision=2
deployment.extensions/deploy with revision #2
Pod Template:
  Labels:	app=v1
	pod-template-hash=1370799740
  Containers:
   nginx:
    Image:	nginx:latest
    Port:	<none>
    Host Port:	<none>
    Environment:	<none>
    Mounts:	<none>
  Volumes:	<none>
```

Now scale the Deployment to 5 replicas.

```shell
$ kubectl scale deployments deploy --replicas=5
deployment.extensions/deploy scaled
```

Roll back to revision 1. You will see the new revision. Inspecting the revision should show the image `nginx`.

```shell
$ kubectl rollout undo deployment/deploy --to-revision=1
deployment.extensions/deploy

$ kubectl rollout history deploy
deployment.extensions/deploy
REVISION  CHANGE-CAUSE
2         <none>
3         <none>

$ kubectl rollout history deploy --revision=3
deployment.extensions/deploy with revision #3
Pod Template:
  Labels:	app=v1
	pod-template-hash=454670702
  Containers:
   nginx:
    Image:	nginx
    Port:	<none>
    Host Port:	<none>
    Environment:	<none>
    Mounts:	<none>
  Volumes:	<none>
```

## Optional

> Can you foresee potential issues with a rolling deployment?

A rolling deployment ensures zero downtime which has the side effect of having two different versions of a container running at the same time. This can become an issue if you introduce backward-incompatible changes to your public API. A client might hit either the old or new service API.

> How do you configure a update process that first kills all existing containers with the current version before it starts containers with the new version?

You can configure the deployment use the `Recreate` strategy. This strategy first kills all existing containers for the deployment running the current version before starting containers running the new version.