# Solution

The `Dockerfile` builds a nodejs-based application. All files necessary to run the application are available in the same directory. Upon further inspection, you will find that the `Dockerfile` exposes port 3000.

Build the container image with the following command.

```
$ cd app
$ docker build -t nodejs-hello-world:1.0.0 .
```

You will be able to find the container image by listing it.

```
$ docker images
REPOSITORY           TAG     IMAGE ID       CREATED          SIZE
nodejs-hello-world   1.0.0   0cc723ca8b06   15 seconds ago   180MB
```

Run the container in detached mode with the following command. Make sure to map port 80 to the exposed container port 3000.

```
$ docker run -d -p 80:3000 nodejs-hello-world:1.0.0
9e0f1abcef415e902422117de7644544cdd08ae158a1cd0b2a2d182fcf056cab
```

You can discover details about the container by listing them.

```
$ docker container ls
CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS          PORTS                  NAMES
9e0f1abcef41   nodejs-hello-world:1.0.0   "docker-entrypoint.s…"   25 seconds ago   Up 24 seconds   0.0.0.0:80->3000/tcp
```

You can now access the application on port 80 with either `curl` or `wget`.

```
$ curl localhost
Hello World
$ wget localhost

--2023-05-09 08:38:30--  http://localhost/
Resolving localhost (localhost)... ::1, 127.0.0.1
Connecting to localhost (localhost)|::1|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 12 [text/plain]
Saving to: ‘index.html’

index.html                  100%[=========================================>]      12  --.-KB/s    in 0s

2023-05-09 08:38:30 (2.29 MB/s) - ‘index.html’ saved [12/12]
```

You can retrieve logs written by the application with the following command.

```
$ docker logs 9e0f1abcef415e902422117de7644544cdd08ae158a1cd0b2a2d182fcf056cab
Magic happens on port 3000
```

To save the container image to a file, run the following command.

```
$ docker save -o nodejs-hello-world-1.0.0.tar nodejs-hello-world:1.0.0
$ ls
nodejs-hello-world-1.0.0.tar
```