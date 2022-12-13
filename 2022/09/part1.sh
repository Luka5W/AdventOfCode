#!/bin/bash

file="./input.txt";

# holds all positions where the tail was
index=();

posHx=0;
posHy=0;
posTx=0;
posTy=0;

function isNotTouching {
  for (( x = posTx - 1; x < posTx + 2; x++ )); do
    for (( y = posTy - 1; y < posTy + 2; y++ )); do
      if (( x == posHx && y == posHy )); then
        return 1;
      fi
    done
  done
  return 0;
}

function addTPos {
  if [[ ! " ${index[*]} " =~ " $posTx,$posTy " ]]; then
    index+=("$posTx,$posTy");
  fi
}

addTPos;
prevDir=N;
while read -r line; do
  if [ -z "$line" ]; then
    continue;
  fi
  direction=${line:0:1};
  steps=${line:2}; 
  case $direction in
    U)
      for (( step = 0; step < steps; step++ )); do
        ((posHy++));
        if isNotTouching; then
          if (( posTx + 1 == posHx )); then
            ((posTx++));
          elif (( posTx - 1 == posHx )); then
            ((posTx--));
          fi
          ((posTy++));
          addTPos;
        fi
      done;;
    D)
      for (( step = 0; step < steps; step++ )); do
        ((posHy--));
        if isNotTouching; then
          if (( posTx + 1 == posHx )); then
            ((posTx++));
          elif (( posTx - 1 == posHx )); then
            ((posTx--));
          fi
          ((posTy--));
          addTPos;
        fi
      done;;
      #((posHy-=steps));
      #if isNotTouching; then
      #  posTx=$posHx;
      #  posTy=$((posHy + steps));
      #fi
      #while isNotTouching; do
      #  ((posTy--));
      #  addTPos;
      #done;;
    R)
      for (( step = 0; step < steps; step++ )); do
        ((posHx++));
        if isNotTouching; then
          if (( posTy + 1 == posHy )); then
            ((posTy++));
          elif (( posTy - 1 == posHy )); then
            ((posTy--));
          fi
          ((posTx++));
          addTPos;
        fi
      done;;
    L)
      for (( step = 0; step < steps; step++ )); do
        ((posHx--));
        if isNotTouching; then
          if (( posTy + 1 == posHy )); then
            ((posTy++));
          elif (( posTy - 1 == posHy )); then
            ((posTy--));
          fi
          ((posTx--));
          addTPos;
        fi
      done;;
  esac
done < $file;

#echo ${index[@]}

#for (( y = 5; y >= 0; y-- )); do
#  for (( x = 0; x < 6; x++ )); do
#    if [[ $x -eq 0 && $y -eq 0 ]]; then
#      echo -n "s";
#    elif [[ ! " ${index[*]} " =~ " $x,$y " ]]; then
#      echo -n ".";
#    else
#      echo -n "#";
#    fi
#  done
#  echo
#done
echo "Answer: ${#index[@]}";
