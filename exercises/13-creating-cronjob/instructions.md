# Exercise 13

In this exercise, you will create a CronJob and render its executions.

## Creating a Scheduled Container Operation

1. Create a CronJob named `current-date` that runs every minute and executes the shell command `echo "Current date: $(date)"`.
2. Watch the jobs as they are being scheduled.
3. Identify one of the Pods that ran the CronJob and render the logs.
4. Determine the number of successful executions the CronJob will keep in its history.
5. Delete the Job.