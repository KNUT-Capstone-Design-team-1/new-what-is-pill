FROM python:3.8.1
COPY . /usr/src/wip
WORKDIR /usr/src/wip

# install library for deeplearning server
RUN apt-get update && apt-get -y install libgl1-mesa-glx libmysqlclient-dev \
    && /usr/local/bin/python -m pip install --upgrade pip \
    && pip3 install compiler \
    && pip3 install -r /usr/src/wip/requirements.txt \
    && python3 /usr/src/wip/deeplearning_server/get_dl_model.py

run pip3 install pip3 install flask

# execute deeplearning server
ENTRYPOINT [ "python3", "/usr/src/wip/deeplearning_server/DL_main.py" ]