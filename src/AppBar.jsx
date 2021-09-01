import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Menu } from "react-native-paper";

const AppBar = ({
  navigation,
  updateAtHomePage,
  atHomePage,
  title,
  subtitle,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // console.log(navigation);

  return (
    <View>
      <Appbar.Header style={styles.appBarHeader}>
        {atHomePage ? (
          <></>
        ) : (
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate("HomePage");
              updateAtHomePage(true);
            }}
          />
        )}
        <Appbar.Content title={title} subtitle={subtitle} />
        {!atHomePage ? (
          <></>
        ) : (
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
                onPress={() => {
                  navigation.navigate("About");
                  updateAtHomePage(false);
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
