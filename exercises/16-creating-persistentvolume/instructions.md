# Exercise 16

In this exercise, you will create a PersistentVolume, connect it to a PersistentVolumeClaim and mount the claim to a specific path of a Pod.

## Defining and Mounting a PersistentVolume

1. Create a Persistent Volume named `pv`, access mode `ReadWriteMany`, storage class name `shared`, 512MB of storage capacity and the host path `/data/config`.
2. Create a Persistent Volume Claim named `pvc` that requests the Persistent Volume in step 1. The claim should request 256MB. Ensure that the Persistent Volume Claim is properly bound after its creation.
3. Mount the Persistent Volume Claim from a new Pod named `app` with the path `/var/app/config`. The Pod uses the image `nginx`.
4. Check the events of the Pod after starting it to ensure that the Persistent Volume was mounted properly.