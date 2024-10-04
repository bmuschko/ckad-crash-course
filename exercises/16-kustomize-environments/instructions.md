# Exercise 16

<details>
<summary><b>Quick Reference</b></summary>
<p>

* Namespace: `q71`<br>
* Documentation: [Kustomize](https://kustomize.io/)

</p>
</details>

In this exercise, you will practice the use of Kustomize to generate a Secret definition from a source file and then patch a Deployment definition to consume it as environment variables.

> [!IMPORTANT]
> You can decide to install Kustomize on your machine or simply go with the `kubectl kustomize` subcommand. The Kustomize documentation page provides detailed, OS-specific [installation instructions](https://kubectl.docs.kubernetes.io/installation/kustomize/).

> [!NOTE]
> If you do not already have a cluster, you can create one by using minikube.

1. Inspect the files in the [`start`](./start) directory. You will find a [Deployment YAML manifest](./start/deployment.yaml) and a [text file](./start/basic-auth.txt) containing username/password credentials.
2. Create a `kustomization.yaml` file that allows for building the Deployment as a resource.
3. Using Kustomize functionality, generate a Secret YAML manifest with the name `creds` in the namespace `q71`.
4. Patch the Deployment definition so that its Pod template consumes the generated Secret values as environment variables.
5. Produce the YAML output with the relevant Kustomize command from the CLI. Verify the correctness of the output.
6. Add the generation of the `q71` namespace to the existing `kustomization.yaml` file. Run the command for generating the objects from the Kustomize setup.