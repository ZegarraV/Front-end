#include <stdio.h>

int main() {
    int N;
    scanf("%d", &N);

    if (N < 0 || N > 10) {
        printf("Número fora do intervalo permitido.\n");
        return 1;
    }

    int esquerda = (N <= 5) ? N : 5;
    int direita = (N <= 5) ? 0 : N - 5;

    // Representação da mão esquerda
    for (int i = 0; i < esquerda; i++) {
        printf("I");
    }
    for (int i = esquerda; i < 5; i++) {
        printf("*");
    }
    printf("\n");

    // Representação da mão direita
    for (int i = 0; i < direita; i++) {
        printf("I");
    }
    for (int i = direita; i < 5; i++) {
        printf("*");
    }
    printf("\n");

    return 0;
}