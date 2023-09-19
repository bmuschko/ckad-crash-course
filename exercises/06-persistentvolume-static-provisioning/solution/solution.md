# Solution

Create a manifest for the PersistentVolume and store it in the file `pv.yaml`.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv
spec:
  capacity:
    storage: 512Mi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: /data/config
```

Create the PersistentVolume with the following command.

```
$ kubectl apply -f pv.yaml
persistentvolume/pv created
$ kubectl get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv     512Mi      RWX            Retain           Available                                   12s
```

Create a manifest for the PersistentVolumeClaim and store it in the file `pvc.yaml`.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: ""
  resources:
    requests:
      storage: 256Mi
```

Create the PersistentVolumeClaim with the following command. You will see that the PersistentVolumeClaim has a status of "Bound".

```
$ kubectl apply -f pvc.yaml
persistentvolumeclaim/pvc created
$ kubectl get pvc
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
pvc    Bound    pv       512Mi      RWX                           2s
```

Create a manifest for the Pod and store it in the file `pod.yaml`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - image: nginx:1.21.6
    name: app
    volumeMounts:
    - mountPath: "/var/app/config"
      name: configpvc
  volumes:
  - name: configpvc
    persistentVolumeClaim:
      claimName: pvc
  restartPolicy: Never
```

Create the Pod object from the YAML manifest file.

```
$ kubectl apply -f pod.yaml
pod/app created
```

Shell into the Pod and create a file in the mounted directory.

```
$ kubectl exec app -it -- /bin/sh
# cd /var/app/config
# ls -l
total 0
# touch test.txt
# ls -l
total 0
-rw-r--r-- 1 root root 0 Dec 30 17:24 test.txt
```
