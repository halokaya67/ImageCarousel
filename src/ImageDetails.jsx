import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Linking,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Subheading,
  Caption,
} from "react-native-paper";
import {
  useDeviceOrientation,
  useBackHandler,
} from "@react-native-community/hooks";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";
import { API_KEY } from "@env";
import AppBar from "./AppBar";

const ImageDetails = (props) => {
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
  const { item } = route.params;
  const { width, height } = Dimensions.get("window");
  const orientation = useDeviceOrientation();

  useEffect(() => {}, [orientation]);

  const handleLoadMore = async () => {
    try {
      let response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}`
      );

      updateImageList([...imageList, ...response.data]);
    } catch (error) {
      console.warn(error);
    }
  };

  const backActionHandler = () => {
    navigation.navigate("HomePage");
    updateAtHomePage(true);
    return true;
  };

  useBackHandler(backActionHandler);

  return (
    <SwiperFlatList
      horizontal
      data={imageList}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={() => {
        updatePage(page + 1);
        handleLoadMore();
      }}
      onEndReachedThreshold={5}
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      index={imageList.indexOf(item)}
      renderItem={({ item }) => (
        <ScrollView>
          <AppBar
            {...props}
            updateAtHomePage={updateAtHomePage}
            atHomePage={atHomePage}
            title={item?.user?.name}
            subtitle={item?.user?.location}
          />
          <ScrollView style={{ width }}>
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
