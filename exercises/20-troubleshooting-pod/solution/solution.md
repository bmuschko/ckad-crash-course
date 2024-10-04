# Solution

First, create the Pod with the given YAML content.

```
$ kubectl apply -f pod.yaml
pod/date-recorder created
```

Inspecting the Pod's status exposes no obvious issues. The status is "Running".

```
$ kubectl get pods
NAME            READY   STATUS    RESTARTS   AGE
date-recorder   1/1     Running   0          5s
```

Render the logs of the container. The returned error message indicates that the file or directory `/root/tmp/startup-marker.txt` does not exist.

```
$ kubectl logs date-recorder
[Error: ENOENT: no such file or directory, open '/root/tmp/startup-marker.txt'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/root/tmp/curr-date.txt'
}
```

We could try to open a shell to the container, however, the container image does not provide a shell.

```
$ kubectl exec -it date-recorder -- /bin/sh
OCI runtime exec failed: exec failed: unable to start container process: exec: "/bin/sh": stat /bin/sh: no such file or directory: unknown
command terminated with exit code 126
```

We can use the `debug` command to create a debugging container for troubleshooting purposes. The `--share-processes` flag lets use share the running nodejs process.

```
$ kubectl debug -it date-recorder --image=busybox --target=debian --share-processes
Targeting container "debian". If you don't see processes from this container it may be because the container runtime doesn't support this feature.
Defaulting debug container name to debugger-rns89.
If you don't see a command prompt, try pressing enter.
/ # ps
PID   USER     TIME  COMMAND
    1 root      4:21 /nodejs/bin/node -e const fs = require('fs'); let timestamp = Date.now(); fs.writeFile('/root/tmp/startup-m
   35 root      0:00 sh
   41 root      0:00 ps
```

Apparently, the directory we want to write to does indeed not exist.

```
$ kubectl exec failing-pod -it -- /bin/sh
/ # ls /root/tmp
ls: /root/tmp: No such file or directory
```

We'll likely want to change the command running the original container to point to directory that does exist upon container start. Alternatively, it may make sense to mount an ephemeral Volume to provide the directory, as shown in [`pod.yaml`](./pod.yaml).