# Exercise 20

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)

</p>
</details>

As an application developer, you may want to install Kubernetes functionality that exends the platform using the Kubernetes operator pattern. The objective of this exercise is to familiarize yourself with creating and managing CRDs. You will not need to write a controller.

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