FROM 2mukee/wip-main
COPY . /usr/src/wip
WORKDIR /usr/src/wip/
RUN bash ./gradlew build -x test
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/src/wip/build/libs/pill-0.0.1-SNAPSHOT.jar" ]