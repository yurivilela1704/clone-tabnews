FROM ubuntu:latest
LABEL authors="marqu"

ENTRYPOINT ["top", "-b"]