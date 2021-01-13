#!/bin/bash

echo $1
wget --save-headers --content-on-error=on https://www.couchsurfing.org/users/$1 -O friends/$1.html
sleep 10
