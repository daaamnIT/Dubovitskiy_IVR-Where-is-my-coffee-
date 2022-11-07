import { Component, useEffect, useState } from 'react'
import * as React from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Alert, Dimensions, TouchableOpacity, AppRegistry, LogBox } from 'react-native'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import FormData from 'form-data'
import { EventRegister } from 'react-native-event-listeners'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_API_KEY } from '../../ApiGoogle'
import { apiurl } from '../../URL'

const entireScreenWidth = Dimensions.get('window').width // получение разрешения экрана
const mapRef = React.useRef < MapView > (null)

export default class ShopOnMap extends Component {
  constructor (props) { // конструктор класса
    super(props)
    const { navigation } = this.props
    this.state = {
      info: props.route.params.info,
      coffee_id: props.route.params.shop_id,
      location: null,
      errorMsg: null,
      showDirection: false,
      originLatitude: null,
      originLongitude: null,
      distance: 0,
      duration: 0
    }
  }

  async _getLocation () {  //Функция, которая получает координаты пользователя
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      this.setState({ errorMsg: 'Permission to access location was denied' })
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    this.setState({ location })

    let text = 'Waiting..'
    if (this.state.errorMsg) {
      text = this.state.errorMsg
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
      this.setState({ originLatitude: this.state.location.coords.latitude })
      this.setState({ originLongitude: this.state.location.coords.longitude })
      console.log(this.state.originLatitude, this.state.originLongitude)
    }
  }

  componentDidMount () {    // Ф-ия, которая запускается при запуске экрана
    this._getLocation()
  }

  traceRoute () {     //Ф-ия отображения маршрута
    const origin = [{ latitude: this.state.originLatitude, longitude: this.state.originLongitude }]
    const destination = [{ latitude: this.state.info.fields.latitude, longitude: this.state.info.fields.longitude }]
    const edhePaddingValue = 20
    const edgePadding = {
      top: edhePaddingValue,
      right: edhePaddingValue,
      bottom: edhePaddingValue,
      left: edhePaddingValue
    }
    this.setState({ showDirection: true })
    mapRef.current?.fit
  }

  traceRouteOnReady = (args) => {     //Получение дистанции и времени
    if (args) {
      this.setState({ distance: args.distance })
      this.setState({ duration: args.duration })
    }
  }

  // рендер информации
  render () {
    return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <View style={styles.allinp}>
                        <Text style={styles.h1}>{this.state.info.fields.name}</Text>
                        <Text style={styles.desc}>{this.state.info.fields.description}</Text>
                        <Text style={styles.rating}>Рейтинг: {this.state.info.fields.rating.toFixed(1)}</Text>
                        <View>
                        <TouchableOpacity style={styles.trace} onPress={() => this.traceRoute()}>
                            <Text style={styles.tracetext}>Построить маршрут</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.distance && this.state.duration
                      ? (
                    <View style={styles.infb}>
                        <Text style={styles.inf}>Дистанция: {this.state.distance.toFixed(2)} км</Text>
                        <Text style={styles.inf}>Длительность: {Math.ceil(this.state.duration)} минут</Text>
                    </View>
                        )
                      : null}
                    </View>
                    <MapView
                        style={styles.Map}
                        initialRegion={{
                          latitude: this.state.info.fields.latitude,
                          longitude: this.state.info.fields.longitude,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.01
                        }}
                        provider = "google" // comment this to use ios maps
                        showsUserLocation={true}
                    >
                         {this.state.showDirection && (<MapViewDirections
                            origin={{ latitude: this.state.originLatitude, longitude: this.state.originLongitude }}
                            destination={{ latitude: this.state.info.fields.latitude, longitude: this.state.info.fields.longitude }}
                            apikey={GOOGLE_API_KEY}
                            mode="WALKING"
                            strokeColor="#6644ff"
                            strokeWidth={2}
                            onReady={this.traceRouteOnReady}
                        />)}
                        <Marker
                            coordinate={{ latitude: this.state.info.fields.latitude, longitude: this.state.info.fields.longitude }}
                            pinColor="black"
                            draggable={true}
                        >
                        </Marker>
                    </MapView>
                </SafeAreaView>
            </View>
    )
  }
}

// стили
const styles = StyleSheet.create({
  Map: {
    width: entireScreenWidth,
    height: 300 * (entireScreenWidth / 380),
    // marginTop: 50 * (entireScreenWidth / 380)
  },
  h1: {
    textAlign: 'center',
    fontSize: 36 * (entireScreenWidth / 380),
    padding: 12 * (entireScreenWidth / 380),
    margin: 6 * (entireScreenWidth / 380)
  },
  desc: {
    textAlign: 'center',
    fontSize: 14 * (entireScreenWidth / 380),
    padding: 12 * (entireScreenWidth / 380),
    margin: 6 * (entireScreenWidth / 380)
  },
  rating: {
    textAlign: 'center',
    fontSize: 20 * (entireScreenWidth / 380),
    padding: 12 * (entireScreenWidth / 380),
    margin: 6 * (entireScreenWidth / 380)
  },
  allinp: {
    height: 425 * (entireScreenWidth / 380)
  }, 
  trace:{
    borderWidth: 2,
    borderRadius:10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(71,150,194, 0.3)'
  },
  tracetext:{
    fontWeight:'bold',
    fontSize:20,
    textAlign: 'center',
  },
  inf:{
    textAlign: 'center',
    color: '#01757A'
  },
  infb:{
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '5%'
  }
})