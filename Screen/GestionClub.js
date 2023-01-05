import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import RedLine from "../Components/RedLine";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import Api from "../Api";
import AdminButton from "../Components/AdminButton";
import ListModal from "../Components/ListModal";
import modalStyle from "./Modal.style.js";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { showMessage, hideMessage } from "react-native-flash-message";
import { pickImageUtils, getPictureInput, filesPost, myToDateString } from "../helpers/helpers";
import GlobalButton from "../Components/GlobalButton";

const GestionClub = (props) => {
    const route = useRoute();

    const [isError, setIsError] = useState(false)
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [nameUpdateClub, setNameUpdateClub] = useState("");
    const [descriptionUpdateClub, setDescriptionUpdateClub] = useState("");
    const [imageUpdateClub, setImageUpdateClub] = useState(null);
    const [image64UpdateClub, setImage64UpdateClub] = useState(null);

    const [roomUpdateClub, setRoomUpdateClub] = useState("");
    const [modalPostVisible, setModalPostVisible] = useState(false);
    const [titlePost, setTitlePost] = useState("");
    const [descriptionPost, setDescriptionPost] = useState("");
    const [imagePost, setImagePost] = useState(undefined);
    const [image64Post, setImage64Post] = useState(null);
    const [datePost, setDatePost] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);

    const [enableNotificationPost, setEnableNotificationPost] = useState(false);

    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [modalMessagesVisible, setModalMessagesVisible] = useState(false);
    const [modalAddMemberVisible, setModalAddMemberVisible] = useState(false);
    const [modalRemoveMemberVisible, setModalRemoveMemberVisible] = useState(false);
    const [modalAddResponsibleVisible, setModalAddResponsibleVisible] = useState(false);
    const [modalRemoveResponsibleVisible, setModalRemoveResponsibleVisible] = useState(false);

    const [club, setClub] = useState({
        id: null,
        name: "",
        description: "",
    });
    const [messages, setMessages] = useState([]);

    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [responsibles, setResponsibles] = useState([]);

    useEffect(() => {
        getUsers();
        if (parseInt(route.params.id) !== club.id) {
            getClub();
            getMembers();
            getResponsibles();
            getMessages();
        }
    }, [club]);

    const getClub = () => {
        Api.get("/clubs/" + route.params.id).then(function (response) {
            setClub(response.data.data);
            setNameUpdateClub(response.data.data.name);
            setDescriptionUpdateClub(response.data.data.description);
            response.data.data.room ?? setRoomUpdateClub(response.data.data.room);
        });
    };

    const getUsers = () => {
        Api.get("/users/list", {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        }).then(function (response) {
            setUsers(response.data.data);
        });
    };

    const getMembers = () => {
        Api.get("/clubs/members/" + route.params.id, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        }).then(function (response) {
            setMembers(response.data.data);
        });
    };

    const getResponsibles = () => {
        Api.get("/clubs/responsibles/" + route.params.id, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        }).then(function (response) {
            setResponsibles(response.data.data);
        });
    };

    const getMessages = () => {
        Api.get("/clubs/messages/" + route.params.id, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        }).then((response) => {
            setMessages(response.data.data);
        });
    };

    const serializeUsers = (users) => {
        let array = [];
        users.forEach((item) => {
            array.push({
                value: item.id,
                label: item.first_name + " " + item.last_name,
            });
        });
        return array;
    };

    const handleToggleResponsible = (userId) => {
        Api.post(
            "/clubs/responsibles",
            {
                user_id: userId,
                club_id: club.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            }
        )
            .then(function (response) {
                getMembers();
                getResponsibles();
                showMessage({
                    message: response.data.message,
                    type: "success",
                });
            })
            .catch(function (error) {
                showMessage({
                    message: "Une erreur s'est produite. Veuillez réessayer.",
                    type: "danger",
                });
                throw error;
            });
    };

    const handleToggleMember = (userId) => {
        Api.post(
            "/clubs/members",
            {
                user_id: userId,
                club_id: club.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            }
        )
            .then(function (response) {
                getMembers();
                getResponsibles();
                showMessage({
                    message: response.data.message,
                    type: "success",
                });
            })
            .catch(function (error) {
                showMessage({
                    message: "Une erreur s'est produite. Veuillez réessayer.",
                    type: "danger",
                });
                throw error;
            });
    };

    const pickImageClub = async () => {
        const result = await pickImageUtils(true);
        if (result.status) {
            setImageUpdateClub(result.image);
            setImage64UpdateClub(result.imageBase64);
        }
    };

    const pickImagePost = async () => {
        const result = await pickImageUtils();
        if (result.status) {
            setImagePost(result.image);
            setImage64Post(result.imageBase64);
        }
    };

    const handleCloseClubModal = () => {
        setModalUpdateVisible(false);
    };

    const handleClosePostModal = () => {
        setModalPostVisible(false);
        setTitlePost("");
        setDescriptionPost("");
        setImagePost(null);
    };

    const updateClub = async () => {
        let form = new FormData();
        if (imageUpdateClub) {
            form.append(
                "picture",
                getPictureInput(imageUpdateClub, image64UpdateClub)
            );
        }
        form.append("name", nameUpdateClub);
        form.append("description", descriptionUpdateClub);
        form.append("room", roomUpdateClub);

        filesPost(
            "/clubs/" + route.params.id + "?_method=PUT",
            props.token,
            form,
            () => {
                setModalUpdateVisible(false);
                setImageUpdateClub(null);
                setImage64UpdateClub(null);
                getClub();
            }
        );
    };

    const closeNewPost = () => {
        setModalPostVisible(false);
        setTitlePost("");
        setDatePost("");
        setDateSelected(false);
        setDescriptionPost("");
        setImagePost(undefined);
        setImage64Post(null);
        setEnableNotificationPost(false);
    }

    const storePost = async () => {
        let form = new FormData();

        form.append("picture", imagePost ? getPictureInput(imagePost, image64Post) : null);

        form.append("title", titlePost);
        form.append("description", descriptionPost);
        form.append("enable_notifications", enableNotificationPost);
        form.append("club_id", club.id);

        filesPost("/clubs/posts", props.token, form, closeNewPost);
    };

    const handleChangeDate = (event, value) => {
        setDatePost(value);
        setDateSelected(true);
        setTimePickerVisible(false);
    };

    return (
        <View style={styles.main}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalUpdateVisible}
                onRequestClose={() => {
                    setModalUpdateVisible(!modalUpdateVisible);
                }}
            >
                <View style={modalStyle.modal}>
                    <View style={modalStyle.addPanel}>
                        <Text style={modalStyle.title}>Modifier le club</Text>
                        <TextInput
                            style={modalStyle.input}
                            placeholder="Nom"
                            value={nameUpdateClub}
                            onChangeText={setNameUpdateClub}
                        />
                        <TextInput
                            style={modalStyle.input}
                            placeholder="Description"
                            value={descriptionUpdateClub}
                            onChangeText={setDescriptionUpdateClub}
                        />
                        <TextInput
                            style={modalStyle.input}
                            placeholder="Salle"
                            value={roomUpdateClub}
                            onChangeText={setRoomUpdateClub}
                        />
                        <TouchableOpacity
                            style={modalStyle.imagePicker}
                            onPress={pickImageClub}
                        >
                            <Text style={modalStyle.textImagePicker}>
                                {imageUpdateClub == null ?
                                    "Modifier l'image" :
                                    "Image sélectionée"
                                }
                            </Text>
                        </TouchableOpacity>
                        {isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
                        <View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
                            <GlobalButton onPress={updateClub} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
                        </View>
                        <View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
                            <GlobalButton onPress={handleCloseClubModal} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPostVisible}
                onRequestClose={closeNewPost}
            >
                <View style={modalStyle.modal}>
                    <View style={modalStyle.addPanel}>
                        <Text style={modalStyle.title}>Nouveau post</Text>
                        <TextInput
                            style={modalStyle.input}
                            placeholder="Titre"
                            value={titlePost}
                            onChangeText={setTitlePost}
                        />
                        <TextInput
                            style={modalStyle.input}
                            placeholder="Description"
                            value={descriptionPost}
                            onChangeText={setDescriptionPost}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={200}
                        />
                        <TouchableOpacity style={dateSelected ? styles.dateSelected : modalStyle.imagePicker} onPress={() => setTimePickerVisible(true)}>
                            <Text style={dateSelected ? styles.textDateSelected : modalStyle.textImagePicker}>{dateSelected ? myToDateString(datePost) : "Sélectionner une date"}</Text>
                        </TouchableOpacity>
                        {timePickerVisible &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={datePost}
                            mode={"datetime"}
                            is24Hour={true}
                            display="default"
                            onChange={handleChangeDate}
                        />}
                        <TouchableOpacity
                            style={modalStyle.imagePicker}
                            onPress={pickImagePost}
                        >
                            <Text style={modalStyle.textImagePicker}>
                                {imagePost === undefined ?
                                    "Choisir une image" :
                                    "Image sélectionée"
                                }
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                        >
                            <BouncyCheckbox
                                size={25}
                                fillColor="#da291c"
                                unfillColor="#FFFFFF"
                                text="Activer les notifications"
                                iconStyle={{ borderColor: "#da291c" }}
                                textStyle={{
                                    textDecorationLine: "none",
                                }}
                                onPress={(isChecked) => {
                                    setEnableNotificationPost(isChecked);
                                }}
                            />
                        </View>
                        {isError ? <Text style={modalStyle.errorText}>Erreur détectée</Text> : null}
                        <View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
                            <GlobalButton onPress={storePost} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
                        </View>
                        <View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
                            <GlobalButton onPress={closeNewPost} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
                        </View>
                    </View>
                </View>
            </Modal>

            <ListModal
                title="Messages"
                visible={modalMessagesVisible}
                type="messages"
                list={messages}
                selectable={false}
                onClose={() => setModalMessagesVisible(false)}
            />
            <ListModal
                title="Ajouter un membre"
                visible={modalAddMemberVisible}
                list={serializeUsers(
                    users.filter(
                        (item) => !members.find((member) => member.id === item.id)
                    )
                )}
                selectable={true}
                onClose={() => setModalAddMemberVisible(!modalAddMemberVisible)}
                onConfirm={handleToggleMember}
            />
            <ListModal
                title="Retirer un membre"
                visible={modalRemoveMemberVisible}
                list={serializeUsers(members)}
                selectable={true}
                onClose={() => setModalRemoveMemberVisible(!modalRemoveMemberVisible)}
                onConfirm={handleToggleMember}
            />
            <ListModal
                title="Ajouter un responsable"
                visible={modalAddResponsibleVisible}
                list={serializeUsers(members.filter((item) => !responsibles.find((responsible) => responsible.id === item.id)))}
                selectable={true}
                onClose={() =>
                    setModalAddResponsibleVisible(!modalAddResponsibleVisible)
                }
                onConfirm={handleToggleResponsible}
            />
            <ListModal
                title="Retirer un responsable"
                visible={modalRemoveResponsibleVisible}
                list={serializeUsers(responsibles)}
                selectable={true}
                onClose={() =>
                    setModalRemoveResponsibleVisible(!modalRemoveResponsibleVisible)
                }
                onConfirm={handleToggleResponsible}
            />

            <Header title="GESTION DE CLUB" color="#da291c" user={props.user} />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 25,
                }}
            >
                <Image
                    source={{ uri: club.picture }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                    }}
                />
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                    >
                        {club.name}
                    </Text>
                    <Text style={{ fontSize: 17 }}>
                        {responsibles.length +
                            " responsable" +
                            (responsibles.length > 1 ? "s" : "")}
                    </Text>
                    <Text style={{ fontSize: 17 }}>
                        {members.length + " membre" + (members.length > 1 ? "s" : "")}
                    </Text>
                </View>
            </View>
            <RedLine />
            <ScrollView style={{maxHeight: '55%'}}>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalMessagesVisible(true)}>
                    <Text style={{fontSize: 25}}>Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalUpdateVisible(true)}>
                    <Text style={{fontSize: 25}}>Modifier le club</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalPostVisible(true)}>
                    <Text style={{fontSize: 25}}>Ecrire un nouveau post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalAddResponsibleVisible(true)}>
                    <Text style={{fontSize: 25}}>Ajouter un responsable</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalRemoveResponsibleVisible(true)}>
                    <Text style={{fontSize: 25}}>Retirer un responsable</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalAddMemberVisible(true)}>
                    <Text style={{fontSize: 25}}>Ajouter un membre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminButton} onPress={() => setModalRemoveMemberVisible(true)}>
                    <Text style={{fontSize: 25}}>Retirer un membre</Text>
                </TouchableOpacity>
            </ScrollView>
            <Navbar color="#da291c" user={props.user} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "rgb(250,250,250)",
    },
    adminButton: {
        height: 55,
        width: "90%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "5%",
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    bt: {
        marginTop: 15,
        borderColor: "#da291c",
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        width: "80%",
        marginLeft: "10%",
        backgroundColor: "white",
    },
    btText: {
        fontSize: 20,
        textAlign: "center",
    },
    modalButton: {
        marginTop: 10,
        backgroundColor: "#da291c",
        padding: 9,
        borderRadius: 100,
    },
    modal: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.15)",
    },
    panel: {
        backgroundColor: "white",
        width: "70%",
        padding: 50,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
    },
    btModalText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderColor: "rgb(200,200,200)",
        borderWidth: 1,
        borderRadius: 7,
        padding: 5,
        marginBottom: 5,
    },
    dateSelected: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 4,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40
    },
    textDateSelected: {
        color: "black",
        textAlign: "center"
    }
});

export default GestionClub;
