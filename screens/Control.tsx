import React, { useState,useEffect } from 'react'
import Button from "../components/Button"
import { Text, View ,StyleSheet} from 'react-native'
const clickCloseButton = () =>{

}
const clickOpenButton = () =>{ 
  getData();
}

const getData = async() => {
  const url = "https:/10.0.2.2/"
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

const Control = () => {
  return (
    <View style={styles.container}>
        <Text></Text>
        <Button title="Open" onPress={clickOpenButton}></Button>
        <Button title="Close" onPress={clickCloseButton}></Button>

    </View>
    
  )
}

const styles = StyleSheet.create({
    container :{

    }

    }
)
export default Control