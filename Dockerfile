FROM mysql:8.0.2
RUN mkdir /etc/ssl/mysql
RUN apt-get update -y && apt-get upgrade -y && apt-get install openssh-server vim