# Exercise 23

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `rq-demo`<br>
* Documentation: [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)

</p>
</details>

In this exercise, you will create a ResourceQuota with specific CPU and memory limits for a new namespace. Pods created in the namespace will have to adhere to those limits.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Creating a resource quota for a number of Secrets"](https://learning.oreilly.com/scenarios/ckad-security-creating/9781098104955/).

Create a resource quota named `app` under the namespace `rq-demo` using the following YAML definition in the file [`resourcequota.yaml`](./resourcequota.yaml).

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: app
spec:
  hard:
    pods: "2"
    requests.cpu: "2"
    requests.memory: 500Mi
```

1. Create a new Pod that exceeds the limits of the resource quota requirements e.g. by defining 1Gi of memory but stays below the CPU e.g. 0.5. Write down the error message.
2. Change the request limits to fulfill the requirements to ensure that the Pod could be created successfully. Write down the output of the command that renders the used amount of resources for the namespace.
