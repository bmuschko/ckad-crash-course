# Solution

The `create cronjob` command provides a good shortcut for creating a CronJob with a single command.

```
$ kubectl create cronjob current-date --schedule="* * * * *" --image=nginx:1.21.6 -- /bin/sh -c 'echo "Current date: $(date)"'
cronjob.batch/current-date created
```

Watch the Jobs as they are executed.

```
$ kubectl get jobs --watch
NAME                      COMPLETIONS   DURATION   AGE
current-date-1557522540   1/1           3s         103s
current-date-1557522600   1/1           4s         43s
```

Identify one of the Pods (the label indicates the Job name) and render its logs.

```
$ kubectl get pods --show-labels
NAME                            READY   STATUS      RESTARTS   AGE   LABELS
current-date-1557522540-dp8l9   0/1     Completed   0          1m    controller-uid=3aaabf96-7369-11e9-96c6-025000000001,job-name=current-date-1557523140,run=current-date

$ kubectl logs current-date-1557522540-dp8l9
Current date: Fri May 10 21:09:12 UTC 2019
```

The value of the attribute `successfulJobsHistoryLimit` defines how many executions are kept in the history.

```
$ kubectl get cronjobs current-date -o yaml | grep successfulJobsHistoryLimit:
  successfulJobsHistoryLimit: 3
```

Finally, delete the CronJob.

```
$ kubectl delete cronjob current-date
```
