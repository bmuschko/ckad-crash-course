# Exercise 4

In this exercise, you will create a Pod that defines a filesystem group ID as security context. Based on this security context, you'll create a new file and inspect the outcome of the file creation based on the rule defined earlier.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda scenario ["Defining a security context"](https://learning.oreilly.com/scenarios/3-5-ckad-security/9781098104948/).

## Creating a Security Context for a Pod

1. Create a Pod named `secured` that uses the image `nginx` for a single container. Mount an `emptyDir` volume to the directory `/data/app`.
2. Files created on the volume should use the filesystem group ID 3000.
3. Get a shell to the running container and create a new file named `logs.txt` in the directory `/data/app`. List the contents of the directory and write them down.