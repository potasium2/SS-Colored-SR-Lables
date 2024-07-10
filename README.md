## How to install
#### Open the Scoresaber-Colored-Labels.js file and paste the code into tampermonkey, this should work for greasemonkey too but I never tested so don't take my word on it.

## Version History
#### 1.1:
- Fixed part of code that took over a second to update the actual color of the diff label
- Fixed the misspelling of "label" in code cause it was bugging me
- Replaced all the For and If trees with a simple One-Call function
  
#### 1.2:
- Added actuators that can enable features more easily
- Added PP gradient and alternate leaderboard PP colors
- Added a log_13 Function to try and simplify star ratings a bit
  #### 1.2.1:
  - Changed the log_13 Curve to an exponetial Curve
  #### 1.2.2:
  - Changed the PP Curve so 800+ Scores don't break the recolor
  - Changed the default 7 Star color to a darker yellow to make text more legible

## Potential Future Plans
- Make all non-ranked maps have their own singular color so they don't stand out
- Put the difficulty label else where so its easier to tell which map a score is set on
- ~~Add simple actuators to enable certain things within code~~
- ~~Add color gradient to PP Values as well (Maybe)~~
- Give all Spectral ranked maps a special Rainbow diff label
