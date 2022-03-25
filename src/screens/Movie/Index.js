import { View, Text, FlatList, Image, Pressable, SafeAreaView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ACCESS_TOKEN, baseUrl, imageUrl } from '../../helpers/apiAccessToken'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ClipLoader from "react-spinners/ClipLoader";
import colors from '../../res/colors'
import Lato from '../../components/Lato/Index'

export default function Index(props) {
  const [listMovies, setListMovies] = useState([]);
  const [listMovies2, setListMovies2] = useState([]);
  const [visible, setVisible] = useState(true)
  
  const getListMovies = async () => {
    try{
      console.log('start')
      const results = await axios.get(`${baseUrl}/movies`, {headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }})
      console.log('end')
      
      setListMovies(results.data.results)
      setListMovies2(results.data.results)
    }catch(err){
      console.log(err);
    }finally{
      setVisible(false)
    }
  }
  
  const CardMovie = ({item}) => {
    return (
      <Pressable onPress={() => {
        props.navigation.navigate('Details', {id: item.id})
        }}>
        <View style={{
          width: wp('30%'),
          alignItems: 'center',
          marginTop: 10 }}>
          <Image resizeMode='contain' source={{uri: `${imageUrl}${item.poster_path}`}} style={{
            width: 200,
            height: 150 }} />
        </View>
        </Pressable>
    )
  }

  const CardMovie2 = ({item}) => {
    return (
      <Pressable onPress={() => {
        props.navigation.navigate('Details', {id: item.id})
        }} style={{
          flexDirection: 'row',
           justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: colors.primaryBlue,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10}}>
        <View style={{
          width: wp('30%'),
          alignItems: 'center',
          }}>
          <Image resizeMode='cover' source={{uri: `${imageUrl}${item.poster_path}`}} style={{
            width: 115,
            height: 150, marginRight: 10, borderRadius: 8 }} />
        </View>
        <View style={{width: wp('60%')}}>
          <Lato style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{item.title}</Lato>
          <View style={{color: 'white',  borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 5}}/>
          <Lato numberOfLines={4} style={{color: "white"}}>{item.overview}</Lato>
          <Lato style={{color: 'white', marginTop: 5, marginBottom: 10}}>Release Date : {item.release_date}</Lato>
          <Lato style={{color: "white"}}>
            <Lato>Popularity : </Lato> 
            <Lato style={{fontWeight: 'bold'}}>{item.popularity}</Lato>
          </Lato>
        </View>
        </Pressable>
    )
  }

  useEffect(() => { 
    getListMovies();
  }, [])

  return (
    <SafeAreaView style={{width: wp('100%'), flex: 1, padding: 10, backgroundColor: 'black'}}>
      <Modal visible={visible} transparent={true}>
        <View  style={{width: wp('100%'), height: hp('100%'), backgroundColor: 'black', alignItems: 'center', justifyContent:'center'}}>
          <View style={{height: hp('30%'),width: wp('60%'), justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white',  fontSize: 16}}>Sedang Mengambil Semua Movie</Text>
          </View>
        </View>
      </Modal>
      <View style={{backgroundColor: colors.primaryBlue, width: wp('100%'), margin: -10, padding: 10}}>
        <Lato type='Light' size={24} style={{textAlign: 'center', marginTop: 10}}>Movieku</Lato>
      </View>
        <View style={{flex: 1, marginTop: 20}}>
          <Lato  style={{color: "white", fontSize: 19}}>Recommended Movies</Lato>
          <FlatList 
          data={listMovies} 
          keyExtractor={(item, index) => index} 
          renderItem={CardMovie} 
          showsHorizontalScrollIndicator={false}
          horizontal={true} contentContainerStyle={{
            alignSelf: 'flex-start'
        }}/>
        </View>
      <View style={{marginTop: -hp('40%'), flex: 1}}>
        <Lato style={{color: "white", fontSize: 19, height: 40}}>Latest Upload Movies</Lato>
        <FlatList 
        data={listMovies2} 
        keyExtractor={(item, index) => index} 
        renderItem={CardMovie2} 
        showsHorizontalScrollIndicator={false}
         contentContainerStyle={{
          alignSelf: 'flex-start'
      }}/>
      </View>
    </SafeAreaView>
  )
}