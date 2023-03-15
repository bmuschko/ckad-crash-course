# Exercise 2

In this exercise, you will create a CronJob and render its executions.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the task from the Kubernetes documentation ["Running Automated Tasks with a CronJob"](https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/).

1. Create a CronJob named `current-date`, using the image `bash` that runs every minute and executes the shell command `echo "Current date: $(date)"`.
2. Watch the jobs as they are being scheduled.
3. Identify one of the Pods that ran the CronJob and render the logs.
4. Determine the number of successful executions the CronJob will keep in its history.
5. Delete the CronJob.
