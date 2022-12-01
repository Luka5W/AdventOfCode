#!/bin/bash

file="./input.txt"

calories1st=0;
calories2nd=0;
calories3rd=0;
caloriesCurrent=0;

while read -r line; do
  if [ -z "$line" ]; then
    if [ $caloriesCurrent -gt $calories1st ]; then
      calories3rd=$calories2nd;
      calories2nd=$calories1st;
      calories1st=$caloriesCurrent;
    elif [ $caloriesCurrent -gt $calories2nd ]; then
      calories3rd=$calories2nd;
      calories2nd=$caloriesCurrent;
    elif [ $caloriesCurrent -gt $calories3rd ]; then
      calories3rd=$caloriesCurrent;
    fi
    caloriesCurrent=0;
  else
    ((caloriesCurrent+=line));
  fi
done <$file

((caloriesCurrent=calories1st+calories2nd+calories3rd));
echo "Calories of 3 Elves with most calories: $caloriesCurrent";
