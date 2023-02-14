import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  Modal,
  Dimensions,
  View,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RoundButton from "./RoundButton";

const EventModal = (props) => {
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    getImageDimensions(props.image);
  }, [props.image]);

  const getImageDimensions = (imageUrl) => {
    Image.getSize(imageUrl, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImageHeight(imageHeight);
      setImageWidth(screenWidth);
    });
  };

  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      visible={props.visible}
      transparent={true}
      onRequestClose={() => {
        props.setVisible(!props.visible);
      }}
    >
      <View style={styles.container}>
        <RoundButton
          icon="times"
          style={styles.backBtn}
          onPress={() => {
            props.setVisible(false);
          }}
        />
        <ScrollView>
          <Image
            style={(styles.img, { width: imageWidth, height: imageHeight })}
            source={{ uri: props.image }}
          />
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5
          }}>
            <Text style={styles.author}>{props.author}</Text>
            <Text style={styles.date}>{props.date}aa</Text>
          </View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.description}>{props.text}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0,0,0,1)",
  },
  container: {
    overflow: "hidden",
    position: "relative",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: Platform.OS === "IOS" ? 40 : 0,
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 2,
  },
  img: {
    width: "100%",
    height: 100,
    backgroundColor: "grey",
    resizeMode: "cover",
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  author: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  description: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "justify",
    marginBottom: 20,
  },
});

export default EventModal;
