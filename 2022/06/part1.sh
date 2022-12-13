#!/bin/bash

file="./input.txt";

# only 1 line is expected
read -r line < $file;

charI=-1;

for (( i=4; i < ${#line}; i++ )); do
  c1="${line:((i - 1)):1}";
  c2="${line:((i - 2)):1}";
  c3="${line:((i - 3)):1}";
  c4="${line:((i - 4)):1}";
  if [[ $c1 != $c2 && $c1 != $c3 && $c1 != $c4
    && $c2 != $c3 && $c2 != $c4
    && $c3 != $c4 ]]
  then
    charI=$i;
    break;
  fi
done

echo "Answer: $charI";

if [ $charI -eq -1 ]; then
  exit 1;
fi
