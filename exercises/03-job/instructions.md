# Exercise 3

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)

</p>
</details>

In this exercise, you will create a parallel-executed Job that is in charge of writing a randomly-generated string in base64-encoded form to standard output.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive labs ["Creating a Nonparallel Job"](https://learning.oreilly.com/scenarios/creating-a-nonparallel/9781098163877/), and ["Creating a Parallel Job"](https://learning.oreilly.com/scenarios/creating-a-parallel/9781098163884/).

1. Create a Job named `random-hash` that executes the shell command `echo $RANDOM | base64 | head -c 20`. Configure the Job to execute with two Pods in parallel. The number of completions should be set to five. Use the container image `alpine:3.17.3`.
2. Identify the Pods that executed the shell command. How many Pods do expect to exist?
3. Retrieve the generated hash from one of the Pods.
4. Delete the Job. Will the corresponding Pods continue to exist?
