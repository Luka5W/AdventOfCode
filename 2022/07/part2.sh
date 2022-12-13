#!/bin/bash

# space available             = 70G
# req free space              = 30G
# used space                  = $dir[/]

# unused space (u)            = 70G - $dir[/]
# minimum space to be deleted = 30G - (u)

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

# correct dir sizes
for path in "${paths[@]}"; do
  dirSize=${dirs[$path]};
  parent="${path%*/*/}/";
  ((dirs[$parent]+=dirSize));
done

# calculate minimum space to be deleted
minSize=$((70000000 - ${dirs[/]})); # unused space
minSize=$((30000000 - minSize)); # min space

# get smallest dir which could be deleted
smallestSize=${dirs[/]};
for path in "${paths[@]}"; do
  dirSize=${dirs[$path]};
  if [[ $dirSize -ge $minSize && $dirSize -lt $smallestSize ]]; then
     smallestSize=$dirSize;
  fi
done

echo "Answer: $smallestSize";
