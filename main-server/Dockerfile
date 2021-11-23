# Build Image
FROM openjdk:11 AS builder
COPY . /usr/src/wip

# Main server Build
WORKDIR /usr/src/wip/
RUN bash ./gradlew build -x test


# Main Container
FROM alpine:edge
COPY --from=builder /usr/src/wip/build/libs/pill-pill-0.0.1-SNAPSHOT.jar /usr/src/wip
WORKDIR /usr/src/wip/
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime \
    && apk add --update openjdk11=11.0.13_p8-r0
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/src/wip/pill-0.0.1-SNAPSHOT.jar" ]