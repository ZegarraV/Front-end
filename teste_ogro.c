#include <stdio.h>

void represent_fingers(int n) {
    if (n < 0 || n > 10) {
        printf("O número deve estar entre 0 e 10.\n");
        return;
    }
    
    if (n <= 5) {
        for (int i = 0; i < n; i++) {
            printf("I");
        }
        if (n == 0) {
            printf("*");
        }
        printf("\n*\n");
    } else {
        printf("IIIII\n");
        for (int i = 0; i < (n - 5); i++) {
            printf("I");
        }
        printf("\n");
    }
}

int main() {
    int n;
    
    // Ler o número de entrada
    scanf("%d", &n);
    
    // Obter a representação dos dedos
    represent_fingers(n);
    
    return 0;
}
