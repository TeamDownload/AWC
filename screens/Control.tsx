import React, { useState } from 'react'
import Button from "../components/Button"
import { Text, View ,StyleSheet} from 'react-native'
const clickCloseButton = () =>{

}
const clickOpenButton = () =>{
    
}
const [time,setTime] = useState("");

const Control = () => {
  return (
    <View style={styles.container}>
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