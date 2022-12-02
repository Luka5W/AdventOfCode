#!/bin/bash

file="./input.txt"

# scores

rock=1; # a-x
paper=2; # b-y
scissors=3; # c-z
draw=3;
victory=6;

score=0;

while read -r line; do
  if [ -z "$line" ]; then continue; fi
  opponent="${line:0:1}";
  me="${line:2:1}";
  case $opponent in
    A)
      case $me in
        X) ((score+=rock+draw));;
        Y) ((score+=paper+victory));;
        Z) ((score+=scissors));;
      esac;;
    B)
      case "$me" in
        X) ((score+=rock));;
        Y) ((score+=paper+draw));;
        Z) ((score+=scissors+victory));;
      esac;;
    C)
      case "$me" in
        X) ((score+=rock+victory));;
        Y) ((score+=paper));;
        Z) ((score+=scissors+draw));;
      esac;;
  esac
done <$file

echo "Score: $score";
