# Exercise 9

In this exercise, you will training your debugging skills by inspecting and fixing a misconfigured Pod.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda lab ["Troubleshooting a Pod"](https://learning.oreilly.com/scenarios/ckad-troubleshooting-troubleshooting/9781098105150/).

1. Create a new Pod with the following YAML in the file [`pod.yaml`](./pod.yaml).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: failing-pod
spec:
  containers:
  - args:
    - /bin/sh
    - -c
    - while true; do echo $(date) >> ~/tmp/curr-date.txt; sleep
      5; done;
    image: busybox
    name: failing-pod
  restartPolicy: Never
```

2. Check the Pod's status. Do you see any issue?
3. Follow the logs of the running container and identify an issue.
4. Fix the issue by shelling into the container. After resolving the issue the current date should be written to a file. Render the output.
