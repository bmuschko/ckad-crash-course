# Solution

Create the objects from the `setup.yaml` file. You will see from the output that at least three objects have been created: a namespace, a Deployment, and a Service.

```
$ kubectl apply -f setup.yaml
namespace/y72 created
deployment.apps/web-app created
service/web-app created
```

You can list all objects relevant to the scenario using the following command.

```
$ kubectl get all -n y72
NAME                           READY   STATUS    RESTARTS   AGE
pod/web-app-5f77f59c78-8svdm   1/1     Running   0          10m
pod/web-app-5f77f59c78-mhvjz   1/1     Running   0          10m

NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
service/web-app   ClusterIP   10.106.215.153   <none>        80/TCP    10m

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/web-app   2/2     2            2           10m

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/web-app-5f77f59c78   2         2         2       10m
```

The Service named `web-app` is of type `ClusterIP`. You can only access the Service from within the cluster. Trying to connect to the Service by its DNS name from a temporary Pod in the same namespace won't be allowed.

```
$ kubectl run tmp --image=busybox --restart=Never -it --rm -n y72 -- wget web-app
Connecting to web-app (10.106.215.153:80)
wget: can't connect to remote host (10.106.215.153): Connection refused
pod "tmp" deleted
pod y72/tmp terminated (Error)
```

The endpoint for the Service `web-app` cannot be resolved, as shown by the following command.

```
$ kubectl get endpoints -n y72
NAME      ENDPOINTS   AGE
web-app   <none>      15m
```

Describing the Service object provides you will additional information, e.g. the label selector and the target port.

```
$ kubectl describe service web-app -n y72
Name:              web-app
Namespace:         y72
Labels:            <none>
Annotations:       <none>
Selector:          run=myapp
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                10.106.215.153
IPs:               10.106.215.153
Port:              <unset>  80/TCP
TargetPort:        3001/TCP
Endpoints:         <none>
Session Affinity:  None
Events:            <none>
```

Upon inspecting the Deployment, you will find that the Pod template uses the label assignment `app=webapp`. The container port is set to 3000. This information doesn't match with the configuration of the Service. The endpoints of the `web-app` Service now points to the IP address and container port of the replicas controlled by the Deployment.

```
$ kubectl get endpoints -n y72
NAME      ENDPOINTS                         AGE
web-app   10.244.0.3:3000,10.244.0.4:3000   24m
```

Edit the live object of the Service. Change the label selector from `run=myapp` to `app=webapp`, and the target port from 3001 to 3000.

```
$ kubectl edit service web-app -n y72
service/web-app edited
```

After changing the Service configuration, you will find that you can open a connection to the Pod running the application.

```
$ kubectl run tmp --image=busybox --restart=Never -it --rm -n y72 -- wget web-app
Connecting to web-app (10.106.215.153:80)
saving to 'index.html'
index.html           100% |********************************|    12  0:00:00 ETA
'index.html' saved
pod "tmp" deleted
```