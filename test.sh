#!/bin/ash

echo "==== testing files ===="
if cat $jsonfile | strip-json-comments | jq empty; then
	
else
	echo "File not found $jsonfile"
	exit 1
fi