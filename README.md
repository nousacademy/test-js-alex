### Setup

* Install Node 6.1
* Clone repo, cd into directory
* `npm install`

### Run

`npm run start`

### What you need to do

Check out `src/state/actions.js` and add code to fulfill the commented instructions.

How I got my result (first time using React):

Kept breaking when I referenced the foreach loop, kept getting a dispatch error
When I referenced the for loop the error message would say that I had to revert to the previous state
But I noticed that it did update when I didnt refernece it at all 
So I just plugged in "mergeYRandTitle" to be returned and it worked
Also made use of the moment library and used lodash
