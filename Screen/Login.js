import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [action, setAction] = useState("S'enregistrer");
    const [title, setTitle] = useState("Connexion")
    return(
        <View style={styles.main}>
            <View style={styles.logoCDE}>
                <Image style={styles.img} source={require('../assets/CDELogo.png')}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <TextInput
                        style={[styles.inputTop, styles.input]}
                        onChangeText={setEmail}
                        value={email}
                        placeholder='E-mail'
                    />
                    {title == "Enregistrement" ?
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Nom'
                    />
                    :
                    null
                    }
                    {title == "Enregistrement" ?
                    <TextInput
                        style={styles.input}
                        onChangeText={setSurname}
                        value={surname}
                        placeholder='Prénom'
                    />
                    :
                    null
                    }
                    <TextInput
                        style={[styles.inputBottom, styles.input]}
                        onChangeText={setPassword}
                        value={password}
                        placeholder='Mot de passe'
                    />
                    {title == "Connexion" ?
                    <TouchableOpacity style={styles.forgetPassword}>
                        <Text style={{
                            color: "rgb(180,180,180)"
                        }}>
                            Mot de passe oublié
                        </Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                    }
                    <TouchableOpacity style={styles.confirmButton} onPress={() => {
                        navigation.navigate('Events');
                    }}>
                        <Icon color="white" name="arrow-right" size={30} style={{backgroundColor: "#da291c", padding: 15, borderRadius: 100}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={() => {
                if(title == "Connexion") {
                    setTitle("Enregistrement");
                    setAction("Se connecter");
                }else{
                    setTitle("Connexion");
                    setAction("S'enregistrer");
                }
            }}>
                <Text style={styles.registerTextButton}>{action}</Text>
            </TouchableOpacity>
            
            <Image 
                style={{
                    width: "100%",
                    height: "35%",
                    position: 'absolute',
                    top: -25
                }}
                source={require('../assets/svg1.png')}
            />
            <Image 
                style={{
                    width: "100%",
                    height: "35%",
                    position: 'absolute',
                    bottom: -25,
                }}
                source={require('../assets/svg2.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "rgb(250,250,250)"
    },
    bt: {
        position: 'absolute',
        top: "20%",
        left: "50%"    
    },
    logoCDE: {
        position: 'absolute',
        width: "100%",
        top: "15%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100
    },
    form: {
        position: 'absolute',
        width: "85%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    confirmButton: {
        position: 'absolute',
        top: "50%",
        left: "100%",
        transform: [
            {translateX: -30},
            {translateY: -30}
        ],
        borderRadius: 100,
        overflow: 'hidden'
    },
    inputTop: {
        borderTopRightRadius: 100,
    },
    inputBottom: {
        borderBottomRightRadius: 100,
    },
    input: {
        fontSize: 20,
        borderColor: "rgb(220,220,220)",
        padding: 10,
        borderWidth: 1,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    registerButton: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        padding: 10,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        width: "50%",
        top: "70%",
        zIndex: 5
    },
    registerTextButton: {
        color: "#da291c",
        fontSize: 25,
        textAlign: 'center'
    },
    forgetPassword: {
        marginTop: "30%",
        marginLeft: 5,
        position: 'absolute'
    }
});

export default Login;