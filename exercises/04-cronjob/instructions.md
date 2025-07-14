# Exercise 4

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

</p>
</details>

In this exercise, you will create a CronJob and render its executions.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Creating and Inspecting a Periodic Operation Using a CronJob"](https://learning.oreilly.com/scenarios/creating-and-inspecting/9781098163891/).

1. Create a CronJob named `current-date` that runs every minute and executes the shell command `echo "Current date: $(date)"`. Use the container image `nginx:1.21.6`.
2. Watch the jobs as they are being scheduled.
3. Identify one of the Pods that ran the CronJob and render the logs.
4. Determine the number of successful executions the CronJob will keep in its history.
5. Delete the CronJob.
