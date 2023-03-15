# Exercise 1

In this exercise, you will practice the creation of a new Pod in a namespace. Once created, you will inspect it, shell into it and run some operations inside of the container.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda lab ["Creating and interacting with a Pod"](https://learning.oreilly.com/scenarios/ckad-pods-creating/9781098104818/).

1. Create the namespace `ckad-prep`.
2. In the namespace `ckad-prep`, create a new Pod named `mypod` with the image `nginx:2.3.5`. Expose the port 80.
3. Identify the issue with creating the container. Write down the root cause of issue in a file named `pod-error.txt`.
4. Change the image of the Pod to `nginx:1.23.3`.
5. List the Pod and ensure that the container is running.
6. Log into the container and run the `ls` command. Write down the output. Log out of the container.
7. Retrieve the IP address of the Pod `mypod`.
8. Run a temporary Pod in the namespace `ckad-prep` using the image `busybox`, shell into it and run a `wget` command against the `nginx` Pod using port 80.
9. Render the logs of Pod `mypod`.
10. Delete the Pod and the namespace.
