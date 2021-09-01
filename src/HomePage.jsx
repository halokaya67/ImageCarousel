import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { API_KEY } from "@env";
import AppBar from "./AppBar";

let horImageList = [];

const HomePage = (props) => {
  const {
    imageList,
    updateImageList,
    atHomePage,
    updateAtHomePage,
    page,
    updatePage,
    navigation,
  } = props;
  const { width, height } = Dimensions.get("window");
  const orientation = useDeviceOrientation();

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=1&orientation=landscape`
        );

        for (let i = 0; i < response.data.length; i += 2) {
          horImageList.push([response.data[i], response.data[i + 1]]);
        }

        updateImageList(response.data);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  useEffect(() => {}, [orientation]);

  const handleLoadMore = async () => {
    try {
      let response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}&orientation=landscape`
      );

      for (let i = 0; i < response.data.length; i += 2) {
        horImageList.push([response.data[i], response.data[i + 1]]);
      }

      updateImageList([...imageList, ...response.data]);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {imageList.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator size={80} animating={true} />
        </View>
      ) : (
        <>
          {orientation.portrait ? (
            <>
              <AppBar
                {...props}
                updateAtHomePage={updateAtHomePage}
                atHomePage={atHomePage}
                title="Unsplash"
                subtitle="Images"
              />
              <FlatList
                data={imageList}
                key={"#"}
                keyExtractor={(item, index) => "#" + index.toString()}
                numColumns={2}
                onEndReached={() => {
                  updatePage(page + 1);
                  handleLoadMore();
                }}
                onEndReachedThreshold={1}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ImageDetails", { item });
                      updateAtHomePage(false);
                    }}
                  >
                    <Card style={styles.card}>
                      <Card.Cover
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
            <ScrollView>
              <AppBar {...props} title="Unsplash" subtitle="Images" />
              <FlatList
                data={horImageList}
                key={"@"}
                keyExtractor={(item, index) => "@" + index.toString()}
                horizontal
                onEndReached={() => {
                  updatePage(page + 1);
                  handleLoadMore();
                }}
                onEndReachedThreshold={1}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      {...item[0]}
                      onPress={() => {
                        navigation.navigate("ImageDetails", { item: item[0] });
                        updateAtHomePage(false);
                      }}
                    >
                      <Card style={styles.card}>
                        <Card.Cover
                          style={{ aspectRatio: 3 / 2, height: height / 2 }}
                          source={{ uri: item[0].urls.regular }}
                        />
                      </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                      {...item[1]}
                      onPress={() => {
                        navigation.navigate("ImageDetails", { item: item[1] });
                        updateAtHomePage(false);
                      }}
                    >
                      <Card style={styles.card}>
                        <Card.Cover
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
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },
});

export default HomePage;

{
  /* {width > 1000 ? (
          <FlatList
            data={imageList}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            ListEmptyComponent={
              <View style={styles.loading}>
                <ActivityIndicator size={80} animating={true} />
              </View>
            }
            key={"_"}
            keyExtractor={(item, index) => "_" + index.toString()}
            numColumns={4}
            onEndReached={() => {
              updatePage(page + 1);
              handleLoadMore();
            }}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: width / 4 }}
                onPress={() => {
                  navigation.navigate("ImageDetails", { item });
                  updateAtHomePage(false);
                }}
              >
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: item.urls.regular }} />
                </Card>
              </TouchableOpacity>
            )}
          />
        ) : width > 700 ? (
          <FlatList
            data={imageList}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            ListEmptyComponent={
              <View style={styles.loading}>
                <ActivityIndicator size={80} animating={true} />
              </View>
            }
            key={"@"}
            keyExtractor={(item, index) => "@" + index.toString()}
            numColumns={3}
            onEndReached={() => {
              updatePage(page + 1);
              handleLoadMore();
            }}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: width / 3 }}
                onPress={() => {
                  navigation.navigate("ImageDetails", { item });
                  updateAtHomePage(false);
                }}
              >
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: item.urls.regular }} />
                </Card>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={imageList}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            ListEmptyComponent={
              <View style={styles.loading}>
                <ActivityIndicator size={80} animating={true} />
              </View>
            }
            key={"#"}
            keyExtractor={(item, index) => "#" + index.toString()}
            numColumns={2}
            onEndReached={() => {
              updatePage(page + 1);
              handleLoadMore();
            }}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: width / 2 }}
                onPress={() => {
                  navigation.navigate("ImageDetails", { item });
                  updateAtHomePage(false);
                }}
              >
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: item.urls.regular }} />
                </Card>
              </TouchableOpacity>
            )}
          />
        )} */
}
