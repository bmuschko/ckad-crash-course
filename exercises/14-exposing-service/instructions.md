# Exercise 14

In this exercise, you will create a Deployment and expose a container port for its Pods. You will demonstrate the differences between the service types ClusterIP and NodePort.

## Routing Traffic to Pods from Inside and Outside of a Cluster

1. Create a deployment named `myapp` that creates 2 replicas for Pods with the image `nginx`. Expose the container port 80.
2. Expose the Pods so that requests can be made against the service from inside of the cluster.
3. Create a temporary Pods using the image `busybox` and run a `wget` command against the IP of the service.
4. Change the service type so that the Pods can be reached from outside of the cluster.
5. Run a `wget` command against the service from outside of the cluster.
6. (Optional) Discuss: Can you expose the Pods as a service without a deployment?
7. (Optional) Discuss: Under what condition would you use the service type `LoadBalancer`?
