#!/bin/bash

file="./input.txt";

score=0;

while read -r line; do
  halfLength=$((${#line} / 2));
  firstHalf=${line:0:halfLength};
  secondHalf=${line:halfLength:${#line}};
  while read -n 1 char; do
    if [[ "$secondHalf" == **"$char"** ]]; then
      found=$(printf '%d' "'$char");
      # a-z = 97-122
      # A-Z = 65-90
      if [ $found -le 90 ]; then
        # uppercase
        # -38=65-1-26
        ((found-=38));
      else
        # lowercase
        # -96=97-1
        ((found-=96));
      fi
      ((score+=found));
      break;
    fi
  done <<< "$line"
done <$file

echo "Answer: $score";
