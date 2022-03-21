import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements';
import axios from 'axios';
import MyModal from '../../components/Modal';
import { ScrollView } from 'react-native-gesture-handler';
import { fakeAPIBaseURL } from '../../helpers/apiAccessToken';
import colors from '../../res/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { logo } from '../../assets/images'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import { Fumi } from 'react-native-textinput-effects';
import { cekEmail, cekPassword } from '../../utils/Registrasi';


export default function Index(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [validationEmail, setValidationEmail] = useState('')
  const [validationPassword, setValidationPassword] = useState('')


  const [modalVisible, setModalVisible] = useState(false)

  const createUser = async () => {
    try {
      const body = await {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstName,
          lastname: lastName
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496'
          }
        },
        phone: '1-570-236-7033'
      };
      const res = await axios.post(`${fakeAPIBaseURL}/users`, body);
      console.log(res)
      setModalVisible(true)

    } catch (error) {
      console.log(error);
    }
  }

  const CreateValidationPassword = ({ value }) => {
    if (value === "Password Sudah Kuat") {
      return (
        <Text style={{ color: 'green' }}>{value}</Text>
      )
    }
    else {
      return (
        <Text style={{ color: 'red' }}>{value}</Text>
      )
    }

  }

  const CreateValidationEmail = ({ value }) => {
    if (value === "Password Sudah Kuat") {
      return (
        <Text style={{ color: 'green' }}>{value}</Text>
      )
    }
    else {
      return (
        <Text style={{ color: 'red' }}>{value}</Text>
      )
    }

  }

  return (
    <View style={styles.mainContainer}>
      <MyModal label="Daftar Akun" modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={props.navigation} target={'Login'} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={styles.topContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} resizeMode="contain" style={styles.logoSize} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CreateValidationEmail value={validationEmail} />
          <Fumi
            label={'Email'}
            iconClass={FontAwesomeIcon5}
            iconName={'at'}
            iconColor={'#f7971e'}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => {
              setEmail(text)
              setValidationEmail(cekEmail(text))
            }}
            onEndEditing={() => setValidationEmail("")}
          />

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
            onChangeText={(text) => setUsername(text)}
          />
          {/* <Text style={{ color: 'red' }}>{validationPassword}</Text> */}
          <CreateValidationPassword value={validationPassword} />
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
              setValidationPassword(cekPassword(text))
            }}
            onEndEditing={() => setValidationPassword("")}
          />
          <Fumi
            label={'First Name'}
            iconClass={FontAwesomeIcon5}
            iconName={'user-alt'}
            iconColor={'#f7971e'}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => setFirstName(text)}
          />
          <Fumi
            label={'LastName'}
            iconClass={FontAwesomeIcon5}
            iconName={'user-alt'}
            iconColor={'#f7971e'}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => setLastName(text)}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="REGISTER"
              buttonStyle={{
                width: 200,
                backgroundColor: '#f7971e',
                borderRadius: 5,
              }}
              onPress={createUser}
              disabled={true}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'white' }}>Already Have An Account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Login here!</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    alignItems: 'center'
  },
  bottomContainer: {
    width: wp('90%'),
    backgroundColor: colors.primaryWhite,
    marginTop: hp('-30%'),
    borderRadius: 12,
    paddingVertical: hp('5%'),
    paddingHorizontal: wp('5%'),
    elevation: 3,
  },
  logoContainer: {
    width: wp('60%'),
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: hp('5%')
  },
  logoSize: {
    width: wp('60%'),
    height: hp('20%'),
  },
  inputContainer: {
    flex: 1
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp('3%')
  }

})