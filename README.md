# Korean By Heart Flashcards
`(React Native Mobile App)`

__Korean By Heart__ is a [React Native](https://facebook.github.io/react-native/) mobile app built in [Expo](https://expo.io/). It utilizes:

1. [Redux](https://redux.js.org/) to manage application state 
2. [React Navigation](https://reactnavigation.org/) for Switch, Stacked, Tabbed, and Modal Navigation
3. [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage#docsNav) for maintaining app changes
4. [Expo Notifications](https://docs.expo.io/versions/latest/sdk/notifications) to set reminders to use the app daily
5. [Native Base](https://nativebase.io/) for styled components

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).<br />It was built as part of Udacity's [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) program.

## Table of Contents

* [Overview](#overview)
  * [iOS vs Android (Devices Tested)](#ios-vs-android)
* [Installation](#installation)
* [App Functionality](#writing-and-running-tests)
  * [Deck List](#deck-list)
    * [Add Deck](#add-deck)
    * [Single Deck View](#single-deck-view)
    * [Add Cards to Deck](#add-cards-to-deck)
    * [Studying and Quizzing](#studying-and-quizzing)
    * [Quiz Results](#quiz-results)
  * [Card List](#card-list)
    * [Single Card View](#single-card-view)
  * [Login and Signup](#login-and-signup)
* [Architecture](#architecture)
  * [Data Structure](#data-structure)
  * [Folder Structure](#folder-structure)
* [Future Development](#future-development)
  * [Upcoming Features](#upcoming-features)
  * [Contributing](#contributing)
* [License](#license)
* [Troubleshooting](#troubleshooting)
* [Changelog](#changelog)

## Overview

The primary purpose of this app is to provide a well-designed, comprehensive dictionary / flashcard app for learners of Korean. (_i.e. I built it for myself_) Therefore, some of the important features I needed in this app included:

#### A comprehensive data set 

The data set in use is a list of nearly __6,000 Korean words__ I have stored in a Google Sheet spreadsheet with multiple pieces of meta-data (including the English translation, part of speech, origin, and so on). The list was exported as `.csv` and converted to a JSON object. Future iterations of the app will include:

1. (possibly) Access to a dictionary API to fetch data directly from a "real" dictionary rather than maintaining a hard copy
2. The ability to add pictures and example sentences - or other hints - to each flashcard

__** Note:__ This was one of the biggest challenges in the app because there was often __too much__ data being loaded at once in the `CardList` view. Therefore, I had to learn how to implement pagination and reloading of data at the end of my FlatList component.

#### Pictures

An app without pictures is boring. Therefore, each deck has its own uniquely identifying image. Future iterations of the app will include:

1. Handling of local storage for pictures
2. Access to the phone's camera and gallery for adding pictures
3. Ability to add pictures (ideally at a reduced resolution) to every card

#### Personalized data

Currently, whatever changes to Decks and Cards that users make are saved (and retrieved) in AsyncStorage.

However, I intend to make this app publicly available after completion and also wanted a way to allow users to sign up and login to access their data from cloud storage. Therefore, I've incorporated the beginnings of [Firebase](https://firebase.google.com/). With the proper `_config` file (_not included in this repo_), users would be able to sign up and login to access the Firebase database I've set up. Future iterations of the app will include:

1. Profile information (possibly in a Drawer navigator, accessible by clicking the User icon in the upper-right corner of the app header)
2. A personalized photo - replacing the User icon in the header
3. Saving and retrieving data from Firebase (as opposed to - or in addition to? - AsyncStorage)
4. Ability to login with additional services like Facebook, Twitter, and so on

### iOS vs Android

#### Devices tested

* __iOS emulator__ (Xcode 9 + iOS 11.1)
* __Android emulator__ (Android Studio + Nexus 5)
* __LG G6__ (real device, network access)
* (not yet tested, but accessible) __iPad 2__

Through the development of this app, I noticed slight differences in the way the Xcode iOS emulator and Android Studio's emulator handle the code. Notably (upcoming fixes):

1. Swiper Cards (via [`react-native-deck-swiper`](https://www.npmjs.com/package/react-native-deck-swiper)) are not rendered on Android (emulator, nor device) - I'm working to solve this issue now, but may need to resort to a different `<Component />`
2. Various sizing, placement, and color issues are not consistent across devices. For example, the login User icon in the upper-right of the header looks perfect on iOS, but has the wrong vertical padding on Android

__** Note:__ After completing the basic functionality of the app, I'll return to fix minor styling details. 

## Installation

The easiest way to install and run this app is on an actual device (rather than an emulator - which requires more setup). 

At its most basic, clone this directory to your computer with: 

```
git clone https://github.com/jekkilekki/reactnd-flashcards
```

Then, navigate to the newly created directory in your Terminal and run:

```
npm install
npm start
```

You may also replace `npm` with `yarn` if you have [Yarn](https://yarnpkg.com/en/) installed.

Next, install the [Expo app](https://expo.io/) on your Android or iOS device.<br />
Finally, open the Expo app and scan the QR code from your Terminal (after running `npm start`).

More detailed instructions can be found in the official [Create React Native App](https://github.com/react-community/create-react-native-app/blob/master/README.md#quick-overview) GitHub repository or the [Expo Installation](https://docs.expo.io/versions/latest/introduction/installation) documentation.

## App Functionality

### Deck List

![decklist](https://user-images.githubusercontent.com/6644259/46516115-c890f380-c8a2-11e8-9da0-3fc16d931427.png)

The DeckList screen is the ❤ of the application. This is the first screen that appears after loading the app. From here, users have access to:

1. Pre-installed and sorted flashcard Decks
2. AddDeck functionality (via the Floating Action Button in the bottom-right)
3. CardsList and About screens from the Tabbed navigation
4. Login via the User icon in the Header's right corner
5. [Upcoming]: Calendar that displays on which days the user studied
6. [iOS]: A Permissions dialog appears to request permission to set LocalNotifications for the app. Android does not have this popup - permissions seems to be granted inherently

#### Future Development

- Add Deck sliding ability (slide left to Delete, etc)
- Add Deck editing and Deletion Redux functionality
- Possibly add an additional (earlier) Home view - with access to different Series or Books of Flashcard Decks

### Add Deck

![adddeck](https://user-images.githubusercontent.com/6644259/46516111-c7f85d00-c8a2-11e8-9070-fa8e3a3b72f4.png)

The AddDeck view sets a default image to be used as the New Deck image. It additionally requests a Deck Name and Deck Description.

#### Future Development

- Disallow submission of the Form without at least the Deck Image and Deck Name
- Set a default Deck Image when rendering Decks on the DeckList view as a missing `uri` value produces an error
- Allow access to the device's Camera or Gallery to select an image
- Allow images to be stored within the app's data / folders and accessed from there - rather than just using Internet images (which may use data)
- Possibly ask for additional Meta info

### Single Deck View

![decksingle](https://user-images.githubusercontent.com/6644259/46516116-c890f380-c8a2-11e8-9811-1c039cc24f93.png)

The Single Deck view includes multiple parts:

1. Add Cards to Deck with the Floating Action Button in the upper-right corner
2. The full list of Flashcards is divided into subsets of 30 cards each to make studying and quizzing them much easier
3. The full list of Flashcards (in this Deck) is available to view (and search) in the second tab
4. The two tabs, `Sets` and `Quiz` have similar functionality - but pass an argument to the `Quiz.js` component to let it know whether we want the score recorded or not (not yet fully implemented)
5. The six boxes above the tabs are intended to (one day) be used as different levels of a Spaced Repetition System (some details about this in the About view). Basically:
  - If a user has "Mastered" a card in the Quiz - it advances a box - and after passing through all the boxes, is removed from the Deck
  - If a user "Reviews" the card in the Quiz, it either remains in the current box, or moves back one box
  - If the card is "New" and the user doesn't know it, it moves all the way back to the first box

#### Future Development

- Fully implement the Leitner SRS box model
- Enable users to "set" a subset number to divide the CardList into groups (currently set to 30) 
  - make this also available on individual decks

### Add Cards To Deck

![addcardstodeck](https://user-images.githubusercontent.com/6644259/46516110-c75fc680-c8a2-11e8-8bd4-2abbccdb91af.png)

The AddCardsToDeck view displays like the Single Deck view, but includes ALL Card data (and not just that specific to its own Deck). This allows users to click a flashcard ListItem to "add" it to their Deck. A notification Alert with the card's Korean word pops up after successfully adding a card to the Deck. Users may also Search for cards to add. Clicking `Close` returns to the Single Deck view.

#### Future Development

- Rather than displaying an arrow on every ListItem, display a circle
  - Empty circle = can be added
  - Green checkmark circle = already in the Deck 
  - These should update dynamically as cards are added to the Deck
- When adding cards to the Deck, allow users to select multiple cards at once (like with an empty circle or radio button as described above) - and add them all at once.
  - This functionality should behave in a similar way as KakaoTalk's adding multiple friends to a chat

### Studying and Quizzing

![quiz](https://user-images.githubusercontent.com/6644259/46516118-c9298a00-c8a2-11e8-9b1e-e53cbb7d6f3c.png)

The Studying/Quizzing view is passed a prop telling the app which type of "Session" the user has initiated. In the future, this will be used to keep track of Quiz scores and Study sessions in different ways. The view includes:

- A (flippable) Card at the top
  - `Hint` currently just jiggles the Card - but in the future, it should reveal the FIRST letter of the English translation
  - `Reverse` flips the card over to see the translation - and in the future, doing so should disable the "I know it" green button in the footer
- Three "swipe" options at the bottom - from left to right:
  - `I don't know it` (also can Swipe Left on the card) - adds 0 points to the score and is considered "New"
  - `Mark for review` (also Swipe Top) - adds 0.5 points to the score and may be used if a Hint or Reverse button is pressed - this is considered "Learning"
  - `I know it` (also Swipe Right) - adds 1 point to the score and is considered "Mastered" - this button should be disabled if `Hint` or `Reverse` is pressed
  - Swipe Bottom on the card (future implemenation) should be used to remove the card from the Deck
  
#### Future Development

- Disable `I know it` if `Hint` or `Reverse` are pressed
- Reveal the FIRST letter of the English translation if `Hint` is pressed - also possibly reveal example sentences one-by-one as `Hint` is repeatedly pressed
- Cards that are `Marked for Review` should be added to a new array that is iterated over after the initial Card array is completed - so they can be "reviewed" one final time before revealing the score (which will be adjusted after this functionality is implemented)
- Possibly include a line of dots (or small icons) at the top indicating which card the using is viewing and/or reviewing

### Quiz Results

![quizresults](https://user-images.githubusercontent.com/6644259/46516119-c9298a00-c8a2-11e8-826a-bd5d3a93144f.png)

The Quiz Results page is broken down into multiple "stats" areas:

1. Total percentage correct ("Learning" cards are currently assigned 1/2 the point value of "Mastered" cards) - also represented by a Circle Graph
2. A breakdown of the score is indicated under the Total percent, and the point values of each button are shown under their respective graphs
3. The number of cards swiped Left (`I don't know it`), Top (`Mark for review`), and Right (`I know it`) are indicated in the second stat bar
4. The Time elapsed for the Study/Quizzing section is indicated in the third line - this currently displays in milliseconds but will be adjusted to display a "human readable" time
5. The TOTAL Time for Deck quizzing sessions (will be) displayed in the final stat box. Currently, each study session's elasped time is incremented and saved to AsyncStorage as `studyTime` in a Deck's JS object. This value needs to be retrieved from AsyncStorage and converted to a "human readable" String here
6. The option to "Restart" the session or return "Back to Deck" are presented in buttons at the bottom of the screen

#### Future Development

- Make the Time strings into "human readable" times (including "Days", etc - similar to the Audible app)
- Retrieve the total `studyTime` value from AsynStorage and display it here

### Card List

![cardlist](https://user-images.githubusercontent.com/6644259/46516112-c7f85d00-c8a2-11e8-8ac4-56e603e5227f.png)
![cardlist-search](https://user-images.githubusercontent.com/6644259/46516113-c7f85d00-c8a2-11e8-976d-1e997b169f86.png)

The CardList is sorted in Korean alphabetical order. One of the biggest struggles with this view was loading too many ListItems at once. Therefore, I had to develop a system of pagination and reloading as the end of the FlatList is reached. Users also are able to:

1. Click a ListItem to view the Single Card - and all its meta data (including example sentences using the vocabulary word where available)
2. Search for a Card [partially broken] - this functionality (due to the pagination feature) also loads the "next" page on each setState() call. This will be fixed in upcoming versions of the app
3. Add a New Card (Floating Action Button)

#### Future Development

- Cause the Search functionality to `disallow` reloading the paginated card data
- Add a FILTER system to allow
  - Sorting by alphabetical English order
  - Listing only certain Parts of Speech (Nouns, Verbs, etc)
  - ListItems appearing in a certain Deck

### Single Card View

![cardsingle](https://user-images.githubusercontent.com/6644259/46516114-c890f380-c8a2-11e8-96df-6d0222a52360.png)

The Single Card View displays a flashcard in the same manner as the Quiz component - but including the English translation as well as any example sentences below the card (this image does not show this). At the bottom of the screen, the Floating Action Button indicates that users should be able to "Edit" the current card - and as expected, pressing this button turns all the `<Text />` components into `<Input />` components with their respective current values. However, this functionality is not yet fully implemented as it doesn't "Save" any changes made to the card.

#### Future Development

- Create Redux actions for `Edit` and `Delete` - both in individual Cards, and individual Decks
- These Redux `Edit` and `Delete` actions should also be present and available from the DeckList and CardList views (via swiping on a ListItem)
- After Firebase authentication is implemented, the CRUD operations for Cards or Decks should be limited to logged in users

### Login and Signup

![login](https://user-images.githubusercontent.com/6644259/46516117-c890f380-c8a2-11e8-912f-50fa51d1a256.png)
![signup](https://user-images.githubusercontent.com/6644259/46516120-c9298a00-c8a2-11e8-8d4d-2688420c1ec2.png)

Under the current implementation of the Login and Signup pages, a user IS ABLE to both `Signup` to Firebase, AND `Login` (if the `utils/_config.js` file is present and includes appropriate Firebase keys.

#### Future Development

- Possibly integrate the two views in a better (single screen) manner
- Include the `<KeyboardAvoidingView>` component to be sure the device keyboard doesn't cover the Input components - this also needs to be implemented in CardList's Search field

## Architecture

__Korean By Heart__ is a [React Native](https://facebook.github.io/react-native/) mobile app built in [Expo](https://expo.io/) which utilizes [Redux](https://redux.js.org/) to manage application state.

App updates are triggered by dispatching action creators to Redux reducers which return updated state information to the app. Components read the necessary state from the Redux store and there are no direct API calls in the components' lifecycle methods. State-based props are mapped from the store rather than stored as component state.

### Folder Structure

After cloning the GitHub repository, the project directory includes the following folders:

```
reactnd-flashcards/
  .expo/
  node_modules/
  assets/
  actions/
  components/
    shared/
    views/
  middleware/
  reducers/
  utils/
```

#### Future development:

I have plans to add Grammar Lists, Vocabulary from various books, and possibly even Phrase Lists in the future. As this app grows in size and complexity, I may need to break down the `components/` folder into more managable pieces:

```
components/
  auth/
  cards/
  decks/
  quiz/
  appScreens/
```

#### `/src/actions`

From the [Redux.js](https://redux.js.org/basics/actions) site:

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.<br><br>Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants.

This app's actions are contained within the following files and are self-explanatory:

- `shared.js` (handles loading the initial app data)
- `authedUser.js`
  - `SET_AUTHED_USER` (not yet implemented - to be incorporated with Firebase)
- `cards.js`
  - `SET_CARDS` (from the "fake" database `_DATA.js`)
  - `NEW_CARD`
  - `EDIT_CARD` (work in progress)
  - `DELETE_CARD` (work in progress)
- `decks.js`
  - `SET_DECKS` (called every time an action occurs in the decks - saves to AsyncStorage)
  - `NEW_DECK`
  - `ADD_CARD_TO_DECK`
  - `RECORD_SESSION` (records all stats from a study or quizzing session)
  - `STUDY_TIME` (increments total study time for the deck)
  - `EDIT_DECK` (work in progress)
  - `DELETE_DECK` (work in progress)

#### `/src/components`

All React Native components and component-specific CSS reside within the components folder. 

#### `/src/middleware`

From the [Redux.js](https://redux.js.org/advanced/middleware) site:

> Middleware is some code you can put between the framework receiving a request, and the framework generating a response.

The middleware applied in this app includes `thunk` and a `logger` which "logs" information on the state of the application to the browser console after Redux actions are dispatched.

##### `thunk`

From [Redux-thunk](https://github.com/reduxjs/redux-thunk) on GitHub:

> Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

Applying `thunk` as a middleware in this app allows us to call asynchronous actions and await their completion before dispatching additional actions (such as `RECORD_SESSION` followed by `STUDY_TIME` and then `SET_DECKS` to save the newly updated state to AsyncStorage). 

#### `/src/reducers`

From the [Redux.js](https://redux.js.org/basics/reducers) site:

> Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.<br><br>In Redux, all the application state is stored as a single object. 

There are two major "slices" of state that need to be maintained and updated by our reducers. These are the `cards` and `decks` slices of state (`authedUser` (not yet fully implemented) is also maintained here but it has much less "work" to do as it only handles logging in or logging out).

The following files contain the app's reducers which are combined in `index.js` with Redux's `combineReducers()` function:

- `index.js` (combines our reducers)
- `authedUser.js` (not yet fully implemented)
- `decks.js`
- `cards.js`

Each of last two files, `decks.js` and `cards.js` contain specific actions from their relevant `/actions` files (see above). 

#### `/src/utils`

The following files are contained within the `/utils` folder:

- `_config.js` (excluded from the repo - would contain Firebase authentication data and keys)
- `_DATA.js` (our "fake" database and default API calls)
- `api.js` (handles AsyncStorage saving and retrieval)
- `colors.js` (includes ALL Google Material Design color codes mapped to exported variable names)
- `helpers.js` (handles generating UIDs, spliting decks into subsets, parts of speech design, and Local Notifications)

## Future Development

Although much of the following list has been mentioned or hinted at above, here it is again in full and brief:

- Data
  - Utilize dictionary site API
  - Utilize WP REST API for Grammar
  - Connect to the WP REST API to retrieve these lists
- Personalization
  - Utilize Firebase database for user login and personalized data
  - Apply third-party login options (Facebook, Twitter, etc)
  - Create personalized profile options & settings (Drawer Nav)
- Device
  - Allow Camera and Gallery access
  - Use local storage (or Firebase DB) for images
- Upgrade
  - Include Grammar and Phrase Lists
  - Separate decks into Books or Series (separate "Home" view)
  - Restructure Components folders

### Contributing

The best way to Contribute to this app is to open an [Issue](https://github.com/jekkilekki/reactnd-flashcards/issues) on GitHub.

Pull Requests are __welcome__ especially if they help fix an Issue or solve a Problem listed in the [Future Development](#future-development) section. I want to continue development on this project and make it a viable flashcard app for learning Korean. But I may not be very responsive due to other life obligations.

## License

The __Korean By Heart__ app is licensed under the [MIT open source license](https://opensource.org/licenses/MIT) and built with React Native, Expo, and Redux and uses the following third-party resources and `node` modules:

- [Create React Native App](https://github.com/react-community/create-react-native-app)
- [Expo](https://expo.io/)
- [Firebase](https://firebase.google.com/) | [(NPM)](https://www.npmjs.com/package/firebase)
- [Native Base](https://docs.nativebase.io/) | [(NPM)](https://www.npmjs.com/package/native-base)
- [React Native Calendar Strip](https://www.npmjs.com/package/react-native-calendar-strip)
- [React Native Card Flip](https://www.npmjs.com/package/react-native-card-flip)
- [React Native Deck Swiper](https://www.npmjs.com/package/react-native-deck-swiper)
- [React Native Hyperlink](https://www.npmjs.com/package/react-native-hyperlink)
- [React Native SVG Charts](https://www.npmjs.com/package/react-native-svg-charts)
- [React Navigation](https://reactnavigation.org/) | [(NPM)](https://www.npmjs.com/package/react-navigation)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)

## Troubleshooting

### Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.

## Changelog

### `1.0.0` - 2018.10.05 
 - Initial release
