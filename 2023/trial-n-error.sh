#!/bin/bash

# USAGE
# trial-n-error.sh SCRIPT-WITHOUT-EXTENSION
gcc -o "${1}" "${1}.c" && "${1}";