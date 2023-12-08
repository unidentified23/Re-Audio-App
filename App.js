import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/home';
import login from './screens/login';
import Register from './screens/Register';
import Profile from './screens/profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
      />
       <Stack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: false }}
      />

       <Stack.Screen
      name="login"
      component={login}
      options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}