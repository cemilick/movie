import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements';
import axios from 'axios';
import MyModal from '../../components/Modal';
import { ScrollView } from 'react-native-gesture-handler';
import { fakeAPIBaseURL } from '../../helpers/apiAccessToken';
import colors from '../../res/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { logo,loading } from '../../assets/images'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import { Fumi } from 'react-native-textinput-effects';
import { cekEmail, cekPassword } from '../../utils/Registrasi';
import Lato from '../../components/Lato/Index'

export default function Index(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [validationEmail, setValidationEmail] = useState('')
  const [validationPassword, setValidationPassword] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [buttons, setButtons] = useState(true)

  const disable = (username ,password, email, firstName, lastName) => {
    console.log("password = ", password)
    console.log("email = ", email)
    if (password.length < 1 || email.length < 1 || username.length < 1 || firstName.length < 1 || lastName.length < 1 || validationEmail !== "VALID" || validationPassword != "Password Sudah Kuat") {
      return true
    }
    else {
      return false
    }
  }
  const createUser = async () => {
    try {
      const body = {
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
      setModalVisible2(true)
      const res = await axios.post(`${fakeAPIBaseURL}/users`, body);
      console.log(res)
      setModalVisible2(false)
      setModalVisible(true)

    } catch (error) {
      console.log(error);
    } finally{
      setModalVisible2(false)
    }
  }

  const CreateValidationPassword = ({ value }) => {
    if (value === "Password Sudah Kuat") {
      return (
        <Text style={{ color: 'green', fontSize: 12, marginTop: -30,marginLeft: wp('12%'), marginBottom: 10, zIndex: 10, fontFamily: 'Lato-Regular' }}>{value}</Text>
      )
    }
    else {
      return (
        <Text style={{ color: 'red', fontSize: 12, marginTop: -30,marginLeft: wp('12%'), marginBottom: 10, zIndex: 10, fontFamily: 'Lato-Regular' }}>{value}</Text>
      )
    }

  }

  const CreateValidationEmail = ({ value }) => {
    if (value === "VALID") {
      return (
        <Text style={{ color: 'green', fontSize: 12, marginTop: -30,marginLeft: wp('12%'), marginBottom: 10, zIndex: 10, fontFamily: 'Lato-Regular' }}>{value}</Text>
      )
    }
    else {
      return (
        <Text style={{ color: 'red', fontSize: 12, marginTop: -30,marginLeft: wp('12%'), marginBottom: 10, zIndex: 10, fontFamily: 'Lato-Regular' }}>{value}</Text>
      )
    }

  }

  return (
    <View style={styles.mainContainer}>
      <MyModal label="Daftar Akun" modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={props.navigation} target={'Login'} />
      <Modal visible={modalVisible2} transparent={true}>
        <View  style={{width: wp('100%'), height: hp('100%'), backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent:'center'}}>
        <View style={{height: hp('30%'),width: wp('60%'), justifyContent: 'center', alignItems: 'center'}}>
      <Lato size={16} type='Black'>Proses Register</Lato>
      </View>
      </View>
      </Modal>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={styles.topContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} resizeMode="contain" style={styles.logoSize} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Fumi
            label={'Email'}
            iconClass={FontAwesomeIcon5}
            iconName={'at'}
            iconColor={colors.primaryBlue}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ paddingBottom: 10,borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => {
              setEmail(text)
              setValidationEmail(cekEmail(text))
              setButtons(disable(username ,password, email, firstName, lastName))
            }}
          />
          
          <CreateValidationEmail value={validationEmail} />
          <Fumi
            label={'User Name'}
            iconClass={FontAwesomeIcon5}
            iconName={'user-alt'}
            iconColor={colors.primaryBlue}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => {
              setUsername(text)
              setButtons(disable(username ,password, email, firstName, lastName))
            }}
          />
          {/* <Text style={{ color: 'red' }}>{validationPassword}</Text> */}
          <Fumi
            label={'Password'}
            iconClass={FontAwesomeIcon5}
            iconName={'lock'}
            iconColor={colors.primaryBlue}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text)
              setValidationPassword(cekPassword(text))
              setButtons(disable(username ,password, email, firstName, lastName))
            }}
          />
          <CreateValidationPassword value={validationPassword} />
          <Fumi
            label={'First Name'}
            iconClass={FontAwesomeIcon5}
            iconName={'user-alt'}
            iconColor={colors.primaryBlue}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => {
              setFirstName(text)
              setButtons(disable(username ,password, email, firstName, lastName))
            }}
          />
          <Fumi
            label={'LastName'}
            iconClass={FontAwesomeIcon5}
            iconName={'user-alt'}
            iconColor={colors.primaryBlue}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{ borderTopLeftRadius: 12, borderBottomRightRadius: 12, marginBottom: 12, borderBottomColor: colors.primaryBlack, borderBottomWidth: 0.3 }}
            inputStyle={{ color: colors.primaryBlack }}
            onChangeText={(text) => {
              setLastName(text)
              setButtons(disable(username ,password, email, firstName, lastName))
            }}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="REGISTER"
              buttonStyle={{
                width: 200,
                backgroundColor: colors.primaryBlack,
                borderRadius: 5,
              }}
              onPress={createUser}
              disabled={buttons}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Lato>Already Have An Account?</Lato>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Lato type='Black'>Login here!</Lato>
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
    backgroundColor: colors.primaryWhite,
    alignItems: 'center'
  },
  bottomContainer: {
    width: wp('90%'),
    backgroundColor: colors.primaryBlue,
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