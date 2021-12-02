import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState("");

    return(
        <View style={styles.main}>
            <TextInput style={styles.inputTop} value={username} onChangeText={setUsername} placeholder="Username"/>
            <TouchableOpacity style={styles.bt} onPress={() => {navigation.replace('Events')}}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    inputBottom: {
        position: 'absolute',
        top: "50%",
        left: "20%"
    },
    inputTop: {
        position: 'absolute',
        top: "50%",
        left: "20%",
        borderColor: "black",
        borderWidth: 1,
        padding: 5
    },
    bt: {
        position: 'absolute',
        top: "20%",
        left: "50%"    
    }
});

export default Login;