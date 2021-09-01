// Imports the packages Home page requires
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Linking,
  ScrollView,
  Dimensions,
} from "react-native";
// Styling components
import {
  Avatar,
  Button,
  Card,
  Title,
  Subheading,
  Caption,
} from "react-native-paper";
import {
  // Hook to keep the data of the orientation
  useDeviceOrientation,
  // Hook to handle the back navigation button
  useBackHandler,
} from "@react-native-community/hooks";
// A Library to create a smoother horizontal flatlist
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";
import { API_KEY } from "@env";
import AppBar from "./AppBar";

const ImageDetails = (props) => {
  // Destructuring the props
  const {
    navigation,
    imageList,
    updateImageList,
    atHomePage,
    updateAtHomePage,
    page,
    updatePage,
    route,
  } = props;
  // Pressed image data coming from the HomePage component
  const { item } = route.params;
  // Destructuring the dimensions data in order to get the width and height of the screen
  const { width, height } = Dimensions.get("window");
  // Orientation hook keeping the data of the orientation to render the HomePage component every time when the orientation changes
  const orientation = useDeviceOrientation();
  // ComponentDidUpdate hook to render the HomePage component when orientation changes
  useEffect(() => {}, [orientation]);
  // Function to handle making new API call when the end of screen reached
  const handleLoadMore = async () => {
    try {
      // API call to the Unsplash server to get the image data
      let response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}`
      );
      // Updating the state
      updateImageList([...imageList, ...response.data]);
    } catch (error) {
      // Error handling
      console.warn(error);
    }
  };

  // Back button handler to go back with the back button navigation
  const backActionHandler = () => {
    // Navigates back to the Home page
    navigation.navigate("HomePage");
    // Update the home page state to true in order to show/hide the buttons on the AppBar
    updateAtHomePage(true);
    return true;
  };

  // The hook to handle the back navigation button
  useBackHandler(backActionHandler);

  return (
    // To make the full screen experience smoother the whole screen is scrollable
    <SwiperFlatList
      horizontal
      data={imageList}
      keyExtractor={(item, index) => index.toString()}
      // Functions called when the end reached
      onEndReached={() => {
        // Updates the page state to make a new API call
        updatePage(page + 1);
        // Calls for the function handling to load more images
        handleLoadMore();
      }}
      onEndReachedThreshold={5}
      // Setting the length of every swipe to swipe through between images
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      index={imageList.indexOf(item)}
      // Rendered item inside of the flatlist
      renderItem={({ item }) => (
        <ScrollView>
          {/* AppBar Component */}
          <AppBar
            {...props}
            updateAtHomePage={updateAtHomePage}
            atHomePage={atHomePage}
            title={item?.user?.name}
            subtitle={item?.user?.location}
          />
          <ScrollView style={{ width }}>
            {/* Card component to show the image */}
            <Card style={{ width: width }}>
              <Card.Cover
                style={styles.cardImage}
                source={{ uri: item.urls?.regular }}
              />
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Avatar.Image
                    size={48}
                    source={{ uri: item.user?.profile_image?.large }}
                  />
                  <Caption style={{ fontWeight: "bold" }}>
                    {item.user?.username}
                  </Caption>
                  <Caption style={{ textAlign: "center" }}>
                    {item?.user?.bio}
                  </Caption>
                  <Title>Created at: {item?.created_at.slice(0, 10)}</Title>
                  <Subheading style={{ textAlign: "center" }}>
                    {item.alt_description}
                  </Subheading>
                </View>
                <Button
                  style={styles.cardButton}
                  mode="contained"
                  // A Link directing to the url of the image
                  onPress={() => {
                    Linking.openURL(item?.links?.download);
                  }}
                >
                  Go to Image
                </Button>
              </Card.Content>
            </Card>
          </ScrollView>
        </ScrollView>
      )}
    />
  );
};

// Styling for the general component
const styles = StyleSheet.create({
  cardContent: {
    alignItems: "center",
    marginVertical: 10,
  },
  cardText: {
    alignItems: "center",
    width: "80%",
  },
  cardButton: {
    marginVertical: 10,
    width: "60%",
  },
  cardImage: {
    height: 400,
  },
});

export default ImageDetails;
