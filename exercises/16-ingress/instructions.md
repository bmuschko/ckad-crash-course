# Exercise 16

In this exercise, you will create an Ingress with a simple rule.

> **_NOTE:_** Kubernetes requires running an Ingress Controller to evaluate Ingress rules. Make sure your cluster employs an [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). You can find installation guidance in the file [ingress-controller-setup.md](./ingress-controller-setup.md). If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda lab ["Creating an Ingress"](https://learning.oreilly.com/scenarios/cka-prep-creating/9781492099130/).

1. Verify that the Ingress Controller is running.
2. Create a new Deployment with the image `bmuschko/nodejs-hello-world:1.0.0`.
3. Expose the Deployment with a Service of type `NodePort` on port 3000.
4. Make a request to the endpoint of the application on the context path `/`. You should see the message "Hello World".
5. Create an Ingress that exposes the path `/` for the host `hello-world.exposed`. The traffic should be routed to the Service created earlier.
6. List the Ingress object.
7. Add an entry in `/etc/hosts` that maps the virtual node IP address to the host `hello-world.exposed`.
8. Make a request to `http://hello-world.exposed`. You should see the message "Hello World".