#!/bin/sh

# Build in client dir
cd ../client
yarn build

# Move to server folder
cd ..
mv ./client/build ./server/public