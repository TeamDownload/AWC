import React, { useState } from 'react'
import Button from "../components/Button"
import { Text, View ,StyleSheet} from 'react-native'
const clickCloseButton = () =>{

}
const clickOpenButton = () =>{ 
    exec().then(()=>{
      console.log("Success");
    });
}

function getData(){
    const response = fetch("https::localhost/8087/start")
    return response.then(res=>res.json)
}
async function exec(){
    var text;
    try {
      text = await getData();
      console.log(text);
    }
    catch(error){
      console.log(error);
    }
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