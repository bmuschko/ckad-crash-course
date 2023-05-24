Start by creating a YAML manifest file named `random-hash-job.yaml`. The contents of the file could look as follows:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: random-hash
spec:e
  parallelism: 2
  completions: 5
  backoffLimit: 4
  template:
    spec:
      containers:
      - name: random-hash
        image: alpine:3.17.3
        command: ["/bin/sh", "-c", "echo $RANDOM | base64 | head -c 20"]
      restartPolicy: Never
```

Create the Job from the YAML manifest:

```
$ kubectl apply -f random-hash-job.yaml
job.batch/random-hash created
```

The end result will be five Pods that correspond to the number of completions. You can combine the `kubectl` command with the `grep` command to easily find the Pods that are controlled by the job named `random-hash`.

```
$ kubectl get pods | grep "random-hash-"
NAME                READY   STATUS      RESTARTS   AGE
random-hash-4qk96   0/1     Completed   0          46s
random-hash-ld2sl   0/1     Completed   0          39s
random-hash-xcmts   0/1     Completed   0          35s
random-hash-xxlhk   0/1     Completed   0          46s
random-hash-z9xc4   0/1     Completed   0          39s
```

You can pick one of the Pod by name and get its logs. The downloaded logs will contain the generated hash.

```
$ kubectl logs random-hash-4qk96
MTgxMTIK
```

Deleting the job will also delete the Pods controlled by the Job.

```
$ kubectl delete job random-hash
job.batch "random-hash" deleted
$ kubectl get pods | grep -E "random-hash-" -c
0
```