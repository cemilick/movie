import {View, Text, Modal, Image, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ACCESS_TOKEN, baseUrl, imageUrl} from '../../helpers/apiAccessToken';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../res/colors';
import Lato from '../../components/Lato/Index';

export default function Index({route}) {
  const [movie, setMovie] = useState('');
  const [cast, setCast] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    getDetailsMovie(route.params.id);
  }, []);

  const createFlatListActors = () => {
    if (cast.length > 0) {
      return (
        <FlatList
          data={cast}
          renderItem={({item}) => (
            <View
              style={{
                width: wp('30%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Image
                source={{uri: `${imageUrl}${item.profile_path}`}}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  marginBottom: 5,
                }}
                resizeMode="cover"
              />
              <Lato color={colors.primaryBlack} style={{textAlign: 'center'}}>
                {item.name}
              </Lato>
            </View>
          )}
          scrollEnabled={false}
          numColumns={Math.ceil(cast.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
  };

  const getDetailsMovie = async id => {
    try {
      const results = await axios.get(`${baseUrl}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setMovie(results.data);
      setCast(results.data.credits.cast);
    } catch (err) {
      console.log(err);
    } finally {
      setVisible(false);
    }
  };

  return (
    <ScrollView
      style={{width: wp('100%'), height: hp('100%'), backgroundColor: 'black'}}>
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            width: wp('100%'),
            height: hp('100%'),
            backgroundColor: 'black',
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
            <Text style={{color: 'white', fontSize: 16}}>
              Sedang Mengambil Detail Movie
            </Text>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: colors.primaryBlue,
          width: wp('100%'),
          padding: 10,
        }}>
        <Lato
          type="Light"
          size={24}
          style={{textAlign: 'center', marginTop: 10}}>
          Movieku
        </Lato>
      </View>

      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Image
            resizeMode="contain"
            source={{uri: `${imageUrl}${movie.poster_path}`}}
            style={{width: 150, height: 220, marginRight: 10}}
          />
          <View style={{flex: 1}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              {movie.title}
            </Text>
            <Text style={{color: 'white', marginBottom: 10}}>
              "{movie.tagline}"
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Lato>Language </Lato>
                <Lato>Release Date </Lato>
                <Lato>Runtime </Lato>
                <Lato>Popularity </Lato>
                <Lato>Rating </Lato>
                <Lato>Status </Lato>
              </View>
              <View style={{width: wp('30%')}}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: 'white',
                    marginBottom: 5,
                    textTransform: 'uppercase',
                  }}>
                  : {movie.original_language}
                </Text>
                <Lato>: {movie.release_date}</Lato>
                <Lato>: {movie.runtime} minutes</Lato>
                <Lato>: {movie.popularity}</Lato>
                <Lato>
                  : <Lato type="Black">{movie.vote_average}</Lato> from{' '}
                  <Lato type="Black">{movie.vote_count}</Lato> votes
                </Lato>
                <Lato>: {movie.status}</Lato>
              </View>
            </View>
            <FlatList
              data={movie.genres}
              renderItem={({item}) => (
                <Text
                  style={{
                    color: 'white',
                    marginRight: 10,
                    padding: 5,
                    backgroundColor: colors.primaryBlue,
                    height: 27,
                    marginTop: 5,
                    borderRadius: 2,
                  }}>
                  {item.name}
                </Text>
              )}
              horizontal={true}
            />
          </View>
        </View>
        <View style={{marginBottom: 15, marginTop: 15}}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              padding: 10,
              borderRadius: 10,
              backgroundColor: colors.primaryBlue,
            }}>
            Synopsis
          </Text>
          <Text
            style={{
              backgroundColor: 'white',
              color: 'black',
              marginTop: -5,
              padding: 10,
              fontSize: 16,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            {movie.overview}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Lato-Black',
              color: 'white',
              fontSize: 20,
              padding: 15,
              borderRadius: 10,
              backgroundColor: colors.primaryBlue,
            }}>
            Actors
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              color: 'black',
              marginTop: -5,
              padding: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              {createFlatListActors()}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
