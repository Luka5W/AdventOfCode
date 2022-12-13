#!/bin/bash

file="./input.txt";

# read the file and put all numbers in a 1 1/2 dimensional array
declare -A map;
rows=0;
cols=0;
while read -r line; do
  if [ -z "$line" ]; then
    echo "unexpected empty line";
    exit 1;
  fi
  cols=0;
  while [ $cols -lt ${#line} ]; do
    vec="$rows,$cols";
    map[$vec]=${line:$cols:1};
    ((cols++));
  done
  ((rows++));
done < $file;

sceneScore=0;

# iterate over array and compare sizes of maimum sizes
for (( row=1; row < rows - 1; row++ )); do
  for (( col=1; col < cols - 1; col++ )); do
    currentSize=${map["$row,$col"]};
    for (( i = row - 1, v = 1; i >= 0; i--, v++ )); do
      upScore=$v;
      if [ ${map["$i,$col"]} -ge $currentSize ]; then
        break;
      fi
    done
    for (( i = col + 1, v = 1; i < cols; i++, v++ )); do
      rightScore=$v;
      if [ ${map["$row,$i"]} -ge $currentSize ]; then
        break;
      fi
    done
    for (( i = row + 1, v = 1; i < rows; i++, v++ )); do
      downScore=$v;
      if [ ${map["$i,$col"]} -ge $currentSize ]; then
        break;
      fi
    done
    for (( i = col - 1, v = 1; i >= 0; i--, v++ )); do
      leftScore=$v;
      if [ ${map["$row,$i"]} -ge $currentSize ]; then
        break;
      fi
    done
    tmp=$((upScore * rightScore * downScore * leftScore));
    if [ $tmp -gt $sceneScore ]; then
      sceneScore=$tmp;
      echo "[$row,$col] $upScore $rightScore $downScore $leftScore"
    fi
  done
done

echo "Answer: $sceneScore";
