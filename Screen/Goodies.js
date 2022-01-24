import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, FlatList, Modal, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import GoodiesCard from '../Components/GoodiesCard';
import Navbar from '../Components/Navbar';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import data from "../assets/goodies.json";



const Goodies = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [admin, setAdmin] = useState(true);
    const [nameNewGoodie, setNameNewGoodie] = useState(null);
    const [priceNewGoodie, setPriceNewGoodie] = useState(null);
    const [imageNewGoodie, setImageNewGoodie] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImageNewGoodie(result.uri);
        }
    };

    const resetInputNewGoodie = () => {
        setImageNewGoodie(null);
        setNameNewGoodie(null);
        setPriceNewGoodie(null);
        setModalVisible(false);
    };

    return(
        <View style={styles.main}>
            <Header color="#da291c" title="GOODIES" />
            {admin ? 
            <TouchableOpacity style={styles.addButton} onPress={() => {
                setModalVisible(true);
            }}>
                <Text style={{color: "white", fontSize: 18}}>Ajouter un goodie</Text>
            </TouchableOpacity> 
            : 
            <View></View>
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.addPanel}>
                        <TextInput style={styles.input} placeholder='Nom' value={nameNewGoodie} onChangeText={setNameNewGoodie}/>
                        <TextInput style={styles.input} placeholder='Prix' value={priceNewGoodie} onChangeText={setPriceNewGoodie}/>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            <Text style={{textAlign: 'center'}}>Choisir une image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bt} onPress={() => {
                            data.push({
                                "name": nameNewGoodie,
                                "price": priceNewGoodie,
                                "image": imageNewGoodie
                            });
                            resetInputNewGoodie();
                        }}>
                            <Text style={styles.textBT}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bt} onPress={() => {
                            resetInputNewGoodie();
                        }}>
                            <Text style={styles.textBT}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={data}
                renderItem={({item}) => 
                    <View style={styles.rowcol}>
                        <GoodiesCard name={item.name} price={item.price} src={item.image}/>
                    </View>}
                keyExtractor={item => item.key}
                numColumns={2}
            />
            
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    rowcol: {
        width: "50%",
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    addButton: {
        zIndex: 2,
        backgroundColor: '#da291c',
        padding: 10,
        borderRadius: 100,
        width: "50%",
        marginLeft: "25%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginBottom: 15
    },
    modal: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
    addPanel: {
        backgroundColor: 'white',
        width: "70%",
        padding: 50,
        borderRadius: 20
    },
    input: {
        width: "100%",
        borderColor: "rgb(200,200,200)",
        borderWidth: 1,
        borderRadius: 7,
        padding: 5,
        marginBottom: 5
    },
    bt: {
        marginTop: 10,
        backgroundColor: "#da291c",
        padding: 9,
        borderRadius: 100,
    },
    textBT: {
        color: "white",
        fontSize: 16,
        textAlign: 'center'
    },
    imagePicker: {
        borderColor: "rgb(150,150,150)",
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10
    }
});

export default Goodies;