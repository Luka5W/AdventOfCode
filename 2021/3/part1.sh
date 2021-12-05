#!/bin/bash
inputRaw=`cat input.txt`
input=(${inputRaw//\n/ })
# values in input contains 12 bits each
trueVals=(0,0,0,0,0,0,0,0,0,0,0,0)
for line in "${input[@]}"; do
    for (( i=0; i<${#line}; i++ )); do
        if [[ "${line:$i:1}" = "1" ]]; then
            (( trueVals[$i]++ ))
        fi
    done
done
half=$((${#input[@]} / 2))
for (( i=0, j=11; i<${#trueVals[@]}; i++, j-- )); do
    if [ ${trueVals[$i]} -gt $half ]; then
        gamma=$(($gamma + 2 ** $j))
    elif [ ${trueVals[$i]} -lt $half ]; then
        epsilon=$(($epsilon + 2 ** $j))
    else
        echo "val is exact half; no most/ least common bit"
        exit 1
    fi
done
echo $(($gamma * $epsilon))