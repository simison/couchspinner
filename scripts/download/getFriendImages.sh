#!/bin/bash

IMAGE_URL=$(cat $1 | grep -m1 '"og:image"' | grep -v og_image-8ccf1ee35e2d92ffd20af5021bc34924e37b0e31394d0998704b17249a545e43.jpg | grep -oE 'content="([^"])+"' | grep -oE 'https[^"]+')

if [[ $IMAGE_URL == "" ]]
then
	exit
fi

INPUT=$1

FILE_NAME=${INPUT//.html/.jpg}

wget -O $FILE_NAME $IMAGE_URL

