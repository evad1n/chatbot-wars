all:
	cd server && go run .

build: 
	./scripts/local-build.sh

local: build all
