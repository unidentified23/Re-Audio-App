import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Form, Text, View, TextInput,TouchableOpacity, } from 'react-native';

export default function Login () {
  const [Email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const navigation = useNavigation(); 

  const handlelogin =()=>{
    navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
        

        <Text style={styles.LogTxt}>Mr Audio</Text>
        
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
        <TouchableOpacity style={styles.button} onPress={handlelogin} >
          <Text style={styles.BtnTxt}>Login</Text>
        </TouchableOpacity>

        
     

       <Text style={styles.LogTxt2}>Don't have an account?</Text>
       <Text style={styles.LogTxt3} onPress={()=> navigation.navigate("Register")} >Click here</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Loginput: {
    backgroundColor:"silver",
    width:"45%",
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
      fontWeight:"600",
      fontSize: 15 ,
      top:"10%",
      right:"10%",
    },
    LogTxt3: {
      fontWeight:"700",
      fontSize: 16,
       top:"7.3%",
       left:"20%",
       color :"grey",
    },
    button: {
      backgroundColor:"grey",
      width: "15%",
      height:"4%",
      borderRadius:20,
      borderWidth:5,
      marginVertical: "3%",
      borderColor:"grey",
    },

    BtnTxt : {
      paddingLeft:"10%",
      fontWeight: "600",
      color:"white",
    },
});
