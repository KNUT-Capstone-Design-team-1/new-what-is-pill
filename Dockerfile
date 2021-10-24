FROM mysql:8.0.2
RUN mkdir /etc/ssl/mysql
RUN apt-get update -y && apt-get upgrade -y && apt-get install -y openssh-server vim 
VOLUME /home/wip-dev/data:/var/lib/mysql
VOLUME /home/wip-dev/ssl:/etc/ssl/mysql