FROM mysql:8.0.2
RUN mkdir /etc/ssl/mysql
VOLUME /home/wip-dev/data:/var/lib/mysql
VOLUME /home/wip-dev/ssl:/etc/ssl/mysql