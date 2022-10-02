# Алгоритм RLE. Постановка задачи

**Параметры:**
1. Режим работы: _code_, _decode_, _test_
2. Путь к входному файлу / название входного файла
3. Путь к выходному файлу / название выходного файла
---
Кодировка (_code_) - кодируем исходный текст по алгоритму RLE + вычисляем коэффциент сжатия:
```
node rle.js code input_c.txt output_с.txt
```
**Input:** исходный текст (*input_c.txt*)

**Output:** закодированный текст (*output_с.txt*)

---

Декодировка (_decode_) - декодируем исходный текст:
```
node rle.js decode input_de.txt output_de.txt
```
**Input:** исходный закодированный текст (*input_de.txt*)

**Output:** раскодированный текст (*output_de.txt*)

---

Тест (_test_) - для сравнения текста двух файлов:
```
node rle.js test input_c.txt output_de.txt
```
**Input:** два текста

**Output:** true / false

