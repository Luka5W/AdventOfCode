#!/bin/bash

file="./input.txt";

score=0;

member=0;
while read -r line; do
  case $member in
    0)
      commonItems0=$line;
      ((member++));;
    1)
      unset commonItems1;
      while read -n 1 char; do
        if [[ "$commonItems0" == **"$char"** ]]; then
          commonItems1+=$char;
        fi
      done <<< "$line"
      ((member++));;
    2)
      while read -n 1 char; do
        if [[ "$commonItems1" == **"$char"** ]]; then
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
      member=0;;
  esac
done < $file

echo "Answer: $score";
