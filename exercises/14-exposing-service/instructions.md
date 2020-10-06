# Exercise 14

In this exercise, you will create a Deployment and expose a container port for its Pods. You will demonstrate the differences between the service types ClusterIP and NodePort.

## Routing Traffic to Pods from Inside and Outside of a Cluster

1. Create a Service named `myapp` of type `ClusterIP` that exposes port 80 and maps to the target port 80.
2. Create a Deployment named `myapp` that creates 1 replica running the image `nginx`. Expose the container port 80.
3. Scale the Deployment to 2 replicas.
4. Create a temporary Pods using the image `busybox` and run a `wget` command against the IP of the service.
5. Change the service type so that the Pods can be reached from outside of the cluster.
6. Run a `wget` command against the service from outside of the cluster.
7. (Optional) Discuss: Can you expose the Pods as a service without a deployment?
8. (Optional) Discuss: Under what condition would you use the service type `LoadBalancer`?