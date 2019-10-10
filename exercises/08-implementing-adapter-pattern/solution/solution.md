# Solution

You can create the initial Pod setup with the following command.

```shell
$ kubectl run adapter --image=busybox --restart=Never -o yaml --dry-run -- /bin/sh -c 'while true; do echo "$(date) | $(du -sh ~)" >> /var/logs/diskspace.txt; sleep 5; done;' > adapter.yaml
```
The final Pod YAML file should look something like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  name: adapter
spec:
  volumes:
    - name: config-volume
      emptyDir: {}
  containers:
  - args:
    - /bin/sh
    - -c
    - 'while true; do echo "$(date) | $(du -sh ~)" >> /var/logs/diskspace.txt; sleep 5; done;'
    image: busybox
    name: app
    volumeMounts:
      - name: config-volume
        mountPath: /var/logs
    resources: {}
  - image: busybox
    name: transformer
    args:
    - /bin/sh
    - -c
    - 'sleep 20; while true; do while read LINE; do echo "$LINE" | cut -f2 -d"|" >> $(date +%Y-%m-%d-%H-%M-%S)-transformed.txt; done < /var/logs/diskspace.txt; sleep 20; done;'
    volumeMounts:
      - name: config-volume
        mountPath: /var/logs
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```
You should find that a new text file in the current directory every 20 seconds. Each of the files contain the disk space without the date prefix.

```shell
$ kubectl exec adapter --container=transformer -it -- /bin/sh
# ls -l
-rw-r--r--    1 root     root           205 May 12 20:43 2019-05-12-20-43-32-transformed.txt
-rw-r--r--    1 root     root           369 May 12 20:43 2019-05-12-20-43-52-transformed.txt
...
# cat 2019-05-12-20-43-52-transformed.txt
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
 4.0K	/root
# exit
```