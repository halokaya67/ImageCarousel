// Imports the packages the app requires
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/HomePage';
import ImageDetails from './src/ImageDetails';
import About from "./src/About";

const Stack = createNativeStackNavigator();

export default function App(props) {
  // States are created here here in order to be 
  // Image List to store all the image data from the unsplash API
  const [imageList, updateImageList] = useState([]);
  // A boolean value to keep track of the Home Page in order to show/hide the button on the AppBar
  const [atHomePage, updateAtHomePage] = useState(true);
  // This value is for making another API call every time scrolling to the end of the screen
  const [page, updatePage] = useState(2);

  // Routes of the app
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
      {/* Home page route */}
        <Stack.Screen name="HomePage">
          {props => <HomePage
            // Passing props to the Home page
            {...props}
            imageList={imageList}
            updateImageList={updateImageList}
            atHomePage={atHomePage}
            updateAtHomePage={updateAtHomePage}
            page={page}
            updatePage={updatePage}
          />}
        </Stack.Screen>
    {/* Image details Page Route */}
        <Stack.Screen name="ImageDetails">
          {props => <ImageDetails
          // Passing props to the Image details page
            {...props}
            imageList={imageList}
            updateImageList={updateImageList}
            atHomePage={atHomePage}
            updateAtHomePage={updateAtHomePage}
            page={page}
            updatePage={updatePage}
          />}
        </Stack.Screen>
    {/* About Page Route */}
        <Stack.Screen name="About">
          {props => <About
          // Passing props to the About page
            {...props}
            atHomePage={atHomePage}
            updateAtHomePage={updateAtHomePage}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}