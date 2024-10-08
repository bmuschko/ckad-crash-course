# Exercise 20

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)

</p>
</details>

In this exercise, you will practice your troubleshooting skills by inspecting a misconfigured Pod.

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Troubleshooting a Pod"](https://learning.oreilly.com/scenarios/troubleshooting-a-pod/9781098164140/).

1. Create a new Pod from the YAML manifest in the file [`pod.yaml`](./pod.yaml).
2. Check the Pod's status. Do you see any issue?
3. Render the logs of the running container and identify an issue.
4. Shell into the container. Can you verify the issue based on the rendered log message?
5. Suggest solutions that can fix the root cause of the issue.