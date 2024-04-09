# Exercise 13

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/), [Pods](https://kubernetes.io/docs/concepts/workloads/pods/), [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

</p>
</details>

In this exercise, you will set up a blue-green Deployment scenario. You'll first create the initial (blue) Deployment and expose it will a Service. Later, you will create a second (green) Deployment and switch over traffic.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Implementing the Blue-Green Deployment Strategy"](https://learning.oreilly.com/scenarios/implementing-the-blue-green/9781098164041/).

1. Create a Deployment named `nginx-blue` with 3 replicas. The Pod template of the Deployment should use container image `nginx:1.23.0` and assign the label `version=blue`.
2. Expose the Deployment with a Service of type `ClusterIP` named `nginx`. Map the incoming and outgoing port to 80. Select the Pod with label `version=blue`.
3. Run a temporary Pod with the container image `alpine/curl:8.5.0` to make a call against the Service using `curl`.
4. Create a second Deployment named `nginx-green` with 3 replicas. The Pod template of the Deployment should use container image `nginx:1.23.4` and assign the label `version=green`.
5. Change the Service's label selection so that traffic will be routed to the Pods controlled by the Deployment `nginx-green`.
6. Delete the Deployment named `nginx-blue`.
7. Run a temporary Pod with the container image `alpine/curl:8.5.0` to make a call against the Service.
