---
type: "article"
path: "/articles/how-to-make-an-app-with-react-native-4-the-search-results-page"
title: "How to Make an App With React Native IV: The Search Results Page"
description: "In part four of the how to make an app with React Native series, we cover adding an explore component and navigating to a new search results screen."
date: "2020-05-14"
draft: false
twitterImage: "/social-images/twitter-how-to-make-an-app-with-react-native-part-4.png"
---

Hi, and welcome to part four of our series on how to make an app with React Native! If you haven't been following along with parts one through three, I suggest you go back and get started there. You can [read the first article in the series here](https://jasonmerino.me/articles/how-to-make-an-app-with-react-native-getting-started). If you're ready for what comes next, let's dive in!

## Creating the explore components

If you've been following along you will remember that we are building a stock photo browsing app with UI inspired by the Unsplash app for iOS. For your reference here are the home and search results screens of that app.

![Unsplash iOS home and search results screens](../images/unsplash-ios-home-screen-and-search-results.png)

The first part that we're going to be working on today is the horizontally scrollable UI under the Explore heading. If you pull the content from right to left you will see a list of curated collections with a nice background image and the text for that collection.

The Pixabay API doesn't have an endpoint to pull collections from their data, but on the API documentation page, they have a list of categories that you can filter your image searches by. That part of the documentation looks like this.

![Pixabay image search API documentation for category options](../images/pixabay-image-search-category-options.png)

