FROM python:3.8.1
COPY . /usr/src/wip
WORKDIR /usr/src/wip

RUN RUN apt-get update && apt-get -y install libgl1-mesa-glx \
    && /usr/local/bin/python -m pip install --upgrade pip \
    && pip3 install torch==1.7.1+cpu torchvision==0.8.2+cpu torchaudio==0.7.2 -f https://download.pytorch.org/whl/torch_stable.html \
    && pip3 install flask opencv-python scipy scikit-image lmdb natsort efficientnet_pytorch \
    && python3 model_test.py
ENTRYPOINT [ "python3", "DL_main.py" ]