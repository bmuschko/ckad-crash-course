# Exercise 27

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Configure a Security Context for a Pod or Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)

</p>
</details>

In this exercise, you will create a Pod that defines a security context with different options.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Defining a security context"](https://learning.oreilly.com/scenarios/ckad-security-defining/9781098104948/).

1. Define a Pod named `busybox-security-context` that uses the image `busybox:1.28` for a single container running the command `sh -c sleep 1h`.
2. Add an ephemeral Volume of type `emptyDir`. Mount the Volume to the container at `/data/test`.
3. Define a security context that runs the container with user ID 1000, with group ID 3000, and the file system group ID 2000. Ensure that the container should not allow privilege escalation.
4. Create the Pod object and ensure that it transitions into the "Running" status.
5. Open a shell to the running container and create a new file named `logs.txt` in the directory `/data/test`. What's the file's user ID and group ID?
