# Mcrobit More の拡張方法

MakeCode を使って micro:bit 側の機能を自由に拡張して、データ通信ブロックを介して Scratch から利用できます。

micro:bit と Scratch の間でラベル付きデータを送受信して通信しています。データ通信の制限は以下のとおりです。

- ラベルは長さ8文字までの英数字記号
- データの内容が文字列のときは長さ11文字までの英数字記号、数値のときは-3.402823e+38から3.402823e+38までの値
- micro:bit が受け取ることのできるラベルの種類は16種

## micro:bit 側のプログラム
Microbit More の入った MakeCode プロジェクト [mbit-more-v2-0_2_2](https://makecode.microbit.org/_6Dsggo9oc9ce) を開いてプログラムを編集します。(コンパイルには3分ほどかかります。)

MakeCode の中で Scratch とのデータのやり取りに使えるのは以下のブロックです。

- [send text “data” with label “label-01”]<br>ラベル “label-01” をつけて、文字列 “data” を Scratch へ送ります。
- [send number (0) with label “label-01”]<br>ラベル “label-01” をつけて、数値 0 を Scratch へ送ります。
- [on text (content) with label “label-01”]<br>ラベル “label-01” のついた文字列 (content) を受け取ったときに実行されます。
- [on number (content) with label “label-01”]<br>ラベル “label-01” のついた数値 (content) を受け取ったときに実行されます。

## Scratch 側のプログラム
Scratch の中で micro:bit とデータのやり取りに使えるのは以下のブロックです。

- [ micro:bit からラベル (label-01) のデータを受け取ったとき]<br>micro:bit からラベル “label-01” を付けられたデータを受け取ったときに実行されます。
- [ラベル (label-01) のデータ]<br>micro:bit からラベル “label-01” を付けて送られた最新のデータの内容(文字列か数値)です。
- [micro:bit へデータ (data) にラベル (label-01) を付けて送る]<br>micro:bit へデータ data (文字列か数値)にラベル “label-01” をつけて送ります。
