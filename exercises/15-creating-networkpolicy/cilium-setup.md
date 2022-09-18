# Setting up Cilium

## Using Minikube

If you are using minikube, you will need to use the following command line options when starting the cluster. This will prepare the cluster for the installation of Cilium. Refer to the [Cilium documentation](https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/) for more information.

```
$ minikube start --network-plugin=cni --cni=false
```

The following commands to download Cilium for use with Minikube on MacOSX.

```
$ curl -L --remote-name-all https://github.com/cilium/cilium-cli/releases/latest/download/cilium-darwin-amd64.tar.gz{,.sha256sum}
$ shasum -a 256 -c cilium-darwin-amd64.tar.gz.sha256sum
$ sudo tar xzvfC cilium-darwin-amd64.tar.gz /usr/local/bin
$ rm cilium-darwin-amd64.tar.gz{,.sha256sum}
```

Install Cilium with the following command.

```
$ cilium install
🔮 Auto-detected Kubernetes kind: minikube
✨ Running "minikube" validation checks
✅ Detected minikube version "1.24.0"
ℹ️  using Cilium version "v1.10.11"
🔮 Auto-detected cluster name: minikube
🔮 Auto-detected IPAM mode: cluster-pool
🔮 Auto-detected datapath mode: tunnel
🔑 Created CA in secret cilium-ca
🔑 Generating certificates for Hubble...
🚀 Creating Service accounts...
🚀 Creating Cluster roles...
🚀 Creating ConfigMap for Cilium version 1.10.11...
🚀 Creating Agent DaemonSet...
🚀 Creating Operator Deployment...
⌛ Waiting for Cilium to be installed and ready...
♻️  Restarting unmanaged pods...
♻️  Restarted unmanaged pod default/other
♻️  Restarted unmanaged pod g04/backend
♻️  Restarted unmanaged pod g04/frontend
✅ Cilium was successfully installed! Run 'cilium status' to view installation health
```

You can verify the correct installation with the following command.

```
$ cilium status --wait
    /¯¯\
 /¯¯\__/¯¯\    Cilium:         OK
 \__/¯¯\__/    Operator:       OK
 /¯¯\__/¯¯\    Hubble:         disabled
 \__/¯¯\__/    ClusterMesh:    disabled
    \__/

DaemonSet         cilium             Desired: 1, Ready: 1/1, Available: 1/1
Deployment        cilium-operator    Desired: 1, Ready: 1/1, Available: 1/1
Containers:       cilium             Running: 1
                  cilium-operator    Running: 1
Cluster Pods:     1/1 managed by Cilium
Image versions    cilium-operator    quay.io/cilium/operator-generic:v1.10.11@sha256:468ce59342298f1cf87ca8512cd9192754e83348b347a4bc7c27158ef9c4a37d: 1
                  cilium             quay.io/cilium/cilium:v1.10.11@sha256:48e1a261046c2e534e370f960f0920233f9fd5ad4623aebdca0e403264a06202: 1
```

## Using a Regular Kubernetes Cluster

You can install Cilium on any generic Kubernetes cluster. The following instructions use Helm. Refer to the [Cilium documentation](https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/) for more information.

First, install Cilium 1.11.6. This assumes that you have Helm installed already.

```
$ helm repo add cilium https://helm.cilium.io/
$ helm install cilium cilium/cilium --version 1.11.6 --namespace kube-system
```
Cilium provides a CLI tool for interating with the Cilium installation. The following commands install the CLI tool and ensure that the Cilium installation is ready to be used.

```
$ curl -L --remote-name-all https://github.com/cilium/cilium-cli/releases/latest/download/cilium-linux-amd64.tar.gz{,.sha256sum}
$ sha256sum --check cilium-linux-amd64.tar.gz.sha256sum
$ sudo tar xzvfC cilium-linux-amd64.tar.gz /usr/local/bin
$ rm cilium-linux-amd64.tar.gz{,.sha256sum}
$ cilium status --wait
```