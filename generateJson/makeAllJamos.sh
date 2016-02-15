#!/bin/bash
for file in `find -type f -name "*.txt"`
do
	FILENAMEJSON=`echo "$file" | sed 's/txt/json/g'`
	#!awk '{ print " "$1" : {\"code\": " $2 "}," }' "$file" > "../json/$FILENAMEJSON"
	awk '{ print " "$1" : "$2"," }' "$file" > "../json/$FILENAMEJSON"
	
done
