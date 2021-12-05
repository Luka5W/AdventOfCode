#!/bin/bash
inputRaw=`cat input.txt`
input=(${inputRaw//\n/ })

function calcRat {
    comp=$1
    shift
    newRat=("$@")
    # set current bit for comparison
    while (( ${#newRat[@]}>1 )); do
        for (( i=0; i<12 && ${#newRat[@]}>1; i++ )); do
            # all lines where the current bit is 0
            newRat0=()
            # all lines where the current bit is 1
            newRat1=()
            # iterate through all remaining lines
            for (( j=0; j<${#newRat[@]}; j++ )); do
                line=${newRat[$j]}
                # compare current bit of line and sort the line to the correct array
                if [[ "${line:$i:1}" = "1" ]]; then
                    newRat1+=($line)
                elif [[ "${line:$i:1}" = "0" ]]; then
                    newRat0+=($line)
                fi
            done
            # overwrite remainiung lines with the array matching the criteria (=$comp; major or minor)
            if [ ${#newRat0[@]} $comp $((${#newRat[@]} / 2)) ]; then
                newRat=(${newRat0[@]})
            else
                newRat=(${newRat1[@]})
            fi
        done
    done
    echo ${newRat[0]}
}
function binToDec {
    bin=$1
    len=${#bin}
    dec=0
    for (( i=0,j=$(( $len - 1)); i<$len; i++,j-- )); do
        if [[ "${bin:$i:1}" = "1" ]]; then
            dec=$(( $dec + 2 ** $j ))
        fi
    done
    echo $dec
}
# criteria: most common bit, on equal keep line with current bit 1 
oxygenGenRat=$(calcRat -gt ${input[@]})
#criteria: least common bit, on equal keep line with current bit 0
co2ScrubRat=$(calcRat -le ${input[@]})

oxygenGenRat=$(binToDec $oxygenGenRat)
co2ScrubRat=$(binToDec $co2ScrubRat)
echo "Live Support Rating: $(( $oxygenGenRat * $co2ScrubRat ))"