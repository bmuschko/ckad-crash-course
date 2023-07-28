# Exercise 25

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/), [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)

</p>
</details>

In this exercise, you will first create a ConfigMap from a YAML configuration file as a source. Later, you'll create a Pod, consume the ConfigMap as Volume and inspect the key-value pairs as files.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Creating a ConfigMap and consuming it as environment variables"](https://learning.oreilly.com/scenarios/ckad-configuration-creating/9781098104917/).

1. Inspect the YAML configuration file named [`application.yaml`](./application.yaml).
2. Create a new ConfigMap named `app-config` from that file.
3. Create a Pod named `backend` that consumes the ConfigMap as Volume at the mount path `/etc/config`. The container runs the image `nginx:1.23.4-alpine`.
4. Shell into the Pod and inspect the file at the mounted Volume path.
5. (Optional) Discuss: How would you approach hot reloading of values defined by a ConfigMap consumed by an application running in Pod?
