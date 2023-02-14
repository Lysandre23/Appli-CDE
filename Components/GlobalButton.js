import React from "react"
import { Text, 
    TouchableOpacity,
    ActivityIndicator
} from "react-native"

const GlobalButton = (props) => {

    return (
        <TouchableOpacity style={{
            backgroundColor: props.color || "#da291c",
            padding: props.padding || 10,
            borderRadius: props.borderRadius || 100,
            borderWidth: 1,
            borderColor: props.borderColor || "#ffffff",
            textAlign: 'center'
        }} onPress={props.onPress}>
            { !props.isLoading ?
            <Text style={{color: props.textColor || "#ffffff", textAlign: "center"}}>{props.text}</Text>
            :
            <ActivityIndicator color={props.loaderColor || "#ffffff"}/>
            }
        </TouchableOpacity>
    )
}

export default GlobalButton