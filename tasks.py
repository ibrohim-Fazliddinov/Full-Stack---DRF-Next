def longest_palindromic_subarray(n, a):
    max_len = 0

    # Перебираем все возможные начала
    for i in range(n):
        for j in range(i + 1, n):  # Минимальная длина - 2 элемента
            left, right = i, j
            while left < right and a[left] == a[right]:
                left += 1
                right -= 1
            if left >= right:  # Если все пары совпали
                max_len = max(max_len, j - i + 1)

    return max_len


# Читаем ввод
n = int(input())
a = list(map(int, input().split()))

# Выводим ответ
print(longest_palindromic_subarray(n, a))
