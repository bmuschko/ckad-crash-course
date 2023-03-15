# Exercise 5

In this exercise, you will create a PersistentVolume, connect it to a PersistentVolumeClaim and mount the claim to a specific path of a Pod.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the Kubernetes documentation task ["Configure a Pod to Use a PersistentVolume for Storage"](https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/).

1. Create a PersistentVolume named `pv`, access mode `ReadWriteMany`, 512Mi of storage capacity and the host path `/data/config`.
2. Create a PersistentVolumeClaim named `pvc`. The claim should request 256Mi and use an empty string value for the storage class. Ensure that the PersistentVolumeClaim is properly bound after its creation.
3. Mount the PersistentVolumeClaim from a new Pod named `app` with the path `/var/app/config`. The Pod uses the image `nginx`.
4. Open an interactive shell to the Pod and create a file in the directory `/var/app/config`.
