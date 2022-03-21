import { View, Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements';
import axios from 'axios';
import MyModal from '../../components/Modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fakeAPIBaseURL } from '../../helpers/apiAccessToken';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../res/colors';
import { logo } from '../../assets/images'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import { Fumi } from 'react-native-textinput-effects';


export default function Index(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttons, setButtons] = useState(true)

  const disable = (password, email) => {
    console.log("password = ", password)
    console.log("email = ", email)
    if (password.length <= 1 || email.length <= 1) {
      return true
    }
    else {
      return false
    }
  }

  const [modalVisible, setModalVisible] = useState(false)

  const createUser = async () => {
    // username: "mor_2314",
    // password: "83r5^_"

    try {
      const body = await {
        username: username,
        password: password,
      };
      const res = await axios.post(`${fakeAPIBaseURL}/auth/login`, body)
      console.log(res.data.token)
      setModalVisible(true)
    } catch (error) {
      alert("Username Atau Password Salah")
      console.log("token : ", error)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <MyModal label="Login" modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={props.navigation} target='Movie' />
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={styles.logoSize} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Fumi
          label={'User Name'}
          iconClass={FontAwesomeIcon5}
          iconName={'user-alt'}
          iconColor={'#f7971e'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
          inputStyle={{ color: colors.primaryBlack }}
          onChangeText={(text) => {
            setUsername(text)
            setButtons(disable(password, username))
          }}
          onFocus={() => setButtons(disable(password, username))}
          onEndEditing={() => setButtons(disable(password, username))}
        />

        <Fumi
          label={'Password'}
          iconClass={FontAwesomeIcon5}
          iconName={'lock'}
          iconColor={'#f7971e'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
          inputStyle={{ color: colors.primaryBlack }}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text)
            setButtons(disable(password, username))
          }}
          onFocus={() => setButtons(disable(password, username))}
          onEndEditing={() => setButtons(disable(password, username))}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="LOGIN"
            buttonStyle={{
              width: 200,
              backgroundColor: '#f7971e',
              borderRadius: 5,
            }}
            onPress={createUser}
            disabled={buttons}
          />
        </View>

      </View>
      <View style={{ alignItems: 'center', marginTop: hp('10%') }}>
        <Text style={{ color: 'white' }}>Didn't Have Any Account?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Create new one!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryBlack
  },
  topContainer: {
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
  },
  bottomContainer: {
    width: wp('90%'),
    backgroundColor: colors.primaryWhite,
    marginTop: hp('-15%'),
    borderRadius: 12,
    paddingVertical: hp('5%'),
    paddingHorizontal: wp('5%'),
    elevation: 3,
  },
  logoContainer: {
    width: wp('70%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: hp('10%')
  },
  logoSize: {
    width: wp('70%'),
    height: hp('25%'),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp('3%')
  }
})