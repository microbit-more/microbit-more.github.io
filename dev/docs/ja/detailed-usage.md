# 詳しい使い方

## USBでつなぐ

「シフト」キーを押しながら接続ボタンを押すと、USB接続を選択できます。
([microbit-mbit-more-v2-0_2_2.hex ](https://github.com/microbit-more/pxt-mbit-more-v2/releases/tag/0.2.2) 以降)

[Web Serial API](https://wicg.github.io/serial/) を利用しているので、現在のところ利用できるのは Chromebook/Mac/Windows の Chrome/Edge だけです。

***注意***
現在のバージョンでは通信が不安定です。
センサーの値は利用できますが、アナログレベルやLED表示などの命令を伴うブロックを連続して使うと10分程で通信が不通になります。