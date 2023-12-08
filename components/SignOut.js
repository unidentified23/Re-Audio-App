import React, { useState, useEffect } from 'react';
import { View, Button, Alert,Pressable } from 'react-native';
import { authentication } from '../screens/config';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';


const AuthButton = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  async function handleSignOut () {
    try {  
      await authentication.signOut();
      Alert.alert('Sign Out', 'User signed out successfully.');
      navigation.navigate('login');
      
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'An error occurred while signing out.');
    }
  };

  return (
    <View >
      {user ? (
        // User is authenticated, show sign-out button
        <Button   title="Sign Out" onPress={handleSignOut} />
      ) : (
        // User is not authenticated, show sign-in button
        // You'll need to replace 'YourSignInComponent' with the actual component for signing in
        <Button  title="Login" onPress={() => navigation.navigate("login") } />
      )}
    </View>
  );
};

export default AuthButton;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  abtTxt1 : {
    fontWeight:"600",
    width:"50%",
    height:"30%",
    fontSize: 17,
    left: "20%",
    bottom:"30%",
    marginVertical:"2%",


  },

});

