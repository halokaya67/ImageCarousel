// Imports the packages Home page requires
import React from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Linking,
} from "react-native";
// Styling components
import { Card, Button, Avatar, Caption, Subheading } from "react-native-paper";
// Hook to handle the back navigation button
import { useBackHandler } from "@react-native-community/hooks";
import AppBar from "./AppBar";

const About = (props) => {
  // Destructuring the props
  const { navigation, atHomePage, updateAtHomePage } = props;
  // Destructuring the dimensions data in order to get the width and height of the screen
  const { width, height } = Dimensions.get("window");

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
    <ScrollView>
      {/* AppBar Component */}
      <AppBar
        {...props}
        atHomePage={atHomePage}
        updateAtHomePage={updateAtHomePage}
        title="About"
        subtitle="Legionella Dossier"
      />
      {/* Card component to show the About page details */}
      <Card style={{ width: width }}>
        <Card.Cover
          style={styles.cardImage}
          source={{
            uri: "https://res.cloudinary.com/djiluk8fd/image/upload/v1630451587/Asset_2_2_2x_cbzgat.png",
          }}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardText}>
            <Avatar.Image
              size={48}
              source={{
                uri: "https://res.cloudinary.com/djiluk8fd/image/upload/v1630451187/Asset_1_co3p4l.png",
              }}
            />
            <Caption style={{ fontWeight: "bold" }}>Legionella Dossier</Caption>
            <Subheading style={{ textAlign: "center" }}>
              Made by HALIL IBRAHIM KAYA!...
            </Subheading>
          </View>
          <Button
            style={styles.cardButton}
            mode="contained"
            // A Link directing to the url of the website
            onPress={() => {
              Linking.openURL("https://legionelladossier.com/en/");
            }}
          >
            Legionella Dossier Website
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
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
  },
  cardImage: {
    height: 400,
  },
});

export default About;
