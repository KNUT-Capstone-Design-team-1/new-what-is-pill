FROM 2mukee/wip-main
COPY . /usr/src/wip
WORKDIR /usr/src/wip
WORKDIR /usr/src/wip/build/libs
RUN javac -d pill-0.0.1-SNAPSHOT.jar
CMD [ "java", "pill-0.0.1-SNAPSHOT.jar" ]