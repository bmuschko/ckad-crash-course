# Solution

Create the YAML manifest for a Deployment in the file `nginx-deployment.yaml`. The label selector should match the labels assigned to the Pod template.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    tier: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: v1
  template:
    metadata:
      labels:
        app: v1
    spec:
      containers:
      - image: nginx:1.23.0
        name: nginx
```

Create the deployment by pointing it to the YAML file. Check on the Deployment status.

```
$ kubectl apply -f nginx-deployment.yaml
deployment.apps/nginx created

$ kubectl get deployment nginx
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   3/3     3            3           10s
```

Set the new image and check the revision history.

```
$ kubectl set image deployment/nginx nginx=nginx:1.23.4
deployment.apps/nginx image updated

$ kubectl rollout history deployment nginx
deployment.apps/nginx
REVISION  CHANGE-CAUSE
1         <none>
2         <none>

$ kubectl rollout history deployment nginx --revision=2
deployment.apps/nginx with revision #2
Pod Template:
  Labels:	app=v1
	pod-template-hash=5bd95c598
  Containers:
   nginx:
    Image:	nginx:1.23.4
    Port:	<none>
    Host Port:	<none>
    Environment:	<none>
    Mounts:	<none>
  Volumes:	<none>
```

Add the change cause to the current revision by annotating the Deployment object.

```
$ kubectl annotate deployment nginx kubernetes.io/change-cause="Pick up patch version"
deployment.apps/nginx annotated
```

The revision change cause can be inspected by rendering the rollout history.

```
$ kubectl rollout history deployment nginx
deployment.apps/nginx
REVISION  CHANGE-CAUSE
1         <none>
2         Pick up patch version
```

Now, scale the Deployment to 5 replicas. You should find 5 Pods controlled by the Deployment.

```
$ kubectl scale deployment nginx --replicas=5
deployment.apps/nginx scaled

$ kubectl get pod -l app=v1
NAME                    READY   STATUS    RESTARTS   AGE
nginx-5bd95c598-25z4j   1/1     Running   0          3m39s
nginx-5bd95c598-46mlt   1/1     Running   0          3m38s
nginx-5bd95c598-bszvp   1/1     Running   0          48s
nginx-5bd95c598-dwr8r   1/1     Running   0          48s
nginx-5bd95c598-kjrvf   1/1     Running   0          3m37s
```

Roll back to revision 1. You will see the new revision. Inspecting the revision should show the image `nginx:1.23.0`.

```
$ kubectl rollout undo deployment/nginx --to-revision=1
deployment.apps/nginx rolled back

$ kubectl rollout history deployment nginx
deployment.apps/nginx
REVISION  CHANGE-CAUSE
2         Pick up patch version
3         <none>

$ kubectl rollout history deployment nginx --revision=3
deployment.apps/nginx with revision #3
Pod Template:
  Labels:	app=v1
	pod-template-hash=f48dc88cd
  Containers:
   nginx:
    Image:	nginx:1.23.0
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