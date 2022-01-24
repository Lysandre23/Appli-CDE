import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Image, Touchable } from 'react-native';
import Header from '../Components/Header';
import EventsCard from '../Components/EventsCard';
import Navbar from '../Components/Navbar';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import data from '../assets/events.json';

const Events = (props, navigation) => {
    const [admin, setAdmin] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [nameNewEvent, setNameNewEvent] = useState(null);
    const [descriptionNewEvent, setDescriptionNewEvent] = useState(null);
    const [dateNewEvent, setDateNewEvent] = useState(null);
    const [imageNewEvent, setImageNewEvent] = useState(null);
    const [imageCalendar, setImageCalendar] = useState(null);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

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

    const resetInputNewEvent = () => {
        setNameNewEvent(null);
        setDescriptionNewEvent(null);
        setDateNewEvent(null);
        setModalVisible(false);
        setImageNewEvent(null);
    };

    return(
        <View style={styles.main}>
            <Header color="#da291c" title="EVENTS" />
            <TouchableOpacity style={styles.calendar}>

            </TouchableOpacity>
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
                        <TextInput style={styles.input} placeholder='Nom' value={nameNewEvent} onChangeText={setNameNewEvent}/>
                        <TextInput style={styles.input} placeholder='Description' value={descriptionNewEvent} onChangeText={setDescriptionNewEvent}/>
                        
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={styles.datePicker}
                            />
                        )}

                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            <Text style={{textAlign: 'center'}}>Choisir une image</Text>
                        </TouchableOpacity>
                        {imageNewEvent != null ?
                        <Image width={50} height={50} source={imageNewEvent}/>
                        :
                        <View></View>
                        }
                        <TouchableOpacity style={styles.bt} onPress={() => {
                            data.push({
                                "name": nameNewEvent,
                                "slug": nameNewEvent,
                                "image": imageNewEvent,
                                "description": descriptionNewEvent,
                                "date": (date.getDate() <= 9?"0":"")+date.getDate()+"/"+(date.getMonth() <= 9?"0":"")+(date.getMonth()+1)
                            });
                            resetInputNewEvent();
                        }}>
                            <Text style={styles.textBT}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bt} onPress={() => {
                            resetInputNewEvent();
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
                <Text style={{color: "white", fontSize: 18}}>Ajouter un event</Text>
            </TouchableOpacity> 
            : 
            <View></View>
            }
            <FlatList 
                data={data}
                renderItem={({item}) => <EventsCard 
                    name={item.name}
                    date={item.date}
                    src={item.image}
                    description={item.description}
                    keyExtractor={item => item.key}
                />}
                style={{marginBottom: "25%"}}
            />
            <Navbar color="#da291c"/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)'
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
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        
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
    datePicker: {
    }
});

export default Events;