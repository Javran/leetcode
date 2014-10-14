#!/bin/bash

mkdir -p gtest
cd gtest

GTEST_AR=gtest-1.7.0.zip

# download archive
if [ ! -f ${GTEST_AR} ]; then
    curl "https://googletest.googlecode.com/files/${GTEST_AR}" -o "${GTEST_AR}" -L
fi

# change dir name to a constant name
unzip -n ${GTEST_AR}
mv ${GTEST_AR/.zip/} gtest-home
cd gtest-home

# build gtest
./configure
make
