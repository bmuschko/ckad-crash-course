# Exercise 17

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Kubernetes Deprecation Policy](https://kubernetes.io/docs/reference/using-api/deprecation-policy/), [Deprecated API Migration Guide](https://kubernetes.io/docs/reference/using-api/deprecation-guide/)

</p>
</details>

The Kubernetes administrator in charge of the cluster is planning to upgrade all nodes from Kubernetes 1.8 to 1.26. You, as the application developer, implemented Kubernetes YAML manifests that operate an application stack. The administrator provided you with a Kubernetes 1.26 test environment. Make sure that the YAML manifests are compatible with Kubernetes version 1.26.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Identifying and Replacing a Deprecated API"](https://learning.oreilly.com/scenarios/identifying-and-replacing/9781098164096/).

1. Inspect the files [`deployment.yaml`](./deployment.yaml) and [`configmap.yaml`](./configmap.yaml) in the current directory.
2. Create the objects from the YAML manifests. Make modifications to the definitions as needed.
3. Verify that the objects could be instantiated with Kubernetes 1.26.