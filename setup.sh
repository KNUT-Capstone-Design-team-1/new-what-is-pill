#!/bin/bash
bash /var/lib/jenkins/workspace/mh-login.sh
docker build --tag 2mukee/wip-main:1.0 /var/lib/jenkins/workspace/new-what-is-pill/main-server
docker build --tag 2mukee/wip-dl-deploy:1.0 /var/lib/jenkins/workspace/new-what-is-pill/deeplearning-server
docker push 2mukee/wip-main:1.0
docker push 2mukee/wip-dl-deploy:1.0
docker stack deploy -c /var/lib/jenkins/workspace/new-what-is-pill/wip-compose.yml wip-stack