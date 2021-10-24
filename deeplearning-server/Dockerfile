FROM python:3.8.1
COPY . /usr/src/wip
WORKDIR /usr/src/wip

RUN mkdir weights \
    && wget https://docs.google.com/uc?export=download&id=1Jk4eGD7crsqCCg9C9VjCLkMN3ze8kutZ -P /usr/src/wip/weights \
    && wget https://docs.google.com/uc?export=download&id=1pBHtpsecIVQptD3HoWt61gwBIgO2uHCR -P /usr/src/wip/weights \ 
    && wget https://docs.google.com/uc?export=download&id=1yLixadZ_3Ls4x_TR0-8MG6-iQSEn5ZSG -P /usr/src/wip/weights \ 
    && apt-get update && apt-get -y install libgl1-mesa-glx \
    && /usr/local/bin/python -m pip install --upgrade pip \
    && pip3 install torch==1.7.1+cpu torchvision==0.8.2+cpu torchaudio==0.7.2 -f https://download.pytorch.org/whl/torch_stable.html \
    && pip3 install flask opencv-python scipy scikit-image lmdb natsort efficientnet_pytorch \
    && python3 model_test.py

ENTRYPOINT [ "python3", "DL_main.py" ]