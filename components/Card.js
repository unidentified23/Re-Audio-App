import React from 'react';
import { View, StyleSheet } from 'react-native';


export default function Card (props) {

  return(
  <View style={styles.card}>
    <View style={styles.cardContent} >
         {props.children}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    card: {
     borderRadius:5,
     elavation:10,
     backgroundColor:'blue',
     shadowOffset:{width:2, height:2},
     shadowColor:'black',
     shadowOpacity:1,
     shadowRadius:2,
     marginHorizontal:4,
     marginVertical:6,
    },

    cardContent:{
      marginHorizontal: 18,
      marginVertical:10,
    },
});