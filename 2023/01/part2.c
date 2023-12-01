#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <sys/stat.h>
#include <string.h>

int main(int argc, char *argv[]) {
    int fd = open("./input.txt", O_RDONLY);
    if (fd < 0) {
        perror("open");
        exit(EXIT_FAILURE);
    }
    char b;
    char b2[] = {' ', ' ', ' ', ' ', ' '};
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
                b2[0] = ' ';
                b2[1] = ' ';
                b2[2] = ' ';
                b2[3] = ' ';
                b2[4] = ' ';
            }
        } else {
            b2[0] = b2[1];
            b2[1] = b2[2];
            b2[2] = b2[3];
            b2[3] = b2[4];
            b2[4] = b;
            int num;
            if (b2[2] == 'o' && b2[3] == 'n' && b2[4] == 'e') {
                num = 1;
            } else if (b2[2] == 't' && b2[3] == 'w' && b2[4] == 'o') {
                num = 2;
            } else if (b2[0] == 't' && b2[1] == 'h' && b2[2] == 'r' && b2[3] == 'e' && b2[4] == 'e') {
                num = 3;
            } else if (b2[1] == 'f' && b2[2] == 'o' && b2[3] == 'u' && b2[4] == 'r') {
                num = 4;
            } else if (b2[1] == 'f' && b2[2] == 'i' && b2[3] == 'v' && b2[4] == 'e') {
                num = 5;
            } else if (b2[2] == 's' && b2[3] == 'i' && b2[4] == 'x') {
                num = 6;
            } else if (b2[0] == 's' && b2[1] == 'e' && b2[2] == 'v' && b2[3] == 'e' && b2[4] == 'n') {
                num = 7;
            } else if (b2[0] == 'e' && b2[1] == 'i' && b2[2] == 'g' && b2[3] == 'h' && b2[4] == 't') {
                num = 8;
            } else if (b2[1] == 'n' && b2[2] == 'i' && b2[3] == 'n' && b2[4] == 'e') {
                num = 9;
            } else {
                num = ((int) b) - 48;
            }
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