#!/bin/bash

file="./input.txt";

monkeyCount=-1;
monkeyItems=();
monkeyOps=();
monkeyTest=();
monkeyTrue=();
monkeyFalse=();
monkeyActivity=();

while read -r line; do
  if [[ "$line" =~ ^Monkey ]]; then
    ((monkeyCount++));
    monkeyActivity[$monkeyCount]=0;
  elif [[ "$line" =~ ^Starting\ items: ]]; then
    monkeyItems[$monkeyCount]=$(echo "${line:15}" | sed s/\ //g);
  elif [[ "$line" =~ ^Operation:\ new\ \= ]]; then
    monkeyOps[$monkeyCount]=$(echo "${line:16}" | sed s/\ //g);
  elif [[ "$line" =~ ^Test:\ divisible\ by ]]; then
    monkeyTest[$monkeyCount]="${line:19}";
  elif [[ "$line" =~ ^If\ true:\ throw\ to\ monkey ]]; then
    monkeyTrue[$monkeyCount]="${line:25}";
  elif [[ "$line" =~ ^\If\ false:\ throw\ to\ monkey ]]; then
    monkeyFalse[$monkeyCount]="${line:26}";
  fi
done < $file;

((monkeyCount++));

# evalOps old ops -> new
function evalOps {
  old=$1;
  ops=$2;
  if [ "${ops:0:3}" == "old" ]; then
    if [ "${ops:3:1}" == "*" ]; then
      if [ "${ops:4}" == "old" ]; then
        echo $((old * old));
      else
        echo $((old * ${ops:4}));
      fi
    elif [ "${ops:3:1}" == "+" ]; then
      if [ "${ops:4}" == "old" ]; then
        echo $((old + old));
      else
        echo $((old + ${ops:4}));
      fi
    else
      exit 1;
    fi
  else
    exit 1;
  fi
}

for (( round = 0; round < 20; round++ )); do
  echo "Round $round";
  for (( monkey = 0; monkey < monkeyCount; monkey++ )); do
    items=(${monkeyItems[$monkey]//,/ });
    if [ ${#items[@]} -eq 0 ]; then
      continue;
    fi
    ops=${monkeyOps[$monkey]};
    test=${monkeyTest[$monkey]};
    true=${monkeyTrue[$monkey]};
    false=${monkeyFalse[$monkey]};
    for (( itemI = 0; itemI < ${#items[@]}; itemI++ )); do
      ((monkeyActivity[$monkey]++));
      # inspect
      item=${items[$itemI]};
      # evalOps
      item=$(evalOps $item $ops);
      # div 3
      ((item /= 3));
      # test and throw
      if (( item % test == 0 )); then
        monkeyItems[$true]+=",$item";
      else
        monkeyItems[$false]+=",$item";
      fi
      monkeyItems[$monkey]="";
    done
  done;
done;

first=0;
second=0;

for (( monkey = 0; monkey < monkeyCount; monkey++ )); do
  if (( ${monkeyActivity[monkey]} > first )); then
    second=$first;
    first=${monkeyActivity[monkey]};
  elif (( ${monkeyActivity[monkey]} > second )); then
    second=${monkeyActivity[monkey]};
  fi
done

echo "Answer: $((first * second))";
