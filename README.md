# Split.me

Split expenses like a pro through a Splitwise wrapper that leverages a spreadsheet-like interface to bulk-upload entries without having to itemize.

_A GIF here is a WIP. :D_

## Setup

* Run the backend:
    * `cd be/`
    * `npm i`: Install dependencies
    * `node index.js`
* Run the frontend:
    * `cd fe/`
    * `npm i`: Install dependencies
    * `npm start`

## Motivation

**tl;dr Gaps in Splitwise that Split.me addresses:**

* Itemization (only on web) doesn't notify members of individual splits
* If you don't itemize, uploading multiple items involves too many clicks, taps, and mouse movements

Splitwise offers a feature-rich way to split bills and is probably the most if not the only go-to platform for college students. Ever since my days as a master's student in the US sharing an apartment with some buddies, I've grown to use Splitwise almost every single day.

Knee-deep into the platform, I noticed that the interface isn't conducive to uploading expenses in bulk. Sure, there's the itemization feature (on web) that gives you a nice spreadsheet-like interface but then ... I don't want to itemize!

My buddies and I can get sloppy at times and incorrectly split some expenses. Here are some situations:

* Anandu doesn't consume milk but he has been added to it
* Faizan has never had paneer in the last 3 months but I bulk-dumped some bills and added him to paneer over 5 times

Yes! We can get careless. Clearly, that's the disadvantage of itemizing stuff -- you don't get notified about your contribution to individual items on a bill and are left at the mercy of whoever paid the bill. And if you don't itemize, the platform (on web and app) follows a conventional dialog-after-dialog pattern for uploading entries which means that, for a long list of items, you're re-selecting parameters like the date every single time. More clicks, more tabs, more mouse movements = disaster!

## TODOs

- [ ] Show instantaneous total
- [x] Scroll to bottom on Alt + E
- [ ] Deploy for quick access
- [ ] Field for API key input
- [ ] Include a GIF in the README
