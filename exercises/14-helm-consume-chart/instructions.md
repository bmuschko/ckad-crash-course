# Exercise 14

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Helm](https://helm.sh/)

</p>
</details>

In this exercise, you use Helm to install Kubernetes objects needed for the open source monitoring solution [Prometheus](https://prometheus.io/). The easiest way to install Prometheus on top of Kubernetes is with the help of the [prometheus-operator](https://prometheus-operator.dev/) Helm chart.

> [!IMPORTANT]
> You will need to have Helm installed on your machine. The Helm documentation page provides detailed, OS-specific [installation instructions](https://helm.sh/docs/intro/install/).

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Installing an Existing Helm Chart from the Central Chart Repository"](https://learning.oreilly.com/scenarios/installing-an-existing/9781098164065/).

1. The Prometheus Helm charts reside in the [artifact repository](https://prometheus-community.github.io/helm-charts). Add the repository to the list of known repositories accessible by Helm with the name `prometheus-community`.
2. Update to the latest information about charts from the respective chart repository.
3. Run the Helm command for listing available Helm charts and their versions. Identify the latest chart version for `kube-prometheus-stack`.
4. Install the the chart `kube-prometheus-stack`.
5. List the installed Helm chart.
6. List the Service named `prometheus-operated` created by the Helm chart. The object resides in the `default` namespace.
7. Use the kubectl `port-forward` command to forward the local port 8080 to the port 9090 of the Service.
8. Open a browser and bring up the Prometheus dashboard.
9. Stop port forwarding and uninstall the Helm chart.