So, the first thing we'll be doing based on this information is to store these categories in an array in our code. Create a file called `constants.ts` in the project root and define the categories in an array of objects. We'll add a text and image property to make it easy to render out the categories in the explore section. You will also notice that the image property in each of these objects requires the background image for each particular category. If you are writing the app from scratch as you go along you can [download all the images from the repo](https://github.com/jasonmerino/StockPhotoBrowser/tree/04-search-results/images) and move them into your project.

```ts
// constants.ts

import { ICategoryItem } from "./types/categories.types"

export const categories: ICategoryItem[] = [
  { text: "Backgrounds", image: require("./images/backgrounds-category.jpg") },
  { text: "Fashion", image: require("./images/fashion-category.jpg") },
  { text: "Nature", image: require("./images/nature-category.jpg") },
  { text: "Science", image: require("./images/science-category.jpg") },
  { text: "Education", image: require("./images/education-category.jpg") },
  { text: "Feelings", image: require("./images/feelings-category.jpg") },
  { text: "Health", image: require("./images/health-category.jpg") },
  { text: "People", image: require("./images/people-category.jpg") },
  { text: "Religion", image: require("./images/religion-category.jpg") },
  { text: "Places", image: require("./images/places-category.jpg") },
  { text: "Animals", image: require("./images/animals-category.jpg") },
  { text: "Industry", image: require("./images/industry-category.jpg") },
  { text: "Computer", image: require("./images/computer-category.jpg") },
  { text: "Food", image: require("./images/food-category.jpg") },
  { text: "Sports", image: require("./images/sports-category.jpg") },
  {
    text: "Transportation",
    image: require("./images/transportation-category.jpg"),
  },
  { text: "Travel", image: require("./images/travel-category.jpg") },
  { text: "Buildings", image: require("./images/buildings-category.jpg") },
  { text: "Business", image: require("./images/business-category.jpg") },
  { text: "Music", image: require("./images/music-category.jpg") },
]
```

Along with this file, we'll need to create a category item type for use here and later when we render categories in the explore section. Add this code to a file at `types/categories.types.ts`

```ts
// types/categories.types.ts

export interface ICategoryItem {
  text: string
  image: number
}
```

Now that we have the categories in a safe place and some type definitions to go along with it, let's get to work on the explore component. Create a new file at `components/explore.component.tsx`. In this component, we'll be rendering the categories in a horizontal scrolling list. In that component add the following code.

```ts
// components/explore.component.tsx

import React from "react"
import { Text } from "./text.component"
import {
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native"
import { deviceWidth, space1, space2 } from "../theme/space"
import { useNavigation } from "@react-navigation/native"
import { categories } from "../constants"
import { SectionHeading } from "./section-heading.component"
import { ICategoryItem } from "../types/categories.types"

const styles = StyleSheet.create({
  container: {
    paddingLeft: space2,
  },
  category: {
    height: 145,
    width: deviceWidth - 4 * space1,
    marginRight: space1,
  },
  image: {
    borderRadius: space1,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
  imageOverlay: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .4)",
    alignItems: "center",
    justifyContent: "center",
  },
})

export const Explore = () => {
  const navigation = useNavigation()

  const renderCategory = ({ item }: { item: ICategoryItem }) => {
    return (
      <View style={styles.category}>
        <ImageBackground source={item.image} style={styles.image}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Results", { category: item.text })
            }
          >
            <View style={styles.imageOverlay}>
              <Text color="light1" weight="bold">
                {item.text}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View>
      <SectionHeading>Explore</SectionHeading>
      <FlatList
        horizontal
        snapToAlignment="start"
        snapToInterval={deviceWidth - 3 * space1}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={category => category.text}
        contentContainerStyle={styles.container}
      />
    </View>
  )
}
```

Now that's a lot of code! Let's go over what we've added in the file above. In the main render section of the code, we're returning a SectionHeading and FlatList component. In the FlatList we are telling it to take the category list we just created and use that as the `data` for the list. With each category item in the `categories` array, we're going to render something with what is returned from the `renderCategory` function.

In the `renderCategory` function we simply return an item which uses the [ImageBackground](https://reactnative.dev/docs/imagebackground), [TouchableWithoutFeedback](https://reactnative.dev/docs/touchablewithoutfeedback), and [View](https://reactnative.dev/docs/view) components from [React Native](https://reactnative.dev/) as well as our own custom Text component which sets some defaults on the React Native Text component so the text all throughout the app is displayed in a standard manner in line with our style guide.

The ImageBackground component does exactly what it sounds like, it creates a background image for its child components. The TouchableWithoutFeedback component makes it so we can easily handle taps on each particular category item we're rendering. With the function we pass to the `onPress` prop we can call the `navigation.navigate()` function which we get from the [`useNavigation` hook](https://reactnavigation.org/docs/use-navigation/). Once we create the results screen, tapping on a category will push the results screen onto the navigation stack and pass it a category param to search the API with.

> Note: if you aren't familiar with hooks, you should [check out this great article on learning the basics of React hooks](https://medium.com/free-code-camp/learn-the-basics-of-react-hooks-in-10-minutes-b2898287fe5d).

Another thing we should pay attention to are the properties we pass to the FlatList regarding snapping. The side-scrolling list of categories in the iOS Unsplash app shows the previous and next categories peeking onto the screen on either side of the focused category. To get this effect in our React Native app we need to tell the FlatList we are using a custom interval, which is the width of the category item, and that we want to have each item in the list `snapToAlignment` at the start of the item. The code for this is these two properties in the FlatList.

```ts
snapToAlignment="start"
snapToInterval={deviceWidth - 3 * space1}
```

Along with the addition of the Explore component we need to add a SectionHeading component at `components/section-heading.component.tsx`, which we will use in the Explore component and on the home screen later on.

```ts
// components/section-heading.component.tsx

import React, { FC } from "react"
import { Text } from "./text.component"
import { StyleSheet } from "react-native"
import { space2, space1 } from "../theme/space"

const styles = StyleSheet.create({
  heading: {
    padding: space2,
    paddingTop: space2,
    paddingBottom: space1,
  },
})

export const SectionHeading: FC = ({ children }) => {
  return (
    <Text weight="bold" size="large" style={styles.heading}>
      {children}
    </Text>
  )
}
```

We'll also need to add another entry for the `space2` variable in the `theme/space.ts` file.

```diff
// theme/space.ts

import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('screen').width;

export const space1 = 10;
+ export const space2 = 20;
```

And we'll need to add another color to our `theme/colors.ts` file for a dark color to use in our custom Text component. We'll export the color individually, but we'll also create a default export which will export all of the colors so that in our Text component we can use TypeScript's `keyof typeof` syntax to make sure our text color options are always in sync with the default export of our `theme/colors.ts` file.

Make these changes in your `theme/colors.ts` file.

```diff
// theme/colors.ts

export const light1 = '#fff';
+ export const dark3 = '#000';

+ export default {
+   light1,
+   dark3,
+ };
```

And finally, we'll add the custom Text component in a new file at `components/text.component.tsx`. This component only configures a couple of sizes and font weights at this point, but there will be more we'll add later.

```ts
// components/text.component.tsx

import React, { FC } from "react"
import { Text as RNText, TextProps, TextStyle } from "react-native"
import colors from "../theme/colors"

const sizes = {
  regular: 15,
  large: 17,
}

interface IProps extends TextProps {
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
  color?: keyof typeof colors
  size?: keyof typeof sizes
}

export const Text: FC<IProps> = props => {
  const { weight, color, size, ...textProps } = props
  const style: TextStyle[] = [
    {
      fontWeight: weight || "normal",
      color: colors[color || "dark3"],
      fontSize: sizes[size || "regular"],
    },
    props.style as TextStyle,
  ]

  return <RNText {...textProps} style={style} />
}
```

All we're doing in this file is setting up default styling for the text component so that we can get consistent text styles across the whole application. You'll notice that before we declare the `style` variable in the function component we pull out the `weight`, `color`, and `size` props. We want to make sure that we still provide a way to customize the React Native Text component with all the standard props, so after we pull out our custom props we spread the rest onto the RNText component. If you're confused about what's going on with separating out our props from the RNText component props, you can [read about using the ES7 object rest operator to omit object properties](https://codeburst.io/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90).

Now that we have the explore section all put together, let's move on to hooking up the search results page.

## Creating the search results page

The first thing we're going to do is to create a new file at `screens/results.screen.tsx` and inside it, we're going to write this code.

```ts
// screens/results.screen.tsx

import React, { FC, useEffect } from 'react';
import { Image } from '../components/image.component';
import { IPhoto } from '../types/photos.types';
import { FlatList } from 'react-native';
import { photos, searchPhotos } from '../stores/photo.store';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigator.types';
import { Separator } from '../components/separator.component';
import { observer } from 'mobx-react';

export const Results: FC = observer(() => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Results'>>();
  const navigation = useNavigation();

  const renderPhoto = ({ item }: { item: IPhoto }) => {
    return <Image image={item} />;
  };

  useEffect(() => {
    if (params?.category) {
      navigation.setOptions({ title: params?.category });
      searchPhotos({
        category: params?.category,
        keyword: params?.category,
      });
    }
  }, []);

  return (
    <FlatList
      keyExtractor={(photo) => photo.id.toString()}
      data={photos[params?.category] || []}
      renderItem={renderPhoto}
      style={{ flex: 1 }}
      ItemSeparatorComponent={Separator}
    />
  );
});
```

### Using React Navigation route params

The first new thing that we're going to run across in this screen is that we're making use of React Navigation's route params that get passed from one screen to the next. Remember when we called `navigation.navigate('Results', { category: item.text })` in the explore component? Well, that second argument is the navigation param.

We need to be able to pass params between screens so that the screens are linked together in a way that's understandable to anyone using the app. So here, we've taken the category that has been tapped and we pass it through to the results screen.

Using the [`useRoute` hook](https://reactnavigation.org/docs/use-route/) in the results screen we can pull out the params object and check to see if it has a category property in it.

### Setting the screen header title

Another thing we need to do is to set the page title of the screen. Because this screen is going to be used for all category search results, the page title will need to be set dynamically. To do this, we'll call the `navigation.setOptions()` function and pass in the category as the title. We do this inside the callback function provided as the first argument to the `useEffect` hook and then pass an empty array as the second argument. Providing the second argument as an empty array makes it so that the code in the callback function is only run once each time the component mounts.

### Searching the API based on keyword

Next, we also make a call the `searchPhotos` function and pass in the category as both the category and a keyword. We pass the category in as a keyword simply because, in my _professional_ opinion, the search results from the Pixabay API seem to make a little more sense.

You may have noticed that the argument signature of this function looks different than the last time we saw it. We will have to do a little refactor to the code to handle the category as well as the keyword in an understandable way.

Update your `searchPhotos()` function in `stores/photo.store.ts` to look like this.

```ts
// stores/photo.store.ts

export const searchPhotos = async ({
  keyword,
  category,
}: {
  keyword?: string
  category?: string
}) => {
  let params = ""
  if (category) {
    params += `&category=${category.toLowerCase()}`
  }
  if (keyword) {
    params += `&q=${keyword}`
  }
  const url = `${BASE_URL}/?key=${Config.PIXABAY_API_KEY}&safesearch=true&per_page=4${params}`
  const response = await fetch(url)
  const data = await response.json()
  photos[keyword || "default"] = data.hits
}
```

And then also make sure your call to the `searchPhotos()` function in `screens/home.screen.tsx` reflects the argument signature changes we made. Basically all you have to do is pass in an empty object to appease TypeScript.

### Refactoring the Image component

At this point, we also need to make some changes to the Image component we built in [part three of this series](https://jasonmerino.me/articles/how-to-make-an-app-with-react-native-api-integration-and-mobx). We're going to move the styles to make the image full width and the correct aspect ratio from the `screens/home.screen.tsx` file into the `components/image.component.tsx` file. We are also going to change the prop signature for the Image component so that it accepts an image prop in the form of the image payload that we get back from the Pixabay API.

Now our Image component should look like this.

```ts
// components/image.component.tsx

import React, { FC } from "react"
import { Image as Img, ImageStyle } from "react-native"
import { deviceWidth } from "../theme/space"
import { IPhoto } from "../types/photos.types"

interface IProps {
  image: IPhoto
}

export const Image: FC<IProps> = ({ image }) => {
  return (
    <Img
      source={{ uri: image.largeImageURL }}
      style={{
        width: "100%",
        height: (deviceWidth / image.imageWidth) * image.imageHeight,
      }}
    />
  )
}
```

After these changes to the Image component, we'll also need to adjust the code that renders the images in `screens/home.screen.tsx`. Make these changes to the `renderPhoto` function.

```diff
// screens/home.screen.tsx

   const renderPhoto = ({ item }: { item: IPhoto }) => (
-    <Image
-      key={item.id}
-      uri={item.largeImageURL}
-      style={{
-        width: '100%',
-        height: (deviceWidth / item.imageWidth) * item.imageHeight,
-      }}
-    />
+    <Image key={item.id} image={item} />
   );
```

### Adding the Separator component

To make the list of images in the search results page match how all lists of images are separated in the Unsplash app, we'll create a Separator component to use on the search results screen as well as on the home screen later on. Create a file at `components/separator.component.tsx` and put place this code in it.

```ts
// components/separator.component.tsx

import React from "react"
import { View, StyleSheet } from "react-native"
import { light1 } from "../theme/colors"

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: light1,
  },
})

export const Separator = () => {
  return <View style={styles.separator} />
}
```

## Hooking the search results screen into the navigator

Now that we have the results screen all built out, we need to hook it into the navigator so that we can navigate to it. In our `App.tsx` file we'll need to make the following changes.

```diff

// App.tsx

  import 'mobx-react-lite/batchingForReactNative';
  import 'react-native-gesture-handler';
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { Home } from './screens/home.screen';
  import { Provider } from 'mobx-react';
+ import { Results } from './screens/results.screen';
+ import { RootStackParamList } from './types/navigator.types';

- const AppStack = createStackNavigator();
+ const AppStack = createStackNavigator<RootStackParamList>();

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
+           <AppStack.Screen name="Results" component={Results} />
          </AppStack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
```

Here we import the results screen and render out an additional `<AppStack.Screen />` entry. We also import a `RootStackParamList` interface which tells the router which screens take which params. This is needed for type safety when accessing the category param in the results screen.

The `types/navigator.types.ts` file which exports the `RootStackParamList` should look like this.

```ts
// types/navigator.types.ts

export type RootStackParamList = {
  Home: undefined
  Results: { category: string }
}
```

After these changes, we should be able to tap on a category in the horizontally scrolling list and then be pushed over to a new screen with the category name in the navigation bar and related images in the screen body.

At this point, we are mostly done!

### Customizing the navigation header back button

To match the Unsplash iOS app we need to customize the navigation header's back button. Currently, we have the default iOS blue with a text label of "Home" for our back button. To get it to match the Unsplash app's back button we need to remove the text label and change the color to black. Here are the changes we need to make.

```diff

// App.tsx

+ import { dark3 } from './theme/colors';
...
-        <AppStack.Navigator>
+        <AppStack.Navigator
+          screenOptions={{
+            headerBackTitleVisible: false,
+            headerTintColor: dark3,
+          }}
+        >
...
```

## Final clean up

To match the style of the search results page a bit more we need to make a couple of other changes to the home screen. To get the explore section to scroll off the screen as we scroll down we'll need to move it into the `ListHeaderComponent` prop on the FlatList. In addition, we want our "New" section heading to match the "Explore" section heading above, so we'll add that in below the Explore component. Finally, we'll add a separator between each item in this FlatList as well.

```diff

  // screens.home.screen.tsx
  import React, { useEffect } from 'react';
  import { FlatList, StyleSheet, View, SafeAreaView } from 'react-native';
  import { photos, searchPhotos } from '../stores/photo.store';
  import { Image } from '../components/image.component';
  import { observer } from 'mobx-react';
  import { IPhoto } from '../types/photos.types';
  import { Explore } from '../components/explore.component';
+ import { SectionHeading } from '../components/section-heading.component';
+ import { Separator } from '../components/separator.component';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

 export const Home = observer(() => {
   useEffect(() => {
     searchPhotos({});
   }, []);

   const renderPhoto = ({ item }: { item: IPhoto }) => (
     <Image key={item.id} image={item} />
   );

   return (
     <SafeAreaView style={styles.container}>
-      <Explore />
       <FlatList
         keyExtractor={(photo) => photo.id.toString()}
         data={photos.default}
         style={styles.container}
         renderItem={renderPhoto}
+        ListHeaderComponent={
+          <>
+            <Explore />
+            <SectionHeading>New</SectionHeading>
+          </>
+        }
+        ItemSeparatorComponent={Separator}
       />
     </SafeAreaView>
   );
 });
```

And that's it! Now your app should look something like this. Congrats! You did it. 🎉

![React Native stock photo browser explore and search results screens](../images/react-native-stock-photo-browser-explore-and-search-results.png)

## Conclusion

Thanks for following along as we added the explore section and search results page to our React Native app.

To see the changes between part three of this series and this part you can [check out the diff on Github](https://github.com/jasonmerino/StockPhotoBrowser/compare/03-api-and-data...04-search-results).

You can also [see the entire codebase so far by viewing the branch on Github](https://github.com/jasonmerino/StockPhotoBrowser/tree/04-search-results).

Make sure to stay tuned for part five where we build the image detail gallery!

**Has there been something in this article that didn't make sense?** [Let's connect on Twitter](https://twitter.com/jasonmerino), I'd love to help you along on your React Native journey!
