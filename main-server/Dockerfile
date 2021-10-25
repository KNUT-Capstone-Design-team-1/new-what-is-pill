FROM openjdk:11
COPY . /usr/src/wip
WORKDIR /usr/src/wip/
RUN bash ./gradlew build -x test \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && bash -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update -y && apt-get install -y google-chrome-stable=95.* \
    && wget -N https://chromedriver.storage.googleapis.com/95.0.4638.17/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip \ apt-get install -y xvfb
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/src/wip/build/libs/pill-0.0.1-SNAPSHOT.jar" ]