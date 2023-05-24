# Exercise 21

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `t23`<br>
* Documentation: [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/), [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)

</p>
</details>

In this exercise, you will define Role Based Access Control (RBAC) to grant permissions to a service account. The permissions should only apply to certain API resources and operations.

1. Create a new namespace named `t23`.
2. Create a Pod named `service-list` in the namespace `t23`. The container uses the image `alpine/curl:3.14` and makes a `curl` call to the Kubernetes API that lists Service objects in the `default` namespace in an infinite loop.
3. Create and attach the service account `api-call` to the Pod.
4. Inspect the container logs after the Pod has been started. What response do you expect to see from the `curl` command?
5. Assign a ClusterRole and RoleBinding to the service account that only allows the operation needed by the Pod. Have a look at the response from the `curl` command.