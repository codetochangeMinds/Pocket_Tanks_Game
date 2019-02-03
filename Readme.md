## Problem Statement 
The project aims us to build a game similar to available online on google play store https://play.google.com/store/apps/details?id=com.blitwise.ptankshd&hl=en_IN.

## Abstract of Development Phase
In this project we used the HTML, CSS and canvas for the front end and for the backend part we used the nodejs as the framework. At the end of this project we understood the core logic after a web application. We also integrated a chat module and firebase for the authentication part.

## Instruction
1. npm init
2. npm install --save express
3. npm install --save socket.io
4. node app.js
5. open *Mozilla Firefox* and type 'localhost:5000'
6. Server will be setup and other user can join that server by setting **ip of server machine:5000**
7. In order to play game user had to first signup if he/she had not registered earlier.
8. In order to logout click on **logout** button.
9. User can choose either single player or multiplayer mode.
10. At end of game winner will be decided on basis of final score.


## Assumption
1. Smart CPU is assuming both tanks are at same y-position and thus applying projectile equation on basis of distance between both the tanks.
2. There are only 4 moves available.
3. 10-shots are available for each player.
4. There are 4 weapons with different radii causing diffrent impact on colliding with tank as well as terrain.
5. Velocity is varying from 0-150.
6. Angle is 40-140 degrees. 


## Bug
1. As terrain break down the tank continuously goes down and goes finally out of canvas if so many shots are there.
2. Sometimes no terrain is visible on start so,we have to refresh the page.





