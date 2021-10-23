FROM openjdk:11
COPY . /usr/src/wip
RUN ./gradlew build
WORKDIR /usr/src/wip/build/libs
ENTRYPOINT [ "java", "pill-0.0.1-SNAPSHOT.jar" ]