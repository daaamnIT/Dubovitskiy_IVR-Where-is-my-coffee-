import {Component} from "react";
import * as React from "react"
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Alert, Dimensions } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import {useState} from 'react'
import FormData from 'form-data';
import { EventRegister } from 'react-native-event-listeners'
import { LogBox } from 'react-native';


const entireScreenWidth = Dimensions.get('window').width;


export default class ShopOnMap extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props
        this.state = {
            info: props.route.params.info,
            coffee_id: props.route.params.shop_id,
          };
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor:'white' }}> 
                <SafeAreaView>
                    <View style={styles.allinp}>
                        <Text style={styles.h1}>{this.state.info.fields.name}</Text>
                        <Text style={styles.desc}>{this.state.info.fields.description}</Text>
                        <Text style={styles.rating}>Рейтинг: {this.state.info.fields.rating}</Text>
                    </View>
                    <MapView
                        style={styles.Map}
                        initialRegion={{
                            latitude: this.state.info.fields.latitude,
                            longitude: this.state.info.fields.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01,
                        }}
                        provider = "google" //comment this to use ios maps
                        showsUserLocation={true}
                    >
                        <Marker
                            coordinate={{latitude: this.state.info.fields.latitude, longitude:this.state.info.fields.longitude}}
                            pinColor="black"
                            draggable={true}
                        >
                        </Marker>
                    </MapView>
                </SafeAreaView>
            </View>
            // <SafeAreaView>
            //     <Text>ID = {this.state.coffee_id}</Text>
            //     <Text>Name = {this.state.info.fields.name}</Text>
            //     <Text>longitude = {this.state.info.fields.longitude}</Text>
            //     <Text>latitude = {this.state.info.fields.latitude}</Text>

            //     <View style={styles.Map}>
                
            //     </View>
            // </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
Map:{
    width: entireScreenWidth,
	height: 200 * (entireScreenWidth / 380),
},
h1:{
    textAlign: "center",
    fontSize: 36 * (entireScreenWidth / 380),
    padding: 12 * (entireScreenWidth / 380),
    margin: 6 * (entireScreenWidth / 380),
},
desc:{
    textAlign: "center",
    fontSize: 14 * (entireScreenWidth / 380),
    padding: 12 * (entireScreenWidth / 380),
    margin: 6 * (entireScreenWidth / 380),
},
rating:{ 
    textAlign: "center",
    fontSize: 20 * (entireScreenWidth / 380),
    padding: 12 * (entireScreenWidth / 380),
    margin: 6 * (entireScreenWidth / 380),
},
allinp:{
    height: 470 * (entireScreenWidth / 380),
}
});