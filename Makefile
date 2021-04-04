.PHONY: client server build local

all: server

client:
	cd client && yarn start

server:
	cd server && go run .
	# cd server && nodemon -x "go run ." 

build: 
	./scripts/local-build.sh

local: build all
