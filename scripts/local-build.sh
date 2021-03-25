#!/bin/sh

# Build in client dir
cd ./client
yarn build

# Move to server folder
cd ..
rm -rf ./server/public
mv ./client/build ./server/public