#!/bin/bash
IFS=$'\n'
for x in {a..z}
	do
		echo "\"$x\": {\"hangulCode\": }" >> hangul.json
	done
IFS="$OIFS"