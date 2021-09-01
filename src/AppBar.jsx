// Imports the packages Home page requires
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";

// Destructuring the props
const AppBar = ({
  navigation,
  updateAtHomePage,
  atHomePage,
  title,
  subtitle,
}) => {
  // State to show the AppBar menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Functions handling the visibility of the menu by updating the state
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View>
      {/* AppBar Component */}
      <Appbar.Header style={styles.appBarHeader}>
        {/* Show/hide components regarding the atHomePage state */}
        {atHomePage ? (
          // Hides back button if in the HomePage
          <></>
        ) : (
          // Back button of the AppBar
          // Shows the back button if not the HomePage
          <Appbar.BackAction
            // Navigates to the Home page
            onPress={() => {
              // Navigates back to the Home page
              navigation.navigate("HomePage");
              // Update the home page state to true in order to show/hide the buttons on the AppBar
              updateAtHomePage(true);
            }}
          />
        )}
        {/* Title of the AppBar */}
        <Appbar.Content title={title} subtitle={subtitle} />
        {/* Show/hide components regarding the atHomePage state */}
        {!atHomePage ? (
          // Hides 3-dot menu if not in the HomePage
          <></>
        ) : (
          // Shows 3-dot menu if in the HomePage
          <>
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action
                  color="white"
                  icon="dots-vertical"
                  onPress={openMenu}
                />
              }
            >
              <Menu.Item
                // Navigates to the About page when the button pressed
                onPress={() => {
                  // Navigates to the About page
                  navigation.navigate("About");
                  // Update the home page state to true in order to show/hide the buttons on the AppBar
                  updateAtHomePage(false);
                  // Closing the menu after the direction
                  closeMenu();
                }}
                title="About"
              />
            </Menu>
          </>
        )}
      </Appbar.Header>
    </View>
  );
};

// Styling for the general component
const styles = StyleSheet.create({
  appBarHeader: {
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },
});

export default AppBar;
