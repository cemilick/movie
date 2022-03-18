import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ACCESS_TOKEN, baseUrl, imageUrl } from '../../helpers/apiAccessToken'

export default function Index(props) {
  const [listMovies, setListMovies] = useState([]);
  const [weight1, setWeight1] = useState("bold");
  const [weight2, setWeight2] = useState("normal");
  const [weight3, setWeight3] = useState("normal");

  const isActive = (label) => {
    if(label === "now_playing"){
      setWeight1('bold')
      setWeight2('normal')
      setWeight3('normal')
    } else if(label === "popular"){
      setWeight1('normal')
      setWeight2('bold')
      setWeight3('normal')
    } else if(label === "top_rated"){
      setWeight1('normal')
      setWeight2('normal')
      setWeight3('bold')
    }
  }

  const getListMovies = async (endpoint) => {
    try{
      const results = await axios.get(`${baseUrl}/movie/${endpoint}`, {headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }})
      
      setListMovies(results.data.results)
    }catch(err){
      console.log(err);
    }
  }
  
  const CardMovie = ({item}) => {
    return (
        <View style={{
          width: Dimensions.get('window').width/3,
          alignItems: 'center',
          marginTop: 10 }}>
          <Image source={{uri: `${imageUrl}${item.poster_path}`}} style={{
            width: 100,
            height: 100 }} />
          <Text style={{textAlign: 'center'}}>{item.title}</Text>
        </View>
    )
  }

  useEffect(() => {
    getListMovies('now_playing');
  }, [])

  return (
    <View style={{
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 10
        }}>
      <Text style={{
        fontSize: 20, 
        fontWeight: 'bold'
        }}>List Movies</Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#b80617', 
        width: Dimensions.get('window').width,
        padding: 10
          }}>
        <TouchableOpacity onPress={() => {
          getListMovies('now_playing')
          isActive('now_playing')
          }} >
          <Text style={{color: 'white', fontWeight: weight1}}>Now Playing</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          getListMovies('popular')
          isActive('popular')
          }}>
          <Text style={{color: 'white', fontWeight: weight2}}>Most Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {getListMovies('top_rated')
      isActive('top_rated')}}>
          <Text style={{color: 'white', fontWeight: weight3}}>Top Rated</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignContent: 'center',
      }}>
        <FlatList 
        data={listMovies} 
        keyExtractor={(item, index) => index} 
        renderItem={CardMovie} 
        numColumns={3} style={{
        width: Dimensions.get('window').width,
        }}/>
      </View>
    </View>
  )
}