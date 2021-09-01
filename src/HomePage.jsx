// Imports the packages Home page requires
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
// Styling components
import { ActivityIndicator, Card } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
// Hook to keep the data of the orientation
import { useDeviceOrientation } from "@react-native-community/hooks";
import { API_KEY } from "@env";
import AppBar from "./AppBar";

// This arr is for Horizontal Flatlist
// In order to make 2 rows horizontal flatlist the array structure needs to be changed for that reason this new Array keeps the newly structured image data coming from the API
let horImageList = [];

const HomePage = (props) => {
  // Destructuring the props
  const {
    imageList,
    updateImageList,
    atHomePage,
    updateAtHomePage,
    page,
    updatePage,
    navigation,
  } = props;
  // Destructuring the dimensions data in order to get the width and height of the screen
  const { width, height } = Dimensions.get("window");
  // Orientation hook keeping the data of the orientation to render the HomePage component every time when the orientation changes
  const orientation = useDeviceOrientation();

  // ComponentDidMount hook
  useEffect(() => {
    (async () => {
      try {
        // API call to the Unsplash server to get the image data
        let response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=1&orientation=landscape`
        );

        // Structuring the Array for horizontal flatlist
        // Creating Array of Arrays with 2 image objects
        for (let i = 0; i < response.data.length; i += 2) {
          horImageList.push([response.data[i], response.data[i + 1]]);
        }

        // Updating the state
        updateImageList(response.data);
      } catch (error) {
        // For error handling
        console.warn(error);
      }
    })();
  }, []);

  // ComponentDidUpdate hook to render the HomePage component when orientation changes
  useEffect(() => {}, [orientation]);

  // Function to handle making new API call when the end of screen reached
  const handleLoadMore = async () => {
    try {
      // API call to the Unsplash server to get the image data
      let response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}&orientation=landscape`
      );
      // Adding new data to the horizontal flatlist Array
      for (let i = 0; i < response.data.length; i += 2) {
        horImageList.push([response.data[i], response.data[i + 1]]);
      }
      // Updating the state
      updateImageList([...imageList, ...response.data]);
    } catch (error) {
      // Error handling
      console.warn(error);
    }
  };

  // Rendered component
  return (
    <>
      {/* To show a loading animation when there is no image data */}
      {imageList.length === 0 ? (
        // Loading animation
        <View style={styles.loading}>
          <ActivityIndicator size={80} animating={true} />
        </View>
      ) : (
        <>
          {/* To show the correctly structured flatlist when orientation changes */}
          {orientation.portrait ? (
            <>
              {/* AppBar Component */}
              <AppBar
                {...props}
                updateAtHomePage={updateAtHomePage}
                atHomePage={atHomePage}
                title="Unsplash"
                subtitle="Images"
              />
              {/* Vertical flatlist component */}
              <FlatList
                data={imageList}
                key={"#"}
                keyExtractor={(item, index) => "#" + index.toString()}
                numColumns={2}
                // Functions called when the end reached
                onEndReached={() => {
                  // Updates the page state to make a new API call
                  updatePage(page + 1);
                  // Calls for the function handling to load more images
                  handleLoadMore();
                }}
                onEndReachedThreshold={1}
                // Rendered item inside of the flatlist
                renderItem={({ item }) => (
                  // To make the images touchable
                  <TouchableOpacity
                    // Functions called when an image pressed
                    onPress={() => {
                      // Navigates to the Image details page and passing the require data
                      navigation.navigate("ImageDetails", { item });
                      // Updates the home page state to false
                      updateAtHomePage(false);
                    }}
                  >
                    {/* Card component to show the images */}
                    <Card style={styles.card}>
                      <Card.Cover
                        // Styling the image to maintain the aspect ratio
                        style={{
                          aspectRatio: 3 / 2,
                          height: (width / 2 / 3) * 2,
                        }}
                        source={{ uri: item.urls.regular }}
                      />
                    </Card>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            // Horizontal component being rendered
            <ScrollView>
              {/* AppBar Component */}
              <AppBar {...props} title="Unsplash" subtitle="Images" />
              {/* Horizontal flatlist component */}
              <FlatList
                data={horImageList}
                key={"@"}
                keyExtractor={(item, index) => "@" + index.toString()}
                horizontal
                // Functions called when the end reached
                onEndReached={() => {
                  // Updates the page state to make a new API call
                  updatePage(page + 1);
                  // Calls for the function handling to load more images
                  handleLoadMore();
                }}
                onEndReachedThreshold={1}
                // Rendered item inside of the flatlist
                renderItem={({ item }) => (
                  <View>
                    {/* To make the images touchable */}
                    <TouchableOpacity
                      // To select the first image object of the Array of 2 image objects inside of the newly created horizontal image list Array
                      {...item[0]}
                      // Navigates to the Image details page
                      onPress={() => {
                        // Navigates to the Image details page and passing the require data
                        navigation.navigate("ImageDetails", { item: item[0] });
                        // Updates the home page state to false
                        updateAtHomePage(false);
                      }}
                    >
                      {/* Card component to show the images */}
                      <Card style={styles.card}>
                        <Card.Cover
                          // Styling the image to maintain the aspect ratio
                          style={{ aspectRatio: 3 / 2, height: height / 2 }}
                          source={{ uri: item[0].urls.regular }}
                        />
                      </Card>
                    </TouchableOpacity>
                    {/* To make the images touchable */}
                    <TouchableOpacity
                      // To select the second image object of the Array of 2 image objects inside of the newly created horizontal image list Array
                      {...item[1]}
                      // Navigates to the Image details page
                      onPress={() => {
                        // Navigates to the Image details page and passing the require data
                        navigation.navigate("ImageDetails", { item: item[1] });
                        // Updates the home page state to false in order to show/hide the buttons on the AppBar
                        updateAtHomePage(false);
                      }}
                    >
                      {/* Card component to show the images */}
                      <Card style={styles.card}>
                        <Card.Cover
                          // Styling the image to maintain the aspect ratio
                          style={{ aspectRatio: 3 / 2, height: height / 2 }}
                          source={{ uri: item[1].urls.regular }}
                        />
                      </Card>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </ScrollView>
          )}
        </>
      )}
      {/* StatusBar tag for making the status bar of the phone looks consistent with the colors of the page */}
      <StatusBar style="auto" />
    </>
  );
};

// Styling for the general component
const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },
});

export default HomePage;
