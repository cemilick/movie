import { View, Modal, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function MyModal(props) {
    return (
      <Modal animationType="fade" transparent={true} visible={props.modalVisible} onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../../assets/images/success.png')} style={styles.modalImage} resizeMode='contain' />
            <Text style={{color: 'white', marginBottom: 10, fontSize: 16}}>Berhasil {props.label}</Text>
            <TouchableOpacity style={{backgroundColor: '#b80617', padding: 10, borderRadius: 5}} color='#0D28A6' onPress={() => {
                props.setModalVisible(!props.modalVisible)
                props.navigation.navigate(props.target)
                } }>
              <Text style={{color: 'white'}}>Lanjutt!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}

const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
    modalContainer: {
        width: dimensions.width,
        height: dimensions.height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: 300,
        height: 200,
        backgroundColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white'
    },
    modalImage: {
        width: 100, 
        height: 100
    }
});