import {View, Text, Image, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import axios from 'axios';
import MyModal from '../../components/Modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fakeAPIBaseURL} from '../../helpers/apiAccessToken';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../res/colors';
import {logo} from '../../assets/images';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import {Fumi} from 'react-native-textinput-effects';
import Lato from '../../components/Lato/Index';

export default function Index(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttons, setButtons] = useState(true);

  const disable = (password, email) => {
    console.log('password = ', password);
    console.log('email = ', email);
    if (password.length <= 1 || email.length <= 1) {
      return true;
    } else {
      return false;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const loginUser = async () => {
    // username: "mor_2314",
    // password: "83r5^_"

    try {
      const body = {
        username: username,
        password: password,
      };
      setModalVisible2(true);
      console.log('Proses Login...');
      const res = await axios.post(`${fakeAPIBaseURL}/auth/login`, body);
      console.log(res.data.token);
      setModalVisible(true);
    } catch (error) {
      alert('Username Atau Password Salah');
      console.log('token : ', error);
    } finally {
      setModalVisible2(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <MyModal
        label="Login"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
        target="Movie"
      />
      <Modal visible={modalVisible2} transparent={true}>
        <View
          style={{
            width: wp('100%'),
            height: hp('100%'),
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: hp('30%'),
              width: wp('60%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Lato type="Black" size={16}>
              Proses Login
            </Lato>
          </View>
        </View>
      </Modal>
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
          iconColor={colors.primaryBlue}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
            marginBottom: 12,
            borderBottomColor: colors.primaryBlack,
            borderBottomWidth: 0.3,
          }}
          inputStyle={{color: colors.primaryBlack}}
          onChangeText={text => {
            setUsername(text);
            setButtons(disable(password, username));
          }}
          onFocus={() => setButtons(disable(password, username))}
          onEndEditing={() => setButtons(disable(password, username))}
        />

        <Fumi
          label={'Password'}
          iconClass={FontAwesomeIcon5}
          iconName={'lock'}
          iconColor={colors.primaryBlue}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
            marginBottom: 12,
            borderBottomColor: colors.primaryBlack,
            borderBottomWidth: 0.3,
          }}
          inputStyle={{color: colors.primaryBlack}}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
            setButtons(disable(password, username));
          }}
          onFocus={() => setButtons(disable(password, username))}
          onEndEditing={() => setButtons(disable(password, username))}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="LOGIN"
            buttonStyle={{
              width: 200,
              backgroundColor: colors.primaryBlack,
              borderRadius: 5,
            }}
            onPress={loginUser}
            disabled={buttons}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: hp('10%')}}>
        <Lato>Didn't Have Any Account?</Lato>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Lato type="Black">Create new one!</Lato>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryBlack,
  },
  topContainer: {
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: colors.primaryWhite,
    alignItems: 'center',
  },
  bottomContainer: {
    width: wp('90%'),
    backgroundColor: colors.primaryBlue,
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
    marginTop: hp('10%'),
  },
  logoSize: {
    width: wp('70%'),
    height: hp('25%'),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp('3%'),
  },
});
