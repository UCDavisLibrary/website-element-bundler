#! /bin/bash

# RUN FROM NPM!

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

DIST=dist

rm -rf $DIST
mkdir -p $DIST/lib

cp ./preview/index.html $DIST
cp ./lib/element-bundle-loader.js $DIST/lib

webpack --config webpack-dist.config.js