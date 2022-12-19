#!/bin/bash

file="./input.txt";

cycle=0;
x=1;
signalStrength=0;

function calcSignalStrength {
  ((cycle++));
  if (( cycle % 40 == 20 )); then
    ((signalStrength+=cycle*x));
  fi
}
while read -r line; do
  if [ -z "$line" ]; then
    continue;
  elif [ "${line:0:4}" == "noop" ]; then
    calcSignalStrength;
  elif [ "${line:0:4}" == "addx" ]; then
    calcSignalStrength;
    calcSignalStrength;
    ((x+=${line:5}));
  fi
done < $file;

echo "Answer: $signalStrength";
