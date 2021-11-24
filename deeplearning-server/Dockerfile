FROM python:3.8.1 AS builder
COPY . /usr/src/wip
RUN mkdir weights
WORKDIR /usr/src/wip/weights

# install library for deeplearning server
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1Jk4eGD7crsqCCg9C9VjCLkMN3ze8kutZ' -O craft_mlt_25k.pth \
    && wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1pBHtpsecIVQptD3HoWt61gwBIgO2uHCR' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1pBHtpsecIVQptD3HoWt61gwBIgO2uHCR" -O fine_tuned.pt && rm -rf /tmp/cookies.txt \
    && wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1yLixadZ_3Ls4x_TR0-8MG6-iQSEn5ZSG' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1yLixadZ_3Ls4x_TR0-8MG6-iQSEn5ZSG" -O pill_recog_model.pth && rm -rf /tmp/cookies.txt \
    && apt-get update && apt-get -y install libgl1-mesa-glx \
    && /usr/local/bin/python -m pip install --upgrade pip \
    && pip3 install torch==1.7.1+cpu torchvision==0.8.2+cpu torchaudio==0.7.2 -f https://download.pytorch.org/whl/torch_stable.html \
    && pip3 install flask opencv-python scipy scikit-image lmdb natsort efficientnet_pytorch

# deeplearning model test and server compile
WORKDIR /usr/src/wip
RUN python3 model_test.py && python -m compile -f -b .


# deeplearning server container
FROM alpine:3.11

# library directory copy
COPY --from=builder /usr/local/lib/python3.8 /usr/local/lib/python3.8

# server program copy and python 3.8 install
COPY --from=builder /usr/src/wip/__pycache__ /usr/src/wip
WORKDIR /usr/src/wip
RUN apk add --update python3=3.8.10-r0 && chmod -R +x wip

# execute deeplearning server
ENTRYPOINT [ "./DL_main.cpython-38.pyc" ]