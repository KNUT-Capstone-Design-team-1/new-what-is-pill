#!/bin/bash
bash /var/lib/jenkins/workspace/mh-login.sh
docker build --tag 2mukee/wip-db /var/lib/jenkins/workspace/new-what-is-pill/
docker build --tag 2mukee/wip-main /var/lib/jenkins/workspace/new-what-is-pill/main-server
docker build --tag 2mukee/wip-dl-deploy /var/lib/jenkins/workspace/new-what-is-pill/deeplearning-server
docker push 2mukee/wip-db
docker push 2mukee/wip-main
docker push 2mukee/wip-dl-deploy
docker stack deploy -c /var/lib/jenkins/workspace/new-what-is-pill/wip-compose.yml wip-stack