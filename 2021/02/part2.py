#!/usr/bin/python

import timeit

input = open("input.txt", "r").read().split("\n")

result = 0

# https://stackoverflow.com/a/24812460/14769872
def _template_func(setup, func):
    """Create a timer function. Used if the "statement" is a callable."""
    def inner(_it, _timer, _func=func):
        setup()
        _t0 = _timer()
        for _i in _it:
            retval = _func()
        _t1 = _timer()
        return _t1 - _t0, retval
    return inner

timeit._template_func = _template_func

def calc():
    horizontal = 0
    depth = 0
    aim = 0
    for command in input:
        command, value = command.split(" ")
        value = int(value)
        if command == "forward":
            horizontal += value
            depth += value * aim
        if command == "up":
            aim -= value
        if command == "down":
            aim += value
    return horizontal * depth

num_runs = 10
result = timeit.Timer(calc).timeit(number=num_runs)
print("SOLUTION:            " + str(result[1]))
print("TIME TAKEN (AVG/" + str(num_runs) + "): " + str(result[0]))