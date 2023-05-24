# Exercise 15

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Helm](https://helm.sh/)

</p>
</details>

In this exercise, you will practice the implementation, packaging, and installation of a configurable custom Helm chart.

1. Create a new chart file named `Chart.yaml`. Define all mandatory attributes including the chart's API version, the name, and the version. Add the following key-value pairs: `API version: 1.0.0`, `Name: web-app`, and `Version: 2.5.4`.
2. Create a new values file named `values.yaml`. It should contain the following key-value pairs: `service_port: 80`, and `container_port: 3000`.
3. Create the template file `web-app-pod-template.yaml`. The YAML manifest defines a Pod named `hello-world` with the image `bmuschko/nodejs-hello-world:1.0.0`. The container port uses the placeholder `container_port` from the `values.yaml` file.
4. Create the template file `web-app-service-template.yaml`. The YAML manifest defines a Service named `web-app-service` of type `ClusterIP`. The target port should use the placeholder `container_port` from the `values.yaml` file, the port should use the placeholder `service_port` from the `values.yaml` file.
5. Bundle the template files into a chart archive file by running the correct Helm command. What's the name of the file produced?
6. Install the chart with the name `hello-world` to the namespace `app-stack` using the appropriate Helm command. Override the value of `service_port` with the value `9090`.
7. Find the installed objects provided by the chart.
8. Delete the Helm chart.