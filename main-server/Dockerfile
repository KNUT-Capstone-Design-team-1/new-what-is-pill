FROM openjdk:11
COPY . /usr/src/wip
WORKDIR /usr/src/wip
RUN bash ./gradlew build
WORKDIR /usr/src/wip/build/libs
ENTRYPOINT [ "java", "pill-0.0.1-SNAPSHOT.jar" ]