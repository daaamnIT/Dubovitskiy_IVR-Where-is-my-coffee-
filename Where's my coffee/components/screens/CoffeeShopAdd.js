import * as React from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Alert, Dimensions, LogBox } from 'react-native'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import { useState } from 'react'
import FormData from 'form-data'
import { EventRegister } from 'react-native-event-listeners'
import { apiurl } from '../../URL'
import Auth from '../../Token'

LogBox.ignoreAllLogs()// Ignore all log notifications

const entireScreenWidth = Dimensions.get('window').width // получение разрешения экрана



async function _addMarker (pin, text, text2) { // функция добавления маркера на карту

  const response2 = await fetch(apiurl + 'api/status/', {   //запрос на получения статуса пользователя
    method: 'GET',
    headers: {
      Authorization: 'Token ' + Auth.getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const json2 = await response2.json()
  console.log(response2)

  console.log(pin.latitude)
  console.log(pin.longitude)
  console.log(text)
  console.log(text2)
  const formData = new FormData()
  formData.append('name', text)
  formData.append('description', text2)
  formData.append('latitude', pin.latitude)
  formData.append('longitude', pin.longitude)
  if (json2[0].fields.is_Owner == 'True'){
    const response = await fetch(apiurl + 'api/me/', {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    console.log(json)
    formData.append('hasOwner', 'True')
    formData.append('OwnerName', json[0].fields.username )
  }else{
    formData.append('hasOwner', 'False')
    formData.append('OwnerName', 'no' )
  }

  fetch(apiurl + 'requests/', { // post завпрос к бэку
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': "multipart/form-data"
    },
    body: formData
  }).then(() => EventRegister.emit('UpdateMarker', ''))

  Alert.alert('Точка добавлена')
}



export default function CoffeeShopAdd () { // основная функция на экране
  const [text, setText] = useState('')
  const [text2, setText2] = useState('')

  const [pin, setPin] = React.useState({
    latitude: 55.751244,
    longitude: 37.618423
  })
  const [region, setRegion] = React.useState({
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.65,
    longitudeDelta: 0.0421
  })
  // рендер страницы
  return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
    <SafeAreaView>
      <View style={styles.great}>
        <View style = {[styles.inputs, { display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop:'5%' }]}>
        <TextInput style = {[styles.passwordStyle, { position: 'relative', flexGrow: 1, left: 0, top: 0, height: 'auto', transform: [{ translateX: 0 }, { translateY: 0 }] }]}
          value={text}
          onChangeText={(newValue) => setText(newValue)}
          placeholder = 'Название'
          placeholderTextColor="lightgrey"
        />
        </View>
        <View style = {styles._input_2}>
        </View>

        <View style = {[styles.inputs, { display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput style = {[styles.opisaniye, { position: 'relative', flexGrow: 1, left: 0, top: 0, height: 'auto', transform: [{ translateX: 0 }, { translateY: 0 }] }]}
          value={text2}
          onChangeText={(newValue) => setText2(newValue)}
          placeholder = 'Описание'
          placeholderTextColor="lightgrey"
        />
        </View>
        <View style = {styles._input_1}>
        </View>
      </View>
			<MapView
				style={styles.map}
				initialRegion={{
				  latitude: 55.751244,
				  longitude: 37.618423,
				  latitudeDelta: 0.02,
				  longitudeDelta: 0.01
				}}
				provider = "google" // comment this to use ios maps
        showsUserLocation={true}
        >
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
					  console.log('Drag start', e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
					  setPin({
					    latitude: e.nativeEvent.coordinate.latitude,
					    longitude: e.nativeEvent.coordinate.longitude
					  })
					  console.log(pin)
					}}
				>
          <Callout tooltip onPress= {() => _addMarker(pin, text, text2)}>
            <View style={styles.bubble}>
              <Text style = {styles.AddText}>Добавить</Text>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </Callout>
				</Marker>
			</MapView>
      </SafeAreaView>
		</View>
  )
}

// стили
const styles = StyleSheet.create({
  _input_2: {
    width: "90%",
    height: 0,
    borderRadius: undefined,
    borderWidth: 1,
    marginTop: 3,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,1)',
    left: 2 * (entireScreenWidth / 380),
    // right: 2 * (entireScreenWidth / 380),
    bottom: 'auto',
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: '0.000005008956130975337deg' }
    ]
  },
  passwordStyle: {
    width: "90%",
    height: 'auto',
    // right: "auto",
    // bottom: "auto",
    marginLeft: 20 * (entireScreenWidth/ 380),
    // backgroundColor: 'green',
    marginTop: 10,
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: '0deg' }
    ],

    textDecorationLine: 'none',
    lineHeight: 20,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'left',
    textAlignVertical: 'top',
    letterSpacing: 0.1
  },
  _input_1: {
    width: "90%",
    height: 0,
    borderRadius: undefined,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,1)',
    left: 2 * (entireScreenWidth / 380),
    marginBottom: 15,
    right: 'auto',
    bottom: 'auto',
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: '0.000005008956130975337deg' }
    ]
  },
  opisaniye: {
    width: '90%',
    height: 'auto',
    right: 'auto',
    bottom: 'auto',
    marginTop: 10,
    marginLeft: 20 * (entireScreenWidth/ 380),
    marginBottom: 3,
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: '0deg' }
    ],

    textDecorationLine: 'none',
    lineHeight: 20,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'left',
    textAlignVertical: 'top',
    letterSpacing: 0.1
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  AddText: {
    textAlign: 'center'
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
    // marginBottom: -15
  },
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1
  },
  great:{
    position: "relative",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    marginTop:'5%',
    marginLeft:'auto',
    marginRight: 'auto',
  }
})