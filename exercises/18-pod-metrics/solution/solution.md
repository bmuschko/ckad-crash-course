# Solution

Create the namespace with the imperative command.

```
$ kubectl create ns stress-test
namespace/stress-test created
```

Create all Pods by pointing the `apply` command to the current directory.

```
$ kubectl apply -f ./
pod/stress-1 created
pod/stress-2 created
pod/stress-3 created
```

Retrieve the metrics for the Pods from the metrics server using the `top` command.

```
$ kubectl top pods -n stress-test
NAME       CPU(cores)   MEMORY(bytes)
stress-1   50m          77Mi
stress-2   74m          138Mi
stress-3   58m          94Mi
```

The Pod with the highest amount of memory consumption is Pod named `stress-2`. The metrics will look different on your machine given that the amount of consumed memory is randomized in the command executed per container.