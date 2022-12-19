#!/bin/bash

file="./input.txt";

cycle=0;
x=1;
row=0;
crt=();

function setPixel {
  if (( cycle != 0 && cycle % 40 == 0 )); then
    ((row++));
  fi
  if (( x - 1 <= cycle % 40 && x + 1 >= cycle % 40 )); then
    crt[$row]+="#";
  else
    crt[$row]+=".";
  fi
  ((cycle++));
}

while read -r line; do
  if [ -z "$line" ]; then
    continue;
  elif [ "${line:0:4}" == "noop" ]; then
    setPixel;
  elif [ "${line:0:4}" == "addx" ]; then
    setPixel;
    setPixel;
    ((x+=${line:5}));
  fi
done < $file;

echo "Answer:";
echo "${crt[0]}";
echo "${crt[1]}";
echo "${crt[2]}";
echo "${crt[3]}";
echo "${crt[4]}";
echo "${crt[5]}";
