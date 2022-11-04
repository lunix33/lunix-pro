SHELL = /bin/bash
HERE := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: deps

deps:
	sudo apt-get install -y libssl-dev libsqlite3-dev
	cargo install diesel_cli --no-default-features --features sqlite
	cargo install cargo-watch

dev:
	cd $(HERE)share
	docker compose up