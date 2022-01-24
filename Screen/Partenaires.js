import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, FlatList, Modal, TextInput } from 'react-native';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import PartenaireCard from '../Components/PartenaireCard';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';


import data from "../assets/partenaires.json";

const Partenaires = (props, navigation) => {
    const [admin, setAdmin] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [nameNewPart, setNameNewPart] = useState(null);
    const [imageNewPart, setImageNewPart] = useState(null);
    const [urlNewPart, setUrlNewPart] = useState(null);
    
    const resetInputNewPart = () => {
        setNameNewPart(null);
        setUrlNewPart(null);
        setImageNewPart(null);
        setModalVisible(false);
    }

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
          setImageNewEvent(result.uri);
        }
    };
    
    return(
        <View style={styles.main}>
            <Header color="#da291c" title="PARTENAIRES" />
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.addPanel}>
                        <TextInput style={styles.input} placeholder='Nom' value={nameNewPart} onChangeText={setNameNewPart}/>
                        <TextInput style={styles.input} placeholder='Lien vers le site' value={urlNewPart} onChangeText={setUrlNewPart}/>
                        
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            <Text style={{textAlign: 'center'}}>Choisir une image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bt} onPress={() => {
                            data.push({
                                "name": nameNewPart,
                                "url": urlNewPart,
                                "image": imageNewPart,
                                "id": "id"
                            });
                            resetInputNewPart();
                        }}>
                            <Text style={styles.textBT}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bt} onPress={() => {
                            resetInputNewPart();
                        }}>
                            <Text style={styles.textBT}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {admin ? 
            <TouchableOpacity style={styles.addButton} onPress={() => {
                setModalVisible(true);
            }}>
                <Text style={{color: "white", fontSize: 18}}>Ajouter un Partenaire</Text>
            </TouchableOpacity> 
            : 
            <View></View>
            }
            <FlatList 
                data={data}
                numColumns={3}
                renderItem={({item}) => <View style={{marginTop: 20, width: "33%", display: 'flex', flexDirection:"row", justifyContent: "space-around"}}><PartenaireCard name={item.name} url={item.url} image={item.image} id={item.id}/></View>}
            />
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
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
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        
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
    },
});

export default Partenaires;