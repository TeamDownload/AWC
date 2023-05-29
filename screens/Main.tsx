/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Linking,
} from 'react-native';
import Button from '../components/Button';
import {useState, useEffect} from 'react';
import Weather from '../components/Weahter';
import WindowButtons from '../components/WindowButtons';
import Geolocation from 'react-native-geolocation-service';
import {Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getWheatherAPI} from '../api/api';
import {getLocationAPI} from '../api/api';
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
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          setGranted(false);
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
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
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    });
  };

  const windowData = [
    {
      key: 1,
      title: '거실',
      img: livingRoom,
    },
    {
      key: 2,
      title: '화장실',
      img: bathroom,
    },
    {
      key: 3,
      title: '주방',
      img: kitchen,
    },
    {
      key: 4,
      title: '다목적실',
      img: window,
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
            <>
              <View style={styles.cityInfo}>
                <Text style={{fontSize: 24}}>{location}</Text>
                <View style={styles.weather}>
                  <Text style={styles.temp}>{temp}˚C</Text>
                  <Weather weather={weather} />
                </View>
              </View>
            </>
          ) : (
            <View style={styles.unGranted}>
              <Button title="위치정보 설정하기" onPress={getWeather} />
              <Text style={{fontSize: 12}}>
                날씨 데이터를 위한 위치정보를 허가해주세요
              </Text>
            </View>
          )}

          <View style={styles.windows}>
            {windowData.map(data => (
              <WindowButtons
                key={data.key}
                title={data.title}
                img={data.img}
                onPress={() => {
                  navigation.navigate('Control');
                }}
              />
            ))}
          </View>
          <View style={styles.buttons}>
            <Button title="날씨 새로고침" onPress={getWeather} />
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
            onPress={() => setFooterTab('Scenario')}>
            <Text>Scenario</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Setting')}>
            <Text>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  } else if (footerTab == 'Scenario') {
    return (
      <>
        <View style={styles.container}>
          <Text>{footerTab}</Text>
          <View style={styles.buttons} />
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Main')}>
            <Text>Main</Text>
          </Pressable>
          <Pressable
            style={activeFooter}
            onPress={() => setFooterTab('Scenario')}>
            <Text style={{color: 'white'}}>Scenario</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Setting')}>
            <Text>Setting</Text>
          </Pressable>
        </View>
      </>
    );
  } else if (footerTab == 'Setting') {
    return (
      <>
        <View style={styles.container}>
          <Text>{footerTab}</Text>
          <View style={styles.buttons}>
            <Button
              title="Logout"
              onPress={() => {
                navigation.navigate('Splash');
              }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Main')}>
            <Text>Main</Text>
          </Pressable>
          <Pressable
            style={styles.footerTab}
            onPress={() => setFooterTab('Scenario')}>
            <Text>Scenario</Text>
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 40,
    fontWeight: '500',
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
  },
  description: {
    fontSize: 30,
  },
  buttons: {
    flex: 5,
    gap: 10,
  },
});
const activeFooter = StyleSheet.flatten([styles.footerTab, styles.active]);
