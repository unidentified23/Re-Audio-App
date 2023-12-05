import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'; // Import React and other necessary components
import {StyleSheet, ScrollView, Text, View,TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function Home () {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const navigation=useNavigation();

  useEffect(() => {
    // Request audio recording permission when the component mounts
    Audio.requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        setMessage("Permission to access the microphone is required.");
      }
    });
  }, []);

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        const audioPath = recording.getURI();
        const durationMillis = status.durationMillis;
        const durationFormatted = getDurationFormatted(durationMillis);

        const updatedRecordings = [...recordings, { sound, durationFormatted, audioPath }];
        setRecordings(updatedRecordings);
        setRecording(null);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }

  function getDurationFormatted(millis) {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.round((millis % (1000 * 60)) / 1000);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${secondsDisplay}`;
  }

  async function playRecording(audioPath) {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: audioPath });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }


  function deleteRecording(index) {
    try{
    const updatedRecordings = [...recordings];  //copying the current recordings array
    updatedRecordings.splice(index,1);  //removing a recording at the specified index

    setRecordings(updatedRecordings); //update the state of recordings with the updated recording array
  } catch (error) {
    console.error('Errror playing sound:',error)
    }
  }

  function getRecordingLines() {

    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording {index + 1} - {recordingLine.durationFormatted}
        </Text>
        <TouchableOpacity
          onPress={() => playRecording(recordingLine.audioPath)}
          style={styles.PBtn}
        > 
        <AntDesign name="caretright" size={30} color="white" style={styles.PTxt} />
        
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteRecording(index)}
          style={styles.DBtn}
        >
          <AntDesign name="delete" size={30} color="white" style={styles.DTxt} />
             
        </TouchableOpacity>
      </View>
    ));
  }

  function GotoProfile(){
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.PpBtn} onPress={GotoProfile}>

      <AntDesign name="profile" size={34} color="#BCD0C7" style={{ alignSelf:"center"}} />
      </TouchableOpacity>

      <Text>{message}</Text>
     
      <TouchableOpacity 
        onPress={recording ? stopRecording : startRecording} 
        style={styles.RBtn}

      >
          <Text style={styles.RTxt} >{recording ? <MaterialCommunityIcons name="stop-circle" size={45} color="black" /> : <MaterialCommunityIcons name="record-rec" size={50} color="black" style={styles.icon}  />}</Text> 
      </TouchableOpacity>

      <View style={{width:"100%", height:"50%", top:"16%"}}>
        <ScrollView>
        {getRecordingLines()}
        </ScrollView>
      </View> 

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"grey",
    margin:"1%",

  },
  fill: {
    flex: 1,
    margin: 16,
    color:"white",
    fontSize:20,
    fontWeight:"500",

  },
  PBtn:{
   backgroundColor:"grey",
   width:"12%",
   height:"55%",
   borderRadius:13,
  },
  DBtn:{
    backgroundColor:"grey",
    width:"12%",
    height:"55%",
    borderRadius:13,
   },
   
   DTxt:{
    fontWeight:"600",
    alignSelf:"center",
    top:"10%",
    
   },
   PTxt:{
    fontWeight:"600",
    alignSelf:"center",
    top:"10%",
    color:"white",
   },
   RBtn:{
    backgroundColor:"#BCD0C7",
    width:"15%",
    height:"7%",
    borderRadius:25,
    alignItems:"center",
  
   },
   RTxt:{
      top:"5%",
   },
   
   PpBtn:{
    backgroundColor:"black",
    borderWidth:5,
    borderColor:"#BCD0C7",
    width:"12%",
    height:"6%",
    borderRadius:13,
    bottom:"13%",
    left:"40%",
   },

});
