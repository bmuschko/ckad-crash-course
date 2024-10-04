# Solution

Start by creating a new `kustomization.yaml` in the same directory as the existing files. The content of the file needs to point to the Deployment YAML manifest as resource.

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- deployment.yaml
```

Use the `secretGenerator` to declare that you want to generate a Secret definition. Ensure that you point to the existing text file as source for populating the Secret. Assign the proper name and namespace.

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
secretGenerator:
- name: creds
  namespace: q71
  files:
  - basic-auth.txt
resources:
- deployment.yaml
```

Prepare the patch file. You can name the file anything you want. We are deciding for the name `secret-patch.yaml`. The content of the patch file needs to spell out the structure of the Deployment you are planning to patch. In this case, we want to add environment variables sourced from the generated Secret.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: q71
spec:
  template:
    spec:
      containers:
      - name: nginx
        envFrom:
        - secretRef:
            name: creds
```

Lastly, integrate the patch file into the `kustomization.yaml` file.

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
secretGenerator:
- name: creds
  namespace: q71
  files:
  - basic-auth.txt
resources:
- deployment.yaml
patches:
- path: secret-patch.yaml
```

You can now generate the build the resources from the directory with `kustomize build .` (if you have the executable installed), or with `kubectl kustomize`.

```
$ kustomize build .
apiVersion: v1
data:
  basic-auth.txt: dXNlcm5hbWU9am9obmRvZQpwYXNzd29yZD1wd2Q5ODcK
kind: Secret
metadata:
  name: creds-6m8h564f92
  namespace: q71
type: Opaque
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: q71
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - envFrom:
        - secretRef:
            name: creds-6m8h564f92
        image: nginx:1.27.2
        name: nginx
        ports:
        - containerPort: 80
          name: http
          protocol: TCP
```

Create a new file named `namespace.yaml` for defining the `q71` namespace.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: q71
```

Add the namespace file in the resources section of the `kustomization.yaml` file.

```yaml
resources:
- namespace.yaml
- deployment.yaml
```

Create the objects with the following command.

```
$ kubectl apply -k .
namespace/q71 created
secret/creds-6m8h564f92 created
deployment.apps/nginx-deployment created
```