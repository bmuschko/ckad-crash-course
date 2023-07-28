# Exercise 30

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Ingresses](https://kubernetes.io/docs/concepts/services-networking/ingress/), [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)

</p>
</details>

In this exercise, you will create an Ingress with a simple rule that routes traffic to a Service.

> **_NOTE:_** Kubernetes requires running an Ingress Controller to evaluate Ingress rules. Make sure your cluster employs an [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). You can find installation guidance in the file [ingress-controller-setup.md](./ingress-controller-setup.md). If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive lab ["Creating an Ingress"](https://learning.oreilly.com/scenarios/cka-prep-creating/9781492099130/).  If you are using minikube, the network is limited if using the Docker driver on Darwin, Windows, or WSL, and the Node IP is not reachable directly. Refer to the [documentation](https://minikube.sigs.k8s.io/docs/handbook/accessing/) to gain access to the minikube IP.

1. Verify that the Ingress Controller is running.
2. Create a new Deployment named `web` that controls a single replica running the image `bmuschko/nodejs-hello-world:1.0.0` on port 3000.
3. Expose the Deployment with a Service named `web` of type `NodePort`. The Service routes traffic to the Pods controlled by the Deployment `web`.
4. Make a request to the endpoint of the application on the context path `/`. You should see the message "Hello World".
5. Create an Ingress that exposes the path `/` for the host `hello-world.exposed`. The traffic should be routed to the Service created earlier.
6. List the Ingress object.
7. Add an entry in `/etc/hosts` that maps the virtual node IP address to the host `hello-world.exposed`.
8. Make a request to `http://hello-world.exposed`. You should see the message "Hello World".