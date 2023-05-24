# Exercise 29

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `y72`<br>
* Documentation: [Debug Services](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/)

</p>
</details>

Kate is an developer in charge of implementing a web-based application stack. She is not very familiar with Kubernetes yet, and asked if you could help out. The relevant objects have been created, however, connection to the application cannot be established from within the cluster. Help Kate with fixing the configuration of her YAML manifests.

1. Create the objects from the YAML manifest [setup.yaml](./setup.yaml).
2. Inspect the objects in the namespace `y72`.
3. Create a temporary Pod using the image `busybox` in the namespace `y72`. The container command should make a `wget` call to the Service `web-app`. The `wget` will not be able to establish a successful connection to the Service.
4. Identify the root cause for the connection issue and fix it. Verify the correct behavior by repeating the previous step. The `wget` call should return a sucessful response.