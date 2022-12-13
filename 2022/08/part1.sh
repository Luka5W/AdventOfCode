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

visible=0;

# iterate over array and compare sizes of maimum sizes
for (( row=0; row < rows; row++ )); do
  for (( col=0; col < cols; col++ )); do
    currentSize=${map["$row,$col"]};
    # get upper max
    max=-1;
    for (( i=0; i < row; i++ )); do
      size=${map["$i,$col"]};
      if [[ $max -lt $size ]]; then
        max=$size;
      fi
    done
    if [[ $max -lt $currentSize ]]; then
      ((visible++));
      continue;
    fi
    # get right max
    max=-1;
    for (( i=0; i < col; i++ )); do
      size=${map["$row,$i"]};
      if [[ $max -lt $size ]]; then
        max=$size;
      fi
    done
    if [[ $max -lt $currentSize ]]; then
      ((visible++));
      continue;
    fi
    # get lower max
    max=-1;
    for (( i=row+1; i < rows; i++ )); do
      size=${map["$i,$col"]};
      if [[ $max -lt $size ]]; then
        max=$size;
      fi
    done
    if [[ $max -lt $currentSize ]]; then
      ((visible++));
      continue;
    fi
    # get left max
    max=-1;
    for (( i=col+1; i < cols; i++ )); do
      size=${map["$row,$i"]};
      if [[ $max -lt $size ]]; then
        max=$size;
      fi
    done
    if [[ $max -lt $currentSize ]]; then
      ((visible++));
    fi
  done
done

echo "Answer: $visible";
