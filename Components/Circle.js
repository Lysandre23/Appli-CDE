import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { useState } from "react"

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('window').height
const randomSign = () => {
    if(Math.random() < 0.5) {
        return -1
    }else{
        return 1
    }
}
const randomSize = () => {
    return 200+randomSign()*Math.random()*50
}

const randomXPosition = (s) => {
    return -s/2+windowWidth/2+randomSign()*windowWidth*(0.4+Math.random()/10)
}

const randomYPosition = (s) => {
    return Math.random()*windowHeight;
}

const size = randomSize()
const xPos = randomXPosition(size)
const yPos = randomYPosition(size)

const Circle = (props) => {
    return (
        <View style={[styles.main, {width: size, height: size, top: yPos, left: xPos, backgroundColor: "black"}]}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        backgroundColor: "white",
        borderRadius: "50%",
        zIndex: 0

    }
})

export default Circle;