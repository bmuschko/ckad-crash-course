# Exercise 1

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: N/A<br>
* Documentation: [Containerize an application](https://docs.docker.com/get-started/02_our_app/)

</p>
</details>

In this exercise, you will practice building a container image from an existing `Dockerfile`. Then you will run the container from the image, and interact with it. You can use a container runtime engine of your choice, e.g. [Docker Engine](https://docs.docker.com/engine/), [containerd](https://containerd.io/).

1. Inspect the [`Dockerfile`](./app/Dockerfile) in the `app` directory.
2. Build the container image from the `Dockerfile` with the tag `nodejs-hello-world:1.0.0`.
3. Run a container with the container image. Make the application available on port 80.
4. Execute a `curl` or `wget` command against the application's endpoint.
5. Retrieve the container logs.
6. Save the container image to the file `nodejs-hello-world-1.0.0.tar`.