# Microbit More とは

Microbit More は教育向けプログラミング環境 Scratch (スクラッチ)で micro:bit (マイクロビット)を使えるようにする拡張機能です。Scratch に付属する micro:bit 拡張よりも高機能で、micro:bit に備わっているセンサーや LED などの機能をすべて利用できます。

![](microbit_more-microbit_light-1024x768.jpg ':size=400')

[](https://www.youtube.com/embed/etjPQkMToK8 ':include :type=iframe width=100% height=400px')

## 利用環境

### micro:bit

micro:bit v1.3, v1.5, v2.0 で利用できます。

ただし、micro:bit v1.3, v1.5 は、メモリー容量が少ないために「データ通信」関係のブロックは使えません。

### ウェブブラウザ

#### Chromebook
- Google Chrome
- Microsoft Edge

#### Windows
- Google Chrome
- Microsoft Edge
- Firefox (Scratch Link利用)

#### Mac
- Google Chrome
- Microsoft Edge
- Firefox (Scratch Link利用)
- Safari (Scratch Link利用)

#### iPad
- [Scrub](https://apps.apple.com/jp/app/scrub-web-browser/id1569777095) <br>設定画面のホームURL「カスタム」に https://microbit-more.github.io/editor/ と入力します。

## 特徴

### 利用できる micro:bit の機能

以下の機能をブロックプログラミングで利用できます。
<!-- (詳細は [ブロック](blocks "ブロックの詳細") を参照) -->

入力

- 明るさ
- 温度
- 方位
- 磁力
- 姿勢
- 加速度
- ジェスチャー
- デジタル入力
- アナログ入力
- デジタルパルス/エッジイベント
- A/Bボタン
- LOGOタッチボタン (v2だけ)
- 音の大きさ (v2だけ)

出力

- デジタル出力
- アナログ出力
- サーボモーター
- LEDに絵を表示する
- LEDに文字を表示する
- 周波数を指定して音を鳴らす

拡張

- MakeCodeによる機能拡張

### USBでつないで利用可能

Web Serial API に対応しているブラウザ(Chrome/Edge v89以降)で開くと、 micro:bit をUSBケーブルで接続して無線を使わずに利用できます。

### オフラインで利用可能

Microbit MoreエディターはPWA(Progressive Web Apps)になっているので、オフラインで利用できます。
([使い方](how-to-use?id=%e3%82%aa%e3%83%95%e3%83%a9%e3%82%a4%e3%83%b3%e3%81%a7%e4%bd%bf%e3%81%86) を参照)

## 変更履歴

- [Releases · microbit-more/mbit-more-v2](https://github.com/microbit-more/mbit-more-v2/releases)
- [Releases · microbit-more/pxt-mbit-more-v2](https://github.com/microbit-more/pxt-mbit-more-v2/releases)