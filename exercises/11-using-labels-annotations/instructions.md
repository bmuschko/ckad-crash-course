# Exercise 11

In this exercise, you will exercise the use of labels and annotations for a set of Pods.

## Defining and Querying Labels and Annotations

1. Create three different Pods with the names `frontend`, `backend` and `database` that use the image `nginx`.
2. Declare labels for those Pods as follows:

- `frontend`: `env=prod`, `team=shiny`
- `backend`: `env=prod`, `team=legacy`, `app=v1.2.4`
- `database`: `env=prod`, `team=storage`

3. Declare annotations for those Pods as follows:

- `frontend`: `contact=John Doe`, `commit=2d3mg3`
- `backend`: `contact=Mary Harris`

4. Render the list of all Pods and their labels.
5. Use label selectors on the command line to query for all production Pods that belong to the teams `shiny` and `legacy`.
6. Remove the label `env` from the `backend` Pod and rerun the selection.
7. Render the surrounding 3 lines of YAML of all Pods that have annotations.