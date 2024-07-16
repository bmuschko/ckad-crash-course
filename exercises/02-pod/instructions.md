# Exercise 2

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `ckad-prep`<br>
* Documentation: [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)

</p>
</details>

In this exercise, you will practice the creation of a new Pod in a namespace. Once created, you will inspect it, shell into it and run some operations inside of the container.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive labs ["Creating and Interacting with a Pod in a Namespace"](https://learning.oreilly.com/scenarios/creating-and-interacting/9781098163846/), ["Creating a Pod that Uses a Custom Command"](https://learning.oreilly.com/scenarios/creating-a-pod/9781098163853/), and ["Modifying the Configuration of an Existing Pod"](https://learning.oreilly.com/scenarios/modifying-the-configuration/9781098163860/).

1. Create the namespace `ckad-prep`.
2. In the namespace `ckad-prep`, create a new Pod named `mypod` with the image `nginx:2.3.5`. Expose the port 80.
3. Identify the issue with creating the container. Write down the root cause of the issue in a file named `pod-error.txt`.
4. Change the image of the Pod to `nginx:1.15.12`.
5. List the Pod and ensure that the container is running.
6. Log into the container and run the `ls` command. Write down the output. Log out of the container.
7. Retrieve the IP address of the Pod `mypod`.
8. Run a temporary Pod in the namespace `ckad-prep` using the image `busybox`, shell into it and run a `wget` command against the `nginx` Pod using port 80.
9. Render the logs of Pod `mypod`.
10. Delete the Pod and the namespace.
