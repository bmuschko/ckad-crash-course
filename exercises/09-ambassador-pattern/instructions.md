# Exercise 9

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `ext-access`<br>
* Documentation: [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)

</p>
</details>

In this example, you'll be asked to implement rate-limiting functionality for HTTP(S) calls to an external service. For example, the requirements for the rate limiter could say that an application can only make a maximum of five calls every 15 minutes. Instead of strongly coupling the rate-limiting logic to the application code, it will be provided by an ambassador container.

The image `bmuschko/nodejs-business-app:1.0.0` represents a Node.js-based application that makes a call to localhost on port 8081. The ambassador container represented by the image `bmuschko/nodejs-ambassador:1.0.0` running on port 8081 will take on making the HTTP call to the external service while at the same time enforcing rate limiting.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the Katacoda lab ["Implementing the Ambassador Pattern"](https://www.katacoda.com/orm-benjamin-muschko/courses/ckad-assessment/ambassador-pattern/).

1. Create a YAML manifest for a Pod with the name `rate-limiter` in the namespace `ext-access`. Store the definition in the file named `rate-limiter.yaml`. The main application container named `business-app` should use the image `bmuschko/nodejs-business-app:1.0.0` and expose the container port 8080.
2. Modify the YAML manifest by adding the ambassador container named `ambassador`. The ambassador container uses the image `bmuschko/nodejs-ambassador:1.0.0` and exposes the container port 8081.
3. Test the rate-limiting functionality. First, create the Pod, shell into the `business-app` container that runs the business application, and execute a series of `curl` commands that target `localhost:8081`, the end point of the `ambassador` container. The first five calls will be allowed to the external service. On the sixth call, you’ll receive an error message, as the rate limit has been reached within the given time frame.
