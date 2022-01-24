import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import Login from './Screen/Login';
import Goodies from './Screen/Goodies';
import Events from './Screen/Event';
import Clubs from './Screen/Clubs';
import Partenaires from './Screen/Partenaires';
import PSN from './Screen/PSN';
import Message from './Screen/Message';
import Abonnement from './Screen/Abonnements';
import GestionClub from './Screen/GestionClub';
import Role from './Screen/Role';
import Club from './Screen/Club';
import Admin from './Screen/Admin';
import { SideBar } from './Components/SideBar';
import RoleOneUser from './Screen/RoleOneUser';
import ListGestionClub from './Screen/ListGestionClub';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" drawerContent={props => <SideBar />}
        screenOptions={{headerShown: false}}
      >
        <Drawer.Screen name="Events" component={Events} />
        <Drawer.Screen name="Goodies" component={Goodies} />
        <Drawer.Screen name="Clubs" component={Clubs} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Partenaires" component={Partenaires} />
        <Drawer.Screen name="PSN" component={PSN} />
        <Drawer.Screen name="Message" component={Message} />
        <Drawer.Screen name="Abonnements" component={Abonnement} />
        <Drawer.Screen name="GestionClub" component={GestionClub} />
        <Drawer.Screen name="Role" component={Role} />
        <Drawer.Screen name="Club" component={Club} />
        <Drawer.Screen name="Admin" component={Admin} />      
        <Drawer.Screen name="RoleOneUser" component={RoleOneUser} />
        <Drawer.Screen name="ListGestionClub" component={ListGestionClub}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;