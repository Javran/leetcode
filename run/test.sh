#!/bin/bash

for test in $(find . -maxdepth 1 -iname '*Tests' -executable); do
    $test
    if [ $? -ne 0 ]; then
        echo Failed on $test
        exit 1
    fi
done
