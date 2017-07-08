#!/bin/bash

for i in `seq 1 30`; do
    sudo docker cp ./dTest test$i:/JAMScript/samples/J2C/sync/
done
~                     
