# Exercise 10

In this exercise, you will training your debugging skills by inspecting and fixing a misconfigured Pod.

## Fixing a Misconfigured Pod

1. Create a new Pod with the following YAML.

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: failing-pod
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
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

2. Check the Pod's status. Do you see any issue?
3. Follow the logs of the running container and identify an issue.
4. Fix the issue by shelling into the container. After resolving the issue the current date should be written to a file. Render the output.
