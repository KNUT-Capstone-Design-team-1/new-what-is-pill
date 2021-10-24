FROM openjdk:11
COPY . /usr/src/wip
WORKDIR /usr/src/wip/
RUN bash ./gradlew build -x test
RUN bash ./gradlew clean build -Dhttps.protocols=TLSv1.2
ENTRYPOINT [ "java", "-jar", "/usr/src/wip/build/libs/pill-0.0.1-SNAPSHOT.jar" ]