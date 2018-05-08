#!/bin/bash

mkdir -p gtest
cd gtest

GTEST_AR=gtest-1.7.0.zip

# download archive
if [ ! -f ${GTEST_AR} ]; then
    curl "https://github.com/google/googletest/archive/release-1.7.0.zip" -o $GTEST_AR -L
fi

# change dir name to a constant name
unzip -n ${GTEST_AR}
mv googletest-release-1.7.0 gtest-home
cd gtest-home

# build gtest
cmake .
make
