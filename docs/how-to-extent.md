# Extend Mcrobit More

You can freely extend the functions on the micro:bit side using MakeCode, and use them from Scratch via a data transfer block.

The micro:bit communicates with Scratch by sending and receiving labeled data between the micro:bit and Scratch. The limitations of data communication are as follows

- Labels are alphanumeric symbols up to 8 characters in length
- Alphanumeric symbols up to 11 characters in length when the data is a string, and numerical values from -3.402823e+38 to 3.402823e+38 when the data is a number
- There are 16 types of labels that can be received by the micro:bit.

## micro:bit side program
Open the MakeCode project [mbit-more-v2-0_2_0](https://makecode.microbit.org/_U9F49zPkEHLz) that contains Microbit More and edit the program. (It will take about 3 minutes to compile.)

The following block in MakeCode can be used to exchange data with Scratch.

- [send text "data" with label "label-01"]<br>
Sends the string "data" with label "label-01" to Scratch.
- [send number (0) with label "label-01"]<br>
Sends the number 0 with the label "label-01" to Scratch.
- [on text (content) with label "label-01"]<br>
Executed when a string (content) with label "label-01" is received.
- [on number (content) with label "label-01"]<br>
Executed when a number (content) with label "label-01" is received.

## Scratch side program
The following blocks can be used to exchange data with the micro:bit in Scratch.


- [ When the label (label-01) data is received from micro:bit]<br>
This block is executed when data with the label "label-01" is received from the micro:bit.
- [Data with label (label-01)]<br>
The content (string or number) of the latest data sent from the micro:bit with the label "label-01".
- The latest data (string or number) sent from micro:bit with label "label-01".
Sends the data (string or number) with the label "label-01" to the micro:bit.
