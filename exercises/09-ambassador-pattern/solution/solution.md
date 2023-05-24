# Solution

Create the namespace `ext-access` to begin with.

```
$ kubectl create ns ext-access
namespace/ext-access created
```

Start by generating the YAML manifest in `dry-run` mode. The resulting manifest in the file `rate-limiter.yaml` will set up the main application container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: rate-limiter
  namespace: ext-access
spec:
  containers:
  - name: business-app
    image: bmuschko/nodejs-business-app:1.0.0
    ports:
    - containerPort: 8080
  restartPolicy: Never
```

The main application container is set up. Edit the file `rate-limiter.yaml` and add the `ambassador` container. The YAML manifest should look like the following:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: rate-limiter
  namespace: ext-access
spec:
  containers:
  - name: business-app
    image: bmuschko/nodejs-business-app:1.0.0
    ports:
    - containerPort: 8080
  - name: ambassador
    image: bmuschko/nodejs-ambassador:1.0.0
    ports:
    - containerPort: 8081
  restartPolicy: Never
```

The order of definition for the containers is not important. Ambassador containers will be started in parallel.

Execute the following command to create the Pod:

```
$ kubectl apply -f rate-limiter.yaml
pod/rate-limiter created
```

Ensure that the Pod transitions into the "Running" status:

```
$ kubectl get pod rate-limiter -n ext-access
NAME           READY   STATUS    RESTARTS   AGE
rate-limiter   2/2     Running   0          31s
```

Shell into the container named `business-app`. Execute the `curl` command at least six times. You should encounter the error message "Too many requests have been made from this IP, please try again after an hour" on the sixth call:

```
$ kubectl exec rate-limiter -it -c business-app -n ext-access -- /bin/sh
# curl localhost:8080/test
{"args":{"test":"123"},"headers":{"x-forwarded-proto":"https", "x-forwarded-port":"443","host":"postman-echo.com", "x-amzn-trace-id":"Root=1-5f177dba-e736991e882d12fcffd23f34"}, "url":"https://postman-echo.com/get?test=123"}
...
# curl localhost:8080/test
Too many requests made created from this IP, please try again after an hour
```

An end user would have to wait for the rate limiting to reset, which will take about an hour.
