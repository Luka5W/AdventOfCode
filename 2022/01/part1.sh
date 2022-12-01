#!/bin/bash

file="./input.txt"

highestCalories=0;
currentCalories=0;

while read -r line; do
  if [ -z "$line" ]; then
    if [ $currentCalories -gt $highestCalories ]; then
      highestCalories=$currentCalories;
    fi
    currentCalories=0;
  else
    ((currentCalories+=line));
  fi
done <$file

echo "Calories of Elf with most calories: $highestCalories";
