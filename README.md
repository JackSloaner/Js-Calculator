# Js-Calculator
## Description:
This fully functional desktop calculator was inspired by the Apple iPhone Calculator and includes several of its unique features. I created this calculator as the final project for The Odin Project's Foundations course, using a combination of HTML, JavaScript, and CSS techniques that I learned throughout the 5 months it took me to complete the course.

## Special Features
- Floating point arithmetic compensation: Compensate for errors created by operating on floating point numbers (e.g. `0.1 + 0.2` == `0.3` != `0.30000000000000004`)
- Adaptive decimal truncation: For regular decimal numbers, the calculator will truncate the number to display as many significant digits as can fit inside the display box; no more, no less.
- Adaptive large number truncation: Displays very large numbers and very small decimal numbers in the form of scientific notation with the correct specific number of significant digits to properly fit the display box.
- Self-operation: When you click your chosen operation, you can then press the `=` button instead of a new number to have the number perform the chosen operation on itself:
  - `12` -> `+` -> `=` == `12 + 12` == 24
  - `12` -> `-` -> `=` == `12 - 12` == 0
  - `12` -> `x` -> `=` == `12 * 12` == 144
  - `12` -> `/` -> `=` == `12 / 12` == 1
- Repeat operation: Keep pressing the `=` button to perform the last performed operation on the result (e.g. `10 + 5 = 15` -> `=` == `15 + 5` == `20`)
- Fully integrated +/- button: Switches symbols at all any step of the operation; deals with special cases such as very long and short numbers, long decimal numbers, results of operations, and starting new numbers.
- Fully integrated delete button: Deletes one digit of display number at a time, starting at the last digit; deals with special cases such as: negative numbers, does nothing to results of operations, does nothing to `0` or `-0`.
- Other usability features:
  - Display full operation on top of current number
  - `-0` is treated as `0`
  - When output is `-0` or `0` and new number is selected, the 0 is replaced (e.g. `-0` -> `5` == `-5` != `-05`)
  - Throws `ERROR` when dividing by 0, or when number becomes larger than JS number scope
  - After the result of an operation, click any number or the `+/-` button to start a new number/operation instead of having to press `CLEAR` first
## Website
To preview the calculator, please feel free to head to the github pages website: https://jacksloaner.github.io/Js-Calculator/
