# Virtual Machine. Постановка задачи

## Запуск
```
node vm.js *.solojs
```
---
## Синтаксис языка solojs
adr - адрес ячейки в памяти

value - значение, которое надо положить

**Commands:**

``` input adr value ``` - добавляет значение в ячейку

``` add adr1 adr2 adr3 ``` - &adr3 = &adr1 + &adr2

``` sub adr1 adr2 adr3 ``` - &adr3 = &adr1 - &adr2

``` mul adr1 adr2 adr3 ``` - &adr3 = &adr1 * &adr2

``` div adr1 adr2 adr3 ``` - &adr3 = &adr1 / &adr2

``` mod adr1 adr2 adr3 ``` - &adr3 = &adr1 % &adr2

``` point adr1 .. endpoint ``` - отделяет блок кода, и кладёт в ячейку значение откуда начинается этот блок кода. **endpoint обязательно**

``` goto adr ``` - аналог goto
``` output adr ``` - выводит значение
``` j# adr1 adr2 adr3 ``` - if j#(adr1#adr2) then goto adr3 (je ==, jb > , jl <)
---