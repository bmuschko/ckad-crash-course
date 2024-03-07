# Exercise 18

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `stress-test`<br>
* Documentation: [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)

</p>
</details>

> [!IMPORTANT]
> You will need to install the metrics server if you want to be able to inspect actual resource metrics. You can find [installation instructions](https://github.com/kubernetes-sigs/metrics-server#installation) on the project's GitHub page.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Determining Metrics for Pods"](https://learning.oreilly.com/scenarios/determining-metrics-for/9781098164133/).

1. Create the namespace `stress-test`.
2. The current directory contains the YAML manifests for three Pods, [`stress-1-pod.yaml`](./stress-1-pod.yaml), [`stress-2-pod.yaml`](./stress-2-pod.yaml), and [`stress-3-pod.yaml`](./stress-3-pod.yaml). Create all of them.
3. Use the data available through the metrics server to identify which of the Pods consumes the most memory.