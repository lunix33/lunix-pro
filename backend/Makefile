SHELL = /bin/bash
HERE := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: build run all ssl

all: build
build:
	cargo build --release

dev:
	cargo watch --poll --watch ./src --watch ../db/src/ --exec run

ssl:
	openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 -subj '/CN=localhost'
