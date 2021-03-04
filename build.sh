#!/bin/sh

# Build client
yarn build
echo "built"

# Move to public dir at root
mv dist/ ~/public/

pwd
ls