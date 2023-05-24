# Exercise 3

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)

</p>
</details>

In this exercise, you will create a parallel-executed Job that is in charge of writing a randomly-generated string in base64-encoded form to standard output.

1. Create a Job named `random-hash` that executes the shell command `echo $RANDOM | base64 | head -c 20`. Configure the Job to execute with two Pods in parallel. The number of completions should be set to five.
2. Identify the Pods that executed the shell command. How many Pods do expect to exist?
3. Retrieve the generated hash from one of the Pods.
4. Delete the Job. Will the corresponding Pods continue to exist?