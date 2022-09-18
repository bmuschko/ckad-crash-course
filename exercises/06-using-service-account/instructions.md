# Exercise 6

In this exercise, you will create a ServiceAccount and assign it to a Pod.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda lab ["Creating and assigning a ServiceAccount"](https://learning.oreilly.com/labs/3-7-ckad-security/9781098104962/).

## Using a ServiceAccount

1. Create a new service account named `backend-team`.
2. Print out the token for the service account in YAML format.
3. Create a Pod named `backend` that uses the image `nginx` and the identity `backend-team` for running processes.
4. Get a shell to the running container and print out the token of the service account.