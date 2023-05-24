# Exercise 16

The Kubernetes administrator in charge of the cluster is planning to upgrade all nodes from Kubernetes 1.8 to 1.26. You, as the application developer, implemented Kubernetes YAML manifests that operate an application stack. The administrator provided you with a Kubernetes 1.26 test environment. Make sure that the YAML manifests are compatible with Kubernetes version 1.26.

1. Inspect the files [`deployment.yaml`](./deployment.yaml) and [`configmap.yaml`](./configmap.yaml) in the current directory.
2. Create the objects from the YAML manifests. Make modifications to the definitions as needed.
3. Verify that the objects could be instantiated with Kubernetes 1.26.