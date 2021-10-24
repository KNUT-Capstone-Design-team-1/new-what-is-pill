FROM mysql:8.0.2
RUN mkdir /etc/ssl/mysql
RUN apt-get update -y --fix-missing && apt-get upgrade -y && apt-get install openssh-server vim
VOLUME /home/wip-dev/data:/var/lib/mysql
VOLUME /home/wip-dev/ssl:/etc/ssl/mysql
CMD --default-authentication-plugin=mysql_native_password