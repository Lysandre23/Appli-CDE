import "react-native-gesture-handler";
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
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

const Drawer = createDrawerNavigator();

function App({ navigation }) {
  const [token, setToken] = useState(null);
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
    if (token === null) {
      AsyncStorage.getItem("cde-token").then((item) => {
        if (item && typeof item !== undefined) {
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
  });

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
      DrawerActions.closeDrawer();
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
          is_admin: response.data.data.is_admin,
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
    <NavigationContainer>
      <FlashMessage position="top" />
      <Drawer.Navigator
        initialRouteName="Events"
        drawerContent={(props) =>
          user.email ? (
            <SideBar user={user} onDisconnect={handleDisconnect} />
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
          {(props) => <Profil user={user} token={token} />}
        </Drawer.Screen>
        <Drawer.Screen name="Office">
          {(props) => <Office user={user} token={token} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
