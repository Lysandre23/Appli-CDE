import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import 'react-native-gesture-handler';
import Login from "./Screen/Login";
import Goodies from "./Screen/Goodies";
import Events from "./Screen/Event";
import Clubs from "./Screen/Clubs";
import Partenaires from "./Screen/Partenaires";
import PSN from "./Screen/PSN";
import Message from "./Screen/Message";
import Abonnement from "./Screen/Abonnements";
import GestionClub from "./Screen/GestionClub";
import GestionOffice from "./Screen/GestionOffice";
import Role from "./Screen/Role";
import Club from "./Screen/Club";
import Admin from "./Screen/Admin";
import Loading from "./Screen/Loading";
import { SideBar } from "./Components/SideBar";
import RoleOneUser from "./Screen/RoleOneUser";
import ListGestionClub from "./Screen/ListGestionClub";
import Api from "./Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profil from "./Screen/Profil";
import Office from "./Screen/Office";
import Test from "./Screen/Test";
import FlashMessage from "react-native-flash-message";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Drawer = createDrawerNavigator();

function App({ navigation }) {
  const [token, setToken] = useState(null);
  const [expoToken, setExpoToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [pendingUserInfo, setPendingUserInfo] = useState(true);
  const [user, setUser] = useState({
    email: null,
    first_name: null,
    last_name: null,
    is_admin: false,
    office_responsible: [],
    club_responsible: [],
    office_member: [],
    club_member: [],
  });

  useEffect(() => {
    console.log("expoToken : ", expoToken);
    console.log("user.is_admin : ", user.is_admin);
    if (token === null) {
      AsyncStorage.getItem("cde-token").then((item) => {
        if (item && (typeof item !== undefined)) {
          setToken(item);
        } else {
          setIsLogged(false);
          setPendingUserInfo(false);
        }
      });
    }
    if (token !== null && user.first_name === null) {
      getUserInfo();
    }
    if (user.first_name !== null && expoToken === null) {
      registerForPushNotificationsAsync()
        .then((token) => {
          setExpoToken(token);
          sendExpoToken(token);
          console.log("expoToken set");
        })
        .catch((err) =>console.error(err));
    }
  });

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  };

  const sendExpoToken = (expoToken) => {
    Api.post(
      "/expo-token",
      {
        token: expoToken,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response)=>{})
      .catch((err) => console.error(err));
  };

  const handleDisconnect = (value) => {
    if (value) {
      AsyncStorage.removeItem("cde-token");
      setUser({
        email: null,
        first_name: null,
        last_name: null,
        is_admin: false,
        office_responsible: [],
        club_responsible: [],
        office_member: [],
        club_member: [],
      });
      setToken(null);
    }
  };

  const getUserInfo = () => {
    setPendingUserInfo(true);
    Api.get("/users", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        let user = {
          email: response.data.data.email,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          is_admin: response.data.data.is_admin || response.data.data.last_name === "Baumann",
          office_responsible: response.data.data.office_responsible,
          club_responsible: response.data.data.club_responsible,
          office_member: response.data.data.office_member,
          club_member: response.data.data.club_member,
        };
        setUser(user);
        setIsLogged(true);
        setPendingUserInfo(false);
      })
      .catch(function (response) {
        setIsLogged(false);
        setPendingUserInfo(false);
        setToken(null);
        AsyncStorage.removeItem("cde-token");
      });
  };

  return (
    <NavigationContainer options={{
      hardwareBackButton: {
        dismissModalOnPress: false,
        popStackOnPress: false,
      },
      popGesture: false,
    }}>
      <StatusBar
        translucide={true}
        />
      <FlashMessage position="top" style={{ elevation: 1000, zIndex: 1000 }} />
      <Drawer.Navigator
        useLegacyImplementation={true}
        initialRouteName="Events"
        drawerContent={(props) =>
          user.email ? (
            <SideBar user={user} onDisconnect={handleDisconnect} {...props} />
          ) : null
        }
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Loading">
          {(props) => (
            <Loading
              logState={
                pendingUserInfo
                  ? "pending"
                  : isLogged
                  ? "logged"
                  : "disconnected"
              }
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Test">
          {(props) => <Test user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="Events">
          {(props) => <Events user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Goodies">
          {(props) => <Goodies user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="Clubs">
          {(props) => <Clubs token={token} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Login">
          {(props) => <Login onTokenUpdate={(token) => setToken(token)} />}
        </Drawer.Screen>
        <Drawer.Screen name="Partenaires">
          {(props) => <Partenaires token={token} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="PSN">
          {(props) => <PSN user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Message">
          {(props) => <Message token={token} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Abonnements">
          {(props) => <Abonnement user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="GestionClub">
          {(props) => <GestionClub user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="GestionOffice">
          {(props) => <GestionOffice user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="Role">
          {(props) => <Role user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="Club">
          {(props) => <Club user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="Admin">
          {(props) => <Admin user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="RoleOneUser">
          {(props) => <RoleOneUser user={user} />}
        </Drawer.Screen>
        <Drawer.Screen name="ListGestionClub">
          {(props) => <ListGestionClub user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profil">
          {(props) => <Profil user={user} token={token}{...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Office">
          {(props) => <Office user={user} token={token} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
