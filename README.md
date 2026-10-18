Execution steps:
# 1. Start Minikube
minikube start

# 2. Build the Docker image
docker build -t task-manager:2.0 .

# 3. Load the image into Minikube
minikube image load task-manager:2.0

# 4. Deploy App, Prometheus, and Grafana all at once
kubectl apply -f k8s-all.yaml

# 5. Check that all 3 pods are Running
kubectl get pods

*Prometheus Visualization*
1. Run minikube service task-manager-service to open the web app in your browser, and click the Add Dummy Task button a few times.
2. Run minikube service prometheus-service to open Prometheus.
3. Go to Status -> Targets to show task-manager is UP.
4. To demonstrate output:
    1. up{job="task-manager"}
    2. task_manager_http_requests_total
    3. rate(task_manager_http_requests_total[1m])
    4. process_resident_memory_bytes

*Grafana Visualization*
1. Run minikube service grafana-service and log in with admin / admin
2. Go to Connections -> Data Sources -> Add new data source -> Prometheus.
3. Set the URL to http://prometheus-service:9090 and click Save & test.
4. In Grafana's query editor, switch the toggle at the top right of the query box from Builder to Code so you can paste these queries directly as raw text.
5. up{job="task-manager"}
6. sum(rate(task_manager_http_requests_total[1m]))
7. task_manager_http_requests_total
9. process_resident_memory_bytes
10. nodejs_heap_size_used_bytes