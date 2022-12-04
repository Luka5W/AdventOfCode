#!/bin/bash

file="./input.txt";

duplicates=0;

while read -r line; do
  pairs=(${line//,/ });
  pair0=(${pairs[0]//-/ });
  pair1=(${pairs[1]//-/ });
  if [[ ${pair0[0]} -ge ${pair1[0]} && ${pair0[1]} -le ${pair1[1]} ||
      ${pair0[0]} -le ${pair1[0]} && ${pair0[1]} -ge ${pair1[1]} ]]; then
    ((duplicates++));
  fi
done < $file;

echo "Answer: $duplicates";
