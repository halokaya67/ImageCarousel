import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/HomePage';
import ImageDetails from './src/ImageDetails';
import About from "./src/About";

const Stack = createNativeStackNavigator();

export default function App(props) {
  const [imageList, updateImageList] = useState([]);
  const [atHomePage, updateAtHomePage] = useState(true);
  const [page, updatePage] = useState(2);

  return (     
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomePage">
          {props => <HomePage
            {...props}
            imageList={imageList}
            updateImageList={updateImageList}
            atHomePage={atHomePage}
            updateAtHomePage={updateAtHomePage}
            page={page}
            updatePage={updatePage}
          />}
        </Stack.Screen>
        <Stack.Screen name="ImageDetails">
          {props => <ImageDetails
            {...props}
            imageList={imageList}
            updateImageList={updateImageList}
            atHomePage={atHomePage}
            updateAtHomePage={updateAtHomePage}
            page={page}
            updatePage={updatePage}
          />}
        </Stack.Screen>
        <Stack.Screen name="About">
          {props => <About
            {...props}
            atHomePage={atHomePage}
            updateAtHomePage={updateAtHomePage}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}