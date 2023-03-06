import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("window").height;
const randomSign = () => {
  if (Math.random() < 0.5) {
    return -1;
  } else {
    return 1;
  }
};
const randomSize = () => {
  return 200 + randomSign() * Math.random() * 50;
};

const randomXPosition = (s) => {
  return (
    -s / 2 +
    windowWidth / 2 +
    randomSign() * windowWidth * (0.45 + Math.random() / 10)
  );
};

const randomYPosition = (s) => {
  return (Math.random() * 80 * 0.01 + 0.1) * windowHeight;
};

<<<<<<< HEAD
<<<<<<< HEAD
var size = 0;
var xPos = 0;
var yPos = 2;
=======
let size = 0;
let xPos = 0;
let yPos = 2;
>>>>>>> parent of 1faefc6 (all deletes)
=======
let size = 0;
let xPos = 0;
let yPos = 2;
>>>>>>> parent of 1faefc6 (all deletes)

const Circle = (props) => {
  useEffect(() => {
    size = randomSize();
    xPos = randomXPosition(size);
    yPos = randomYPosition(size);
  }, []);

  return (
    <View
      style={[
        styles.main,
        {
          width: size,
          height: size,
          top: yPos,
          left: xPos,
          backgroundColor: "black",
          borderRadius: size / 2,
          opacity: 0.3,
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    zIndex: 0,
  },
});

export default Circle;
