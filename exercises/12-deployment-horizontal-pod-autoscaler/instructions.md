# Exercise 12

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

</p>
</details>

> [!IMPORTANT]
> You will need to install the metrics server if you want actual resource metrics to be collected and displayed by the HorizontalPodAutoscaler. You can find [installation instructions](https://github.com/kubernetes-sigs/metrics-server#installation) on the project's GitHub page.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Creating a Horizontal Pod Autoscaler for a Deployment"](https://learning.oreilly.com/scenarios/creating-a-horizontal/9781098164034/).

1. Create a Deployment named `nginx` with 1 replica. The Pod template of the Deployment should use container image `nginx:1.23.4`, set the CPU resource request to 0.5, and the memory resource request/limit to 500Mi.
2. Create a HorizontalPodAutoscaler for the Deployment named `nginx-hpa` that scales to minium of 3 and a maximum of 8 replicas. Scaling should happen based on an average CPU utilization of 75%, and an average memory utilization of 60%.
3. Inspect the HorizontalPodAutoscaler object and identify the currently-utilized resources. How many replicas do you expect to exist?
