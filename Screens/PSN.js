import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import ListModal from "../Components/ListModal";
import Api from "../Api";
import EventsCard from "../Components/EventsCard";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Circle from "../Components/Circle";
import modalStyle from "./Modal.style";
import GlobalButton from "../Components/GlobalButton";
import {SideBar} from "../Components/SideBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const psnOfficeId = 5;

const PSN = (props) => {
  const navigation = useNavigation();
  const [modalMemberVisible, setModalMemberVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [pendingEdit, setPendingEdit] = useState(null);

  const [office, setOffice] = useState({
    id: null,
    name: "",
    description: "",
  });

  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [sideBarShown, setSideBarShown] = useState(false)

  useEffect(() => {
    getOffice();
    getMembers();
    getPosts();
  }, []);

  const toggleSideBar = () => {
    setSideBarShown(!sideBarShown)
  }

  const getOffice = () => {
    Api.get("/offices/" + psnOfficeId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    })
        .then(function (response) {
      setOffice(response.data.data);
    })
        .catch(e => console.error("getOffice", e))
  };

  const getMembers = () => {
    Api.get("/offices/members/" + psnOfficeId)
        .then((response) => setMembers(response.data.data))
        .catch(e => console.error("getMembers", e))
  };

  const getPosts = () => {
    Api.get("/offices/posts/" + psnOfficeId)
        .then((response) => setPosts(response.data.data))
        .catch(e => console.error("getPosts", e))
  };

  const handleClickFollow = () => {
    Api.post("/subscribings",
        {
          office_id: office.id
        },
        {headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        }})
        .then((response) => getOffice())
        .catch(e => console.error("clickFollow", e))
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

  const handleDelete = (id) => {
    setPendingDelete(id);
    setDeleteModalVisible(true);
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setPendingDelete(null);
  };

  const confirmDelete = () => {
    Api.delete("/offices/posts/" + pendingDelete, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    }).then(function (response) {
      setPendingDelete(null);
      setDeleteModalVisible(false);
      getPosts();
    })
        .catch(e => console.error("confirmDelete", e))
  };

  const handleDisconnect = (value) => {
    if (value) {
      AsyncStorage.removeItem("cde-token");
    }
  };

  return (
    <View style={styles.main}>
      <Circle />
      <ListModal
        title="Membres du bureau"
        visible={modalMemberVisible}
        list={serializeUsers(members)}
        selectable={false}
        onClose={() => setModalMemberVisible(false)}
      />

      {props.user.is_admin ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(!deleteModalVisible);
          }}
        >
          <View style={modalStyle.modal}>
            <View style={modalStyle.addPanel}>
              <Text style={modalStyle.title}>Supprimer ce post</Text>
              <View style={{marginLeft: 20, marginRight: 20, marginTop: 15}}>
                <GlobalButton onPress={confirmDelete} padding={6} borderRadius={5} text="Valider" color="#2ecc71"/>
              </View>
              <View style={{marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15}}>
                <GlobalButton onPress={cancelDelete} padding={6} borderRadius={5} textColor="#da291c" borderColor="#da291c" text="Annuler" color="#ffffff"/>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}

      <Header color="#006fc0" title="PSN" toggleSideBar={toggleSideBar} user={props.user} token={props.token}/>
      {/*props.user.email && */ sideBarShown && <SideBar user={props.user} onDisconnect={props.handleDisconnect} {...props} />}
      <View style={styles.head}>
        <Image style={styles.img} source={{ uri: office.picture }} />
        <View style={styles.headButton}>
          {props.user.email ? (
            <TouchableOpacity style={styles.bt} onPress={handleClickFollow}>
              <Text style={styles.btText}>
                {office.is_followed ? "Ne plus suivre" : "Suivre"}
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.bt}
            onPress={() => {
              setModalMemberVisible(true);
            }}
          >
            <Text style={styles.btText}>Membres</Text>
          </TouchableOpacity>
          {props.user.email ? (
            <TouchableOpacity
              style={styles.bt}
              onPress={() => {
                navigation.navigate("Message", {
                  preOffice: "c-" + office.id,
                });
              }}
            >
              <Icon name="envelope-o" size={20} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.presText}>
        <Text>{office.description}</Text>
      </View>
      <View style={styles.line}></View>
      <ScrollView style={styles.list}>
        {posts.map((post) => (
          <EventsCard
            key={post.id}
            id={post.id}
            user={props.user}
            description={post.description}
            title={post.title}
            date={post.start_date}
            image={post.picture}
            editable={true}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>
      <Navbar color="#006FC0" user={props.user} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "rgb(250,250,250)",
    overflow: "hidden",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  headButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bt: {
    borderRadius: 7,
    padding: 10,
    fontSize: 20,
    marginRight: 5,
    backgroundColor: "#006FC0",
  },
  btText: {
    color: "white",
    fontWeight: "500",
  },
  presText: {
    textAlign: "justify",
    marginTop: 15,
    width: "90%",
    marginLeft: "5%",
  },
  line: {
    width: "90%",
    height: 2,
    borderWidth: 1,
    borderColor: "#006FC0",
    borderRadius: 2,
    marginLeft: "5%",
    marginTop: 20,
  },
});

export default PSN;
