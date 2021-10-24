FROM mysql:8.0.2
RUN apt-get update -y && apt-get upgrade -y && apt-get install openssh-server vim 