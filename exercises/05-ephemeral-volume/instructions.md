# Exercise 5

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `h92`<br>
* Documentation: [Ephemeral Volumes](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/)

</p>
</details>

In this exercise, you will create a Pod that runs the web server [nginx](https://docs.nginx.com/nginx/admin-guide/web-server/). Nginx requires certain directory paths to be writable. We'll mount ephemeral Volumes to make those paths available to the container.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Creating a Pod with Volume of Type emptydir"](https://learning.oreilly.com/scenarios/creating-a-pod/9781098163907/).

1. Create a Pod named `nginx` in the namespace `h92`. Its container should run the container image `nginx:1.21.6`.
2. Define a Volume of type `emptyDir` named `nginx-run` which mounts the path `/var/run` to the container.
3. Define a Volume of type `emptyDir` named `nginx-cache` which mounts the path `/var/cache/nginx` to the container.
4. Define a Volume of type `emptyDir` named `nginx-data` which mounts the path `/usr/local/nginx` to the container.
5. (Optional) Say you would want to ensure the nginx can only write to those Volume mount paths but not the container's temporary file system. How do you prevent this from being allowed?
