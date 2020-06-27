---
type: "article"
path: "/how-to-make-an-app-with-react-native-api-integration-and-mobx"
title: "How to Make an App With React Native III: API Integration and Mobx"
metaTitle: ""
metaDescription: "In part three of the How to Make an App With React Native series we'll cover signing up with Pixabay to get your API key, requesting data from the API, storing that data in a reactive Mobx store and rendering images from the API data."
date: "2020-05-04"
draft: false
twitterImage: ""
---

This is part three of a series on learning how to build a stock photo browsing app in React Native. If you haven't read the previous 2 articles in this series I suggest you go through those first. [Here's the post on getting started with React Native](https://jasonmerino.me/articles/how-to-make-an-app-with-react-native-getting-started).

So far we've been able to create a new React Native project and add navigation to the app. This article is where we dive into some features that are a little more interesting: API integration and data management with [Mobx](https://mobx.js.org/). Hopefully, through this series of articles, you can see how simple it is to create an app with React Native and are inspired to create your own.

Let's dive into what's next!

## Register as a Pixabay user

The first thing we're going to do is to register as a Pixabay user so that we can get an API key which will allow us to access the Pixabay API. If you aren't familiar with API security, there are many different ways to secure your API. An API key is probably the most simple measure an API creator can take to secure their API and is used for both rate-limiting (only allowing your API key to make a certain amount of requests in a set time) or revoking API access altogether. If you aren't familiar with APIs in general, you can get a basic overview by watching this [video explaining what an API is](https://www.youtube.com/watch?time_continue=191&v=s7wmiS2mSXY&feature=emb_logo).

To register as a Pixabay user visit the [Pixabay API documentation page](https://pixabay.com/api/docs/) and click on the Join link in the header. After going through the registration flow go back to the [API documentation page](https://pixabay.com/api/docs/), scroll down to the "Search Images" heading and you should see your API key populated on the page with a green background. That section of the documentation page should look something like this.

![pixabay API key sample screenshot](../images/pixabay-api-key-sample.png)

![oprah you get an API meme](../images/oprah-you-get-an-api-meme.png)

## Adding your API key to your app's config

Now that we have our API key we need to store it somewhere in our application. We could hard code it into our URL string when we make our request to the API but that's not a great practice. We shouldn't keep keys of any type in our application code because it makes handling different environments difficult and because once some code is stored in Git it's there for as long as the repo exists. For more information about this best practice [check out this article about keeping your configuration outside of your app's codebase](https://12factor.net/config).

### Installing the react-native-config module

To store your API key we'll be using the [react-native-config](https://www.npmjs.com/package/react-native-config) module. The installation steps are simple for this module. To install the module to your project run this command in your terminal.

```bash
$ npm install react-native-config
```

That will take care of adding the module to your project and updating your package.json file to include react-native-config every time you install Node modules. Next, to get it added to the Xcode project we need to install the cocoapods for this dependency. Run these commands in your terminal to take care of that step.

```bash
$ cd ios
$ pod install
$ cd ..
```

### Creating your configuration file

After you've successfully installed the react-native-config module you will need to rebuild the app for the simulator to pick up those changes. But first, let's create the file that holds your app's configuration.

In the root directory of your project create a file called `.env`. This hidden file (denoted by the . at the beginning of the file name) stores simple key-value pairs you will use in the app. In that `.env` file that you just created insert this text, making sure to replace `YOUR_API_KEY_HERE` with your actual API key.

```
PIXABAY_API_KEY=YOUR_API_KEY_HERE
```

The final step in adding this environment config file is to add it to your `.gitignore` file. Open up that file and add this entry on a new line at the end of the file.

```
.env
```

Doing this will ensure that your API key does not make it into source control and will not be available for anyone to deviously access if they gain access to your hosted git repo. That being said, this is not a perfect system. Your key will still ship with your release build of the app, but this is at least one less place attackers can steal your secrets. Here are some [words of wisdom from this article on Hackernoon about securing mobile APIs](https://hackernoon.com/mobile-api-security-techniques-682a5da4fe10).

"Regardless of your efforts, it is not a matter of if a secret will be stolen, but if the time and effort to steal it is worth the return. Make it as difficult as you can afford."

So basically...

![one does not simply secure API keys in a mobile app meme](../images/one-does-not-simply-secure-api-keys-in-a-mobile-app-meme.png)

Okay. Moving on!

## Storing data in your app

Great! Now we're ready to call the API and get some data about these stock photos, but where are we going to keep this information? We could request the data and store it in the local state of the requesting component but that does not scale because you will end up re-requesting that stock photo data from the API every time that component mounts and that data will be lost whenever that component unmounts.

This is where Mobx comes in. Mobx is described as "Simple, scalable state management" and it does that very well. Essentially, the concept of Mobx is that you will create a store for the app's data. Inside that store will be data that is marked as observable, which means that it can be consumed by reactive components. To react to changes in the data in the store you will need to mark your component as an observer of the observable data. With these few, simple steps, when your data in the store change your components will re-render a new UI backed by the new data.

### Installing Mobx in your project

To install Mobx in your project run this command in your terminal. We are going to need both the `mobx` module as well as the `mobx-react` module for React specific bindings. All you need to do to install these modules is to run this command in your terminal.

```bash
$ npm install mobx mobx-react
```

### Setting up the application to handle Mobx data

After this, we will want to set up the application component hierarchy to support using Mobx in a reactive way. To do this we'll want to import the batching module and the Provider component into our App.tsx. You can read more about [the importance of the batching module when using Mobx with React hooks](https://github.com/mobxjs/mobx-react-lite#observer-batching) here.

At the very top of your App.tsx file import the batching module like this.

```typescript
import "mobx-react-lite/batchingForReactNative";
```

Then import the Provider component from the `mobx-react` module and wrap the NavigationContainer component inside the Provider component. After doing this your code should look something like this.

```typescript
// App.tsx

import "mobx-react-lite/batchingForReactNative";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./screens/home.screen";
import { Provider } from "mobx-react";

const AppStack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            options={{
              header: () => null,
            }}
            name="Home"
            component={Home}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
```

### Creating a Mobx store

Now that we have the needed Mobx libraries installed and the React Native application set up to consume data from a Mobx store, the next step is to create the store itself so we can stash response data from the Pixabay API.

Creating a Mobx store is very simple. It is simply a TypeScript module with a couple of exported functions and observable data. Now, let's create the photo store by creating a new folder named `stores` in the project's root directory and creating a file called `photo.store.ts` inside it.

## Requesting data from the Pixabay API

In this file, we'll be creating a `photos` variable which will contain an object of all the searches for photos that we'll be doing as well as a function called `searchPhotos` which will execute the search for the photos data and store it in the `photos` variable. This is also the place where we'll finally be pulling our API key from the config we set up in the `.env` file earlier. Here's what the `photo.store.ts` file should look like.

```typescript
// stores/photo.store.ts

import { observable } from "mobx";
import Config from "react-native-config";
import { IPhoto } from "../types/photos.types";

const BASE_URL = "https://pixabay.com/api";

export const photos = observable<{ [keyword: string]: IPhoto[] }>({
  default: [],
});

export const searchPhotos = async (keyword?: string) => {
  const url = `${BASE_URL}/?key=${Config.PIXABAY_API_KEY}&safesearch=true${
    keyword ? `&q=${keyword}` : ""
  }`;

  const response = await fetch(url);

  const data = await response.json();

  photos[keyword || "default"] = data.hits;
};
```

You'll notice that at the top of the file we import observable and later on wrap the value for the `photos` variable with it. Using Mobx this way will allow components that are using the `photos` variable to update when the value of that variable changes.

Also, note that the `searchPhotos` function makes a request to the Pixabay API with an optional keyword. If that keyword is left out, which will be for our first call, the API will return a list of "all images" according to the documentation page. In this case, we will also store the photo data under a key of 'default' which will be used to render the default photos on the main screen.

Make sure that before running your app with this code you also create the `types/photos.types.ts` file in your project. It should look like this.

```typescript
// types/photos.types.ts

export interface IPhoto {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  favorites: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
```

## Rendering the photos to the app's home screen

Now we're at the exciting part! It's time to take that photo data that we're getting back from the API and render out some images to the home screen of your app.

![so excited, I can't wait meme](../images/so-excited-i-cant-wait-meme.png)

All we need to do now is to make some changes to our `screens/home.screen.tsx` file and add a separate Image component, which we'll do some further customizations to later on. For now, our `home.screen.tsx` file should look like this.

```typescript
// screens/home.screen.tsx

import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { photos, searchPhotos } from "../stores/photo.store";
import { Image } from "../components/image.component";
import { observer } from "mobx-react";
import { deviceWidth } from "../theme/space";
import { IPhoto } from "../types/photos.types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Home = observer(() => {
  useEffect(() => {
    searchPhotos();
  }, []);

  const renderPhoto = ({ item }: { item: IPhoto }) => (
    <Image
      key={item.id}
      uri={item.largeImageURL}
      style={{
        width: "100%",
        height: (deviceWidth / item.imageWidth) * item.imageHeight,
      }}
    />
  );

  return (
    <FlatList
      keyExtractor={(photo) => photo.id.toString()}
      data={photos.default}
      style={styles.container}
      renderItem={renderPhoto}
    />
  );
});
```

Here you can see that we've wrapped the `Home` component with an `observer` function. This tells the component, that when the Mobx data we're using in this component changes, make sure to re-render the component with that new data.

We've also changed the rendered output of this function component to a FlatList, which is a pretty efficient way to render a list of items with an unknown length. You can [read more about the FlatList component here](https://reactnative.dev/docs/flatlist). We then pass the FlatList component the default search that is stored in the photo store and we also define a render function for each item in the list of data.

Possibly the most important part of these changes is the `useEffect` hook. What this hook does is take a callback function to be run at least once and whenever the data in the second argument changes. We only want the `searchPhotos` function to be called once, so we just pass in an empty array as the second argument.

After you've made those changes, don't forget to create a new Image component in the `components/image.component.tsx` file. It should look like this.

```typescript
// components/image.component.tsx

import React, { FC } from "react";
import { Image as Img, ImageStyle } from "react-native";

interface IProps {
  uri: string;
  style?: ImageStyle;
}

export const Image: FC<IProps> = ({ uri, style }) => {
  return <Img source={{ uri }} style={style} />;
};
```

This is an abstraction that we will use later on to set a default loading image for all images, among other things. For now, it's just a simple pass-through of image data to the React Native Image component.

Also, we'll need to add in the deviceWidth helper in the `theme/space.ts` file. This will make it easier to get the device width in a standard way across the app when we need it. That file uses the `Dimensions` API from React Native to get the device's width and should look like this.

```ts
// theme/space.ts

import { Dimensions } from "react-native";

export const deviceWidth = Dimensions.get("screen").width;
```

With those changes in your app, you should see Pixabay images showing on the home screen! Congratulations! 🎉 You've just added an API call to get remote data and reactively render it in your app. Not too shabby.

## Conclusion

In this article, we've covered how to sign up to get a Pixabay API token, how to request data from that API from your React Native app, and how to store that data in a scalable manner in the app with Mobx.

We covered a lot in this article, so make sure you have a good grasp of everything we did.

On Github, you can [view the changes between this article and article two](https://github.com/jasonmerino/StockPhotoBrowser/compare/02-navigation...03-api-and-data) in this series, [How to Make an App With React Native: Setting up Navigation](https://jasonmerino.me/articles/how-to-make-an-app-with-react-native-setting-up-navigation).

If you're ready, [join us in the next article in the series on creating a search results screen](https://jasonmerino.me/articles/how-to-make-an-app-with-react-native-4-the-search-results-page). In it we cover pushing a new screen onto the navigation stack, customizing the navigation header, creating a horizontally scrolling list with custom interval snapping, and much more.
