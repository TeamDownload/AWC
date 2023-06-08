/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import Button from '../components/Button';
import {useState, useEffect} from 'react';
import Weather from '../components/Weahter';
import WindowButtons from '../components/WindowButtons';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getWheatherAPI} from '../api/api';
import {getLocationAPI} from '../api/api';
import {HTTPGetData} from '../api/api';
const livingRoom = require('../assets/ico/livingRoom.png');
const kitchen = require('../assets/ico/kitchen.png');
const window = require('../assets/ico/window.png');
const bathroom = require('../assets/ico/bathroom.png');
const {width: SCREEN_WIDTH} = Dimensions.get('window');
export default function Main({navigation}: any) {
  const [location, setLocation] = useState('Loading...');
  const [granted, setGranted] = useState(false);
  const [weather, setWeahter] = useState('');
  const [temp, setTemp] = useState(0);
  const [footerTab, setFooterTab] = useState('Main');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const getWeather = async () => {
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      switch (result) {
        case RESULTS.GRANTED:
          Geolocation.getCurrentPosition(
            position => {
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);
              setGranted(true);
            },
            error => {
              console.log('Geolocation error', error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );

          getWheatherAPI({latitude, longitude}).then(data => {
            setTemp(data.main.temp);
            setWeahter(data.weather[0].main);
          });
          getLocationAPI({latitude, longitude})
            .then(data => {
              setLocation(data.documents[0].address_name);
            })
            .catch(error => {
              console.log(error);
            });

          break;
      }
    });
  };

  const windowData = [
    {
      key: 1,
      title: '창문',
      img: livingRoom,
    },
  ];
  useEffect(() => {
    getWeather();
  }, []);
  if (footerTab === 'Main') {
    return (
      <>
        <View style={styles.container}>
          {granted ? (
            <View style={styles.cityInfo}>
              <Text style={styles.cityName}>{location}</Text>
              <View style={styles.weather}>
                <Text style={styles.temp}>{temp}˚C</Text>
                <Weather weather={weather} />
              </View>
              <Button title="날씨 새로고침" onPress={getWeather} />
            </View>
          ) : (
            <View style={styles.unGranted}>
              <Button title="위치정보 설정하기" onPress={getWeather} />
              <Text style={{fontSize: 12}}>
                날씨 데이터를 위한 위치정보를 허가해주세요
              </Text>
            </View>
          )}

          <View style={styles.windows}>
            {windowData ? (
              windowData.map(data => (
                <WindowButtons
                  key={data.key}
                  title={data.title}
                  img={data.img}
                  onPress={() => {
                    navigation.navigate('Control', {
                      name: data.title,
                    });
                  }}
                />
              ))
            ) : (
              <Text style={{fontSize: 24, textAlign: 'center', width: '100%'}}>
                기기를 등록해주세요
              </Text>
            )}
          </View>
          <View style={styles.buttons}>
            <Button
              title="기기 등록"
              onPress={() => {
                navigation.navigate('기기등록');
              }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable style={activeFooter} onPress={() => setFooterTab('Main')}>
            <Text style={{color: 'white'}}>Main</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Setting')}>
            <Text style={{color: 'black'}}>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  } else if (footerTab == 'Setting') {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.buttons}>
            <Button
              title="Logout"
              onPress={() => {
                navigation.navigate('Splash');
              }}
            />
            <Button
              title="OPEN"
              onPress={() => {
                HTTPGetData();
              }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Main')}>
            <Text style={{color: 'black'}}>Main</Text>
          </Pressable>
          <Pressable
            style={activeFooter}
            onPress={() => setFooterTab('Setting')}>
            <Text style={{color: 'white'}}>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 16,
  },
  unGranted: {},
  windows: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 40,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
  footerTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'gray',
  },
  cityInfo: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    fontSize: 40,
    color: 'black',
  },
  description: {
    fontSize: 30,
    color: 'black',
  },
  buttons: {
    flex: 5,
    gap: 10,
  },
});
const activeFooter = StyleSheet.flatten([styles.footerTab, styles.active]);
