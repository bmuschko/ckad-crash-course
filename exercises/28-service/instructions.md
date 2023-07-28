# Exercise 28

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

</p>
</details>

In this exercise, you will create a Deployment and expose a container port for its Pods. You will demonstrate the differences between the service types ClusterIP and NodePort.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive labs ["Creating a Service of type ClusterIP"](https://learning.oreilly.com/scenarios/ckad-services-creating/9781098105310/) and ["Creating a Service of type NodePort"](https://learning.oreilly.com/scenarios/ckad-services-creating/9781098105327/). If you are using minikube, the network is limited if using the Docker driver on Darwin, Windows, or WSL, and the Node IP is not reachable directly. Refer to the [documentation](https://minikube.sigs.k8s.io/docs/handbook/accessing/) to gain access to the minikube IP.

1. Create a Service named `myapp` of type `ClusterIP` that exposes port 80 and maps to the target port 80.
2. Create a Deployment named `myapp` that creates 1 replica running the image `nginx:1.23.4-alpine`. Expose the container port 80.
3. Scale the Deployment to 2 replicas.
4. Create a temporary Pod using the image `busybox` and run a `wget` command against the IP of the service.
5. Change the service type so that the Pods can be reached from outside of the cluster.
6. Run a `wget` command against the service from outside of the cluster.
7. (Optional) Discuss: Can you expose the Pods as a service without a deployment?
8. (Optional) Discuss: Under what condition would you use the service type `LoadBalancer`?
