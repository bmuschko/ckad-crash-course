# Exercise 24

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `d92`<br>
* Documentation: [Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/), [Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

</p>
</details>

A LimitRange can restrict resource consumption for Pods in a namespace, and assign default computing resource if no resource requirements have been defined. You will practice the effects of a LimitRange on the creation of a Pod in different scenarios.

1. Inspect the YAML manifest definition in the file [`setup.yaml`](./setup.yaml).
2. Create the objects from the YAML manifest file.
3. Create a new Pod named `pod-without-resource-requirements` in the namespace `d92` that uses the container image `bmuschko/nodejs-hello-world:1.0.0` without any resource requirements. Inspect the Pod details. What resource definitions do you expect to be assigned?
4. Create a new Pod named `pod-with-more-cpu-resource-requirements` in the namespace `d92` that uses the container image `bmuschko/nodejs-hello-world:1.0.0` with a CPU resource request of 400m and limits of 1.5. What runtime behavior do you expect to see?
5. Create a new Pod named `pod-with-less-cpu-resource-requirements` in the namespace `d92` that uses the container image `bmuschko/nodejs-hello-world:1.0.0` with a CPU resource request of 350m and limits of 400m. What runtime behavior do you expect to see?