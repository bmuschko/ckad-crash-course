# Exercise 10

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `default`<br>
* Documentation: [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/), [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)

</p>
</details>

In this exercise, you will exercise assigning labels and annotations to a set of Pods. Moreover, you will use `kubectl` to query for Pods based on different requirements.

> **_NOTE:_** If you do not already have a cluster, you can create one by using minikube or you can use the O'Reilly interactive labs ["Assigning labels to Pods imperatively"](https://learning.oreilly.com/scenarios/ckad-labels-assigning/9781098105181/) and ["Assigning annotations to Pods imperatively"](https://learning.oreilly.com/scenarios/ckad-annotations-assigning/9781098105204/).

1. Create three different Pods with the names `frontend`, `backend` and `database` that use the image `nginx`. For convenience, you can use the file [`pods.yaml`](./pods.yaml) to create the Pods.
2. Declare labels for those Pods as follows:

- `frontend`: `env=prod`, `team=shiny`
- `backend`: `env=prod`, `team=legacy`, `app=v1.2.4`
- `database`: `env=prod`, `team=storage`

3. Declare annotations for those Pods as follows:

- `frontend`: `contact=John Doe`, `commit=2d3mg3`
- `backend`: `contact=Mary Harris`

4. Render the list of all Pods and their labels.
5. Use label selectors on the command line to query for all production Pods that belong to the teams `shiny` and `legacy`.
6. Remove the label `env` from the `backend` Pod and rerun the selection.
7. Render the surrounding 3 lines of YAML of all Pods that have annotations.
