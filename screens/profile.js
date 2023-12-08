import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput,TouchableOpacity, } from 'react-native';
import Bruno from '../assets/bruno.jpg';
import { useNavigation } from "@react-navigation/native";
import SignOut from '../components/SignOut';

export default function Profile () {
  const [Email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [ProfileItems, setProfileItems] = useState([
    { id:1, name:"innocent", surname:"Seaba", image:{Bruno}, email:"seabalapo@gmail.com"} 
  ]);
  const navigation = useNavigation();
  const toHome =()=>{
    navigation.navigate('Home');
  };

  const readDataFromFirestore = async (users, UYZNNpfVbcLZuPYVBIUN ) => {
    try {
      const ref = firebase.firestore().collection(users).doc(UYZNNpfVbcLZuPYVBIUN )
      const response = await ref.get()
      return response
    } catch (error) {
      return error
    }
  }
  
  return (
    <View style={styles.container}>
        

        <Text style={styles.LogTxt}>profile</Text>

        {ProfileItems.map((profile)=>(
                <View key={profile.id} style={styles.arrCont}>
                  <Image source={Bruno} style={styles.Pp} />
                  <View style={{bottom:"65%", left:"40%",}}>
                  <Text style={styles.txtname}>Name:       {profile.name}</Text>
                  <Text style={styles.txtsurname}>Surname: {profile.surname}</Text>
                  <Text style={styles.txtemail} >Email:       {profile.email}</Text>
                 </View>
                </View>
        ))}
        
       
      

        <TouchableOpacity style={styles.button} onPress={toHome}  >
          <Text style={styles.BtnTxt}>Recordings</Text>
        </TouchableOpacity>
        <SignOut/>
        

       

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrCont: {
    
    backgroundColor: 'black',
    width:"98%",
    height:"20%",
    
    
  },
  Loginput: {
    backgroundColor:"bisque",
    width:"45%",
    height:"5%",
    borderRadius:20,
    fontSize: 17,
    fontWeight:"600",
    color:"black",
    paddingLeft:"3%",
    marginVertical: "1%",
    borderBottomWidth: 5,

    },

    LogTxt: {
      fontWeight:"900",
      fontSize: 35 ,
      bottom:"15%",
      color:"white",
    },

    LogTxt2: {
      fontWeight:"600",
      fontSize: 15 ,
      top:"10%",
      
    },
    button: {
      backgroundColor:"white",
      width: "25%",
      height:"5%",
      borderRadius:20,
      borderWidth:5,
      marginVertical: "3%",
    },

    BtnTxt : {
      alignSelf:"center",
      paddingTop:"5%",
      fontWeight: "600",
    },

    Pp:{
        width:"35%",
        height:"85%",
        top:"7%",
        resizeMode: 'stretch',
        backgroundColor:'white',
        borderRadius:64,
        
    },

    txtname:{
        fontWeight:"600",
        color:"white",
        fontSize:15,
    },

    txtsurname:{
        fontWeight:"600",
        color:"white",
        fontSize:15,

    },
    txtemail:{
        fontWeight:"600",
        color:"white",
        fontSize:15,
    },
});
