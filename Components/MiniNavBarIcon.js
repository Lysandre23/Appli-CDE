import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const iconSize = 30;

function switchScreen(screenName, nav) {
  nav.navigate(screenName);
}

const MiniNavbarIcon = (props) => {
  const navigation = useNavigation();
  const type = props.type;

  const handlePress = () => {
<<<<<<< HEAD
    navigation.navigate(props.goto)
    props.onPress(false);
  };

  return (
    <TouchableOpacity
=======
    switchScreen(props.goto, navigation);
    props.onPress(true);
  };

  return (
    <TouchableHighlight
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
      style={styles.main}
      onPress={handlePress}
      underlayColor="none"
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {type === "icon" ? (
          <Icon color={props.color} size={iconSize} name={props.name} />
        ) : (
          <Image style={styles.img} source={require("../assets/psnLogo.png")} />
        )}
        <Text style={styles.txt}>{props.title}</Text>
      </View>
<<<<<<< HEAD
    </TouchableOpacity>
=======
    </TouchableHighlight>
>>>>>>> b90db95c9e563d73eaffc73a003558c689d174f9
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 20,
    width: "100%",
    backgroundColor: "transparent",
  },
  img: {
    width: iconSize,
    height: iconSize,
  },
  txt: {
    fontSize: 11,
    color: "rgba(0,0,0,0.5)",
    marginTop: 3,
  },
});

export default MiniNavbarIcon;
