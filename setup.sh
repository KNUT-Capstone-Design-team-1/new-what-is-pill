#!/bin/bash
docker build -t 2mukee/wip-main /var/lib/jenkins/workspace/new-what-is-pill/main-server
docker build -t 2mukee/wip-dl /var/lib/jenkins/workspace/new-what-is-pill/deeplearning-server
docker stack deploy -c /var/lib/jenkins/workspace/new-what-is-pill/wip-compose.yml wip-stack