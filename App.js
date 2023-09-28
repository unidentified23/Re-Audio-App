import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'; // Import React and other necessary components
import { Button, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';


export default function App() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

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
        <Button
          onPress={() => playRecording(recordingLine.audioPath)}
          title='play'
        />
        <Button
          onPress={() => deleteRecording(index)}
          title="delete"
          color="red"
        />
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
     
      <Button 
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
        borderRadius={40}
      />
      
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BCD0C7",
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
  },


});
