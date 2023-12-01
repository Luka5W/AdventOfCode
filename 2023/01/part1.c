#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <sys/stat.h>

int main(int argc, char *argv[]) {
    int fd = open("./input.txt", O_RDONLY);
    if (fd < 0) {
        perror("open");
        exit(EXIT_FAILURE);
    }
    char b;
    int first = -1;
    int sum = 0;
    int last;
    while (1) {
        const ssize_t rB = read(fd, &b, 1);
        // abort when finished reading last byte
        if (rB == 0) {
            break;
        } else if (rB < 0) {
            perror("read");
            exit(EXIT_FAILURE);
        } else if (b == '\n') {
            if (first != -1) {
                sum += (10 * first) + last;
                first = -1;
            }
        } else {
            int num = ((int)b) - 48;
            if (num > -1 && num < 10) {
                if (first == -1) {
                    first = num;
                    last = num;
                } else {
                    last = num;
                }
            }
        }
    }
    printf("Sum = %d\n", sum);
    close(fd);
    exit(EXIT_SUCCESS);
}