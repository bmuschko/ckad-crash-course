# Exercise 31

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `k1`, `k2`<br>
* Documentation: [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)

</p>
</details>

All ingress Pod-to-Pod communication has been denied across all namespaces. You want to allow the Pod `busybox` in namespace `k1` to communicate with Pod `nginx` in namespace `k2`. You'll create a network policy to achieve that.

> **_NOTE:_** Without a network policy controller, network policies won't have any effect. You need to configure a network overlay solution that provides this controller. You'll have to go through some extra steps to install and enable the network provider Cilium. Without adhering to the proper prerequisites, network policies won't have any effect. You can find installation guidance in the file [cilium-setup.md](./cilium-setup.md). If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda lab ["Creating a Network Policy"](https://learning.oreilly.com/scenarios/ckad-services-creating/9781098105334/).

1. Create the objects from the YAML manifest [setup.yaml](./setup.yaml).
2. Inspect the objects in the namespace `k1` and `k2`.
3. Determine the virtual IP address of Pod `nginx` in namespace `k2`. Try to make a `wget` call on port 80 from the Pod `busybox` in namespace `k1` to the Pod `nginx` in namespace `k2`. The call will fail with the current setup.
4. Create a network policy that allows performing ingress calls for all Pods in namespace `k1` to the Pod `nginx` in namespace `k2`. Pods in all other namespaces should be denied to make ingress calls to Pods in namespace `k2`.
5. Repeat step 3 to verify that a network connection can be established.