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
/bin/sh: can't create /root/tmp/curr-date.txt: nonexistent directory
/bin/sh: can't create /root/tmp/curr-date.txt: nonexistent directory
/bin/sh: can't create /root/tmp/curr-date.txt: nonexistent directory
```

Apparently, the directory we want to write to does not exist. Log into the container and create the directory. The file `~/tmp/curr-date.txt` is populated.

```shell
$ kubectl exec failing-pod -it -- /bin/sh
# mkdir -p ~/tmp
# cd ~/tmp
# ls -l
total 4
-rw-r--r-- 1 root root 112 May  9 23:52 curr-date.txt
# cat ~/tmp/curr-date.txt
Tue Nov 12 15:21:53 UTC 2019
Tue Nov 12 15:21:58 UTC 2019
Tue Nov 12 15:22:03 UTC 2019
# exit
```