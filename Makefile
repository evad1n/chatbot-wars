.PHONY: clietn server build local

all: server

client:
	cd client && yarn start

server:
	cd server && gin run .

build: 
	./scripts/local-build.sh

local: build all
