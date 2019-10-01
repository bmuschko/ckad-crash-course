# Solution

First, create the Pod with the given YAML content.

```shell
$ vim pod.yaml
$ kubectl create -f pod.yaml
```

The Pod seems to be running without problems.

```shell
$ kubectl get pods
NAME          READY   STATUS    RESTARTS   AGE
failing-pod   1/1     Running   0          5s
```

Render the logs of the container. The output should indicate an error message every 5 seconds.

```shell
$ kubectl logs failing-pod
Unable to write file!
/bin/sh: 1: cannot create /root/tmp/x/curr-date.txt: Directory nonexistent
Unable to write file!
/bin/sh: 1: cannot create /root/tmp/x/curr-date.txt: Directory nonexistent
Unable to write file!
/bin/sh: 1: cannot create /root/tmp/x/curr-date.txt: Directory nonexistent
```

Apparently, the directory we want to write to does not exist. Log into the container and create the directory. The file `~/tmp/x/curr-date.txt` is populated.

```shell
$ kubectl exec failing-pod -it -- /bin/sh
/ # mkdir -p ~/tmp/x
/ # cd ~/tmp/x
/ # ls -l
total 4
-rw-r--r-- 1 root root 112 May  9 23:52 curr-date.txt
/ # cat ~/tmp/x/curr-date.txt
Thu May 9 23:59:01 UTC 2019
Thu May 9 23:59:06 UTC 2019
Thu May 9 23:59:11 UTC 2019
/ # exit
```