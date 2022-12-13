#!/bin/bash

file="./input.txt";

# only 1 line is expected
read -r line < $file;

charI=-1;

for (( i=14; i <= ${#line}; i++ )); do
  areAllCharsUnique=1;
  str="${line:((i - 14)):14}";
  for (( j=1; j < ${#str}; j++ )); do
    if [[ "${str:((j)):((${#str} - j))}" == *"${str:((j - 1)):1}"* ]]; then
      areAllCharsUnique=0;
      break;
    fi
  done
  if [ $areAllCharsUnique -eq 1 ]; then
    charI=$i;
    break;
  fi
done

echo "Answer: $charI";

if [ $charI -eq -1 ]; then
  exit 1;
fi
