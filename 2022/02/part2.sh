#!/bin/bash

file="./input.txt"

# scores

rock=1;# a
paper=2; # b
scissors=3; # c
draw=3;
victory=6;

score=0;

while read -r line; do
  if [ -z "$line" ]; then continue; fi
  opponent="${line:0:1}";
  plan="${line:2:1}";
  case $opponent in
    A)
      case $plan in
        X) ((score+=scissors));;
        Y) ((score+=rock+draw));;
        Z) ((score+=paper+victory));;
      esac;;
    B)
      case $plan in
        X) ((score+=rock));;
        Y) ((score+=paper+draw));;
        Z) ((score+=scissors+victory));;
      esac;;
    C)
      case $plan in
        X) ((score+=paper));;
        Y) ((score+=scissors+draw));;
        Z) ((score+=rock+victory));;
      esac;;
  esac
done <$file

echo "Score: $score";
