# Exercise 7

In this exercise, you will initialize a web application by standing up environment-specific configuration through an init container.

## Creating an Init Container

Kubernetes runs an init container before the main container. In this scenario, the init container retrieves configuration files from a remote location and makes it available to the application running in the main container. The configuration files are shared through a volume mounted by both containers. The running application consumes the configuration files and can render its values.

1. Create a new Pod named `business-app` with two containers, one init container and one main application container. Name the init container `configurer` and the main container `web`. The init container uses the image `busybox`, the main container uses the image `...`. Expose the main container on port 8080.
2. Edit the YAML file by adding a new volume of type `emptyDir` that is mounted at `/usr/shared/app` for both containers.
3. Edit the YAML file by providing the command for the init container. The init container should run a `wget` command for downloading the files `...` and `...` from the `...`. Both files should reside in the directory `/usr/shared/app`.
4. Start the Pod and ensure that it is up and running.
5. Run a `curl` command in a temporary Pod that resolves the context path `render-config` of the main application.