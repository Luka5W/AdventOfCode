#!/bin/bash

file="./input.txt";
stacks=();
stacksReady=0;

while read -r; do
  # read returns REPLY with leading andtrailing spaces but when passing a
  #  variable name to read, the spaces are removed
  line="$REPLY";
  if [ $stacksReady -eq 2 ]; then
    if [[ "$line" =~ ^move\ [0-9]+\ from\ [0-9]+\ to\ [0-9]+$ ]]; then
      instruction=($line);
      amount=${instruction[1]};
      nAmount=$((-amount));
      from=$((${instruction[3]} - 1));
      to=$((${instruction[5]} - 1));
      stacks[to]+=${stacks[from]:nAmount:amount};
      stacks[from]=${stacks[from]::nAmount};
    else
      echo "unexpected line '$line'";
      exit 1;
    fi
  elif [[ "$line" =~ ^\ 1 ]]; then
    continue;
  elif [ -z "$line" ]; then
    stacksReady=2;
    continue;
  else
    # append space so last item is counted too
    line+=" ";
    for (( i=0; i < ${#line}; i+=4 )); do
      stackI=$((i / 4));
      if [ $stacksReady -eq 0 ]; then
        stacks[stackI]="";
      fi
      if [[ "${line:$i:4}" =~ ^\[[A-Z]\]\ $ ]]; then
        stacks[stackI]="${line:((i + 1)):1}${stacks[stackI]}";
      fi
    done
    stacksReady=1;
  fi
done < $file;

topLetters="";

for stack in "${stacks[@]}"; do
  topLetters+=${stack: -1};
done


echo "Answer: $topLetters";
