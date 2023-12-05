import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Form, Text, View, TextInput,TouchableOpacity, } from 'react-native';
import { db } from "./config.js";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// import  Card from '../components/Card.js';


export default function Register () {
  const [Email, onChangeEmail] = useState('');
  const [name, onChangeName] = useState('');
  const [surname, onChangeSurname] = useState('');
  const [password, onChangePassword] = useState('');
  const navigation = useNavigation();
  const authentication =getAuth();
  const handleSignUp = async ()=> {
     
    try {

       const CreateUser =  await createUserWithEmailAndPassword(authentication, Email, password);
       console.log(CreateUser);
       const dbh = collection(db,"users");
       const userData = {
        name,
        surname,
        Email,
       };
       const docRef = addDoc(dbh,userData);
       console.log("User data added with ID: ",docRef.id);
       alert("Welcome"+name);
       navigation.navigate("Home");

    }catch(error){
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("sign in failed: "+ errorMessage)
    
    } 
   
  }
   
   


  return (
    <View style={styles.container}>
        

    
    <Text style={styles.LogTxt}>Sign Up</Text>
   
  
       <TextInput
          style={styles.Loginput}
          onChangeText={onChangeName}
          value={name}
          placeholder='Enter your name'
        />
       
      
         
          <TextInput
          style={styles.Loginput}
          onChangeText={onChangeSurname}
          value={surname}
          placeholder='Enter your surname'
        />
          <TextInput
          style={styles.Loginput}
          onChangeText={onChangeEmail}
          value={Email}
          placeholder='Enter your Email'
        />
        
        <TextInput
          style={styles.Loginput}
          onChangeText={onChangePassword}
          value={password}
          placeholder='Enter your Password'
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}  >
        
         <Text style={styles.BtnTxt}>Register</Text>
        
        </TouchableOpacity>

        

        
     

       <Text style={styles.LogTxt2}>Already have an account?</Text>
       <Text style={styles.LogTxt3}  onPress={()=> navigation.navigate("login")} >Click here</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Loginput: {
    backgroundColor:"#F6F6F9",
    width:"65%",
    height:"5%",
    borderRadius:20,
    fontSize: 17,
    fontWeight:"600",
    color:"black",
    paddingLeft:"3%",
    marginVertical: "1%",
    borderWidth: 5,
    borderColor:"grey",

    },

    LogTxt: {
      fontWeight:"900",
      fontSize: 35 ,
      bottom:"15%",
      color:"grey",
    },

    LogTxt2: {
      fontWeight:"700",
      fontSize: 16,
      top:"10%", 
      right:"5%",
    },
    LogTxt3: {
        fontWeight:"700",
        fontSize: 16,
         top:"7.3%",
         left:"30%",
         color :"grey",
      },

    button: {
      backgroundColor:"grey",
      width: "22%",
      height:"4%",
      borderRadius:20,
      borderWidth:5,
      borderColor:"grey",
      marginVertical: "3%",
    },

    BtnTxt : {
      paddingLeft:"10%",
      fontSize:16,
      fontWeight: "600",
      color:"white",
      alignSelf:"center",
      
    },
});
