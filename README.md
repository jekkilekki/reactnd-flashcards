# Korean By Heart Flashcards
`(React Native Mobile App)`

**Korean By Heart** is a [React Native](https://facebook.github.io/react-native/) mobile app built in [Expo](https://expo.io/). It utilizes:

1. [Redux](https://redux.js.org/) to manage application state 
2. [React Navigation](https://reactnavigation.org/) for Switch, Stacked, Tabbed, and Modal Navigation
3. [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage#docsNav) for maintaining app changes
4. [Expo Notifications](https://docs.expo.io/versions/latest/sdk/notifications) to set reminders to use the app daily
5. [Native Base](https://nativebase.io/) for styled components

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).<br />It was built as part of Udacity's [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) program.

## Table of Contents

* [Overview](#overview)
  * [iOS vs Android](#ios-vs-android)
* [Installation](#installation)
* [App Functionality](#writing-and-running-tests)
  * [Deck List](#deck-list)
  * [Card List](#card-list)
  * [Add Deck](#add-deck)
  * [Add Cards to Deck](#add-cards-to-deck)
  * [Single Deck View](#single-deck-view)
  * [Single Card View](#single-card-view)
  * [Studying and Quizzing](#studying-and-quizzing)
  * [Quiz Results](#quiz-results)
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

### Card List

### Add Deck

### Add Cards To Deck

### Single Deck View

### Single Card View

### Studying and Quizzing

### Quiz Results

### Login and Signup

**Would You Rather?** is a React + Redux app that takes full advantage of the [Redux store](https://redux.js.org/basics/store) to maintain React's state throughout the application. 

App updates are triggered by dispatching action creators to reducers which return updated  state information to the app. Components read the necessary state from the Redux store and there are no direct API calls in the components' lifecycle methods. State-based props are mapped from the store rather than stored as component state.

### Folder Structure

After cloning the GitHub repository, the project directory includes the following folders:

```
reactnd-would-you-rather/
  node_modules/
  public/
  src/
    actions/
    components/
    middleware/
    reducers/
    utils/
```

#### `/src/actions`

From the [Redux.js](https://redux.js.org/basics/actions) site:

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.<br><br>Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants.

This app's actions are contained within the following files and are self-explanatory:

- `authedUser.js`
  - `SET_AUTHED_USER`
- `questions.js`
  - `RECEIVE_QUESTIONS` (from the "fake" database `_DATA.js`)
  - `ANSWER_QUESTION`
  - `ADD_QUESTION`
  - `DELETE_QUESTION` (work in progress)
- `shared.js` (handles loading the initial app data)
- `users.js`
  - `RECEIVE_USERS` (from the "fake" database)

#### `/src/components`

All React components and component-specific CSS reside within the components folder. 

#### `/src/middleware`

From the [Redux.js](https://redux.js.org/advanced/middleware) site:

> Middleware is some code you can put between the framework receiving a request, and the framework generating a response.

The middleware applied in this app includes `thunk` and a `logger` which "logs" information on the state of the application to the browser console after Redux actions are dispatched.

##### `thunk`

From [Redux-thunk](https://github.com/reduxjs/redux-thunk) on GitHub:

> Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

Applying `thunk` as a middleware in this app allows us to call `setTimeout()` on our dispatched actions in order to emulate the delayed response from a database controlled by a server. 

Because this app uses a "fake" database, all the data is immediately available and application updates such as adding new questions would happen instantaneously if we didn't use `thunk`. 

#### `/src/reducers`

From the [Redux.js](https://redux.js.org/basics/reducers) site:

> Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.<br><br>In Redux, all the application state is stored as a single object. 

There are two major "slices" of state that need to be maintained and updated by our reducers. These are the `users` and `questions` slices of state (`authedUser` is also maintained here but it has much less "work" to do as it only handles logging in or logging out).

The following files contain the app's reducers which are combined in `index.js` with Redux's `combineReducers()` function:

- `authedUser.js` (sets or resets the authenticated user id)
- `index.js` (combines our reducers - including the React Redux Loading Bar)
- `questions.js`
- `users.js`

Each of last two files, `questions.js` and `users.js` contain specific actions from their relevant `/actions` files (see above). 

But `users.js` additionally includes the actions `ANSWER_QUESTION` and `ADD_QUESTION` from `/actions/questions.js` because `ANSWER_QUESTION` and `ADD_QUESTION` modify not only the `questions` slice of state, but also the `users` slice of state.

#### `/src/utils`

The following files are contained within the `/utils` folder:

- `_DATA.js` (our "fake" database and default API calls)
- `api.js` (API calls to get our initial data and save future data)
- `helpers.js` (to properly format Questions and Date timestamps)

## Future Development

Although much of the following list has been mentioned or hinted at above, here it is again in full and brief:

- Data
  - Utilize dictionary site API
  - Utilize WP REST API for Grammar
- Personalization
  - Utilize Firebase database for user login and personalized data
  - Apply third-party login options (Facebook, Twitter, etc)
  - Create personalized profile options & settings (Drawer Nav)
- Device
  - Allow Camera and Gallery access
  - Use local storage (or Firebase DB) for images

### Contributing

The best way to Contribute to this app is to open an [Issue](https://github.com/jekkilekki/reactnd-flashcards/issues) on GitHub.

Pull Requests are __welcome__ especially if they help fix an Issue or solve a Problem listed in the [Future Development](#future-development) section. I want to continue development on this project and make it a viable flashcard app for learning Korean. But I may not be very responsive due to other life obligations.

## License

The __Korean By Heart__ app is licensed under the [MIT open source license](https://opensource.org/licenses/MIT) and built with React Native, Expo, and Redux and uses the following third-party resources and `node` modules:

- [Create React Native App]()
- [Expo]()
- [React Navigation]()
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)
- [Native Base]()

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
