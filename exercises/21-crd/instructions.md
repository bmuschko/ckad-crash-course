# Exercise 21

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)

</p>
</details>

As an application developer, you may want to install Kubernetes functionality that extends the platform using the Kubernetes operator pattern. The objective of this exercise is to familiarize yourself with creating and managing CRDs. You will not need to write a controller.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Defining and Interacting with a CRD"](https://learning.oreilly.com/scenarios/defining-and-interacting/9781098164164/).

1. Create a CRD resource named `backup.example.com` with the following specification:

    - Group: `example.com`
    - Version: `v1`
    - Kind: `Backup`
    - Singular: `backup`
    - Plural: `backups`
    - Properties of type `string`: `cronExpression`, `podName`, `path`

2. Retrieve the details for the `Backup` custom resource created in the previous step.

3. Create a custom object named `nginx-backup` for the CRD. Provide the following property values:

    - `cronExpression`: `0 0 * * *`
    - `podName`: `nginx`
    - `path`: `/usr/local/nginx`

4. Retrieve the details for the `nginx-backup` object created in the previous step.