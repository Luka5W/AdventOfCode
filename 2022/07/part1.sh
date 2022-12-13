#!/bin/bash

file="./input.txt";

total=0;

currentDir="";
declare -A dirs;

# get all directories total sizes
while read -r line; do
  if [ "$line" == "$ cd /" ]; then
    currentDir="/";
  elif [[ "$currentDir" != "/" && "$line" == "$ cd .." ]]; then
    currentDir="${currentDir%*/*/}/";
  elif [[ "$line" =~ ^\$\ cd ]]; then
    currentDir+="${line:5}/";
  elif [[ "$line" =~ ^\$\ ls ]]; then
    dirs[$currentDir]=0;
  elif [[ "$line" =~ ^dir ]]; then
    # dir
    # can be ignored
    continue;
  else
    # file
    # add size to directorys total size
    ((dirs[$currentDir]+=${line% *}));
  fi
done < $file;

# sort paths (keys of $dirs)
paths=($(for path in "${!dirs[@]}"; do echo "$path"; done | sort -r));


# correct dir sizes, increment total size
total=0;
for path in "${paths[@]}"; do
  dirSize=${dirs[$path]};
  if [ $dirSize -le 100000 ]; then
    ((total+=dirSize));
  fi
  parent="${path%*/*/}/";
  ((dirs[$parent]+=dirSize));
done

echo "Answer: $total";
