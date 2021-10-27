FROM 2mukee/wip-main:latest
COPY . /usr/src/wip
WORKDIR /usr/src/wip
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/src/wip/build/libs/pill-0.0.1-SNAPSHOT.jar" ]