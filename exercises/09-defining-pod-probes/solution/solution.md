# Solution

Create the intial YAML with the following command.

```shell
$ kubectl run hello --image=bonomat/nodejs-hello-world --restart=Never --port=3000 -o yaml --dry-run > pod.yaml
```

Edit the YAML file and add the probes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: hello
  name: hello
spec:
  containers:
  - image: bonomat/nodejs-hello-world
    name: hello
    ports:
    - name: nodejs-port
      containerPort: 3000
    readinessProbe:
      httpGet:
        path: /
        port: nodejs-port
      initialDelaySeconds: 2
    livenessProbe:
      httpGet:
        path: /
        port: nodejs-port
      initialDelaySeconds: 5
      periodSeconds: 8
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

Create the Pod from the YAML file, shell into the Pod as soon as it is running and execute the `curl` command.

```shell
$ kubectl create -f pod.yaml
pod/hello created
$ kubectl exec hello -it -- /bin/sh
# curl localhost:3000
<!DOCTYPE html>
<html>
<head>
	<title>NodeJS Docker Hello World</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
	<link href="/stylesheets/styles.css" rel="stylesheet">
</head>
<body>
	<div class="container">
		<div class="well well-sm">
			<h2>This is just a hello world message</h2>
			<img a href="./cage.jpg"/>
			<img src="src/cage.jpg" alt="Smiley face" width="640">
		</div>
	</div>
</body>
</html>
# exit

$ kubectl logs pod/hello
Magic happens on port 3000
```