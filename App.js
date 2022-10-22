import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, TouchableHighlight, TextInput, ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions, Button, Alert} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile_page from "./Profile2"
import LoginScreen from "./Login"
import {Component} from "react";
import Full_About_Coffee from './FullCoffeeInfo';
import {useEffect, useState} from 'react';
import CoffeeShopAdd from "./CoffeeShopAdd";
import IpAdress from './getIP';
import {EventRegister} from 'react-native-event-listeners'
import {LogBox} from 'react-native';
import {YellowBox} from 'react-native';
import Auth from './Token';
import RegistrationNav from "./components/registration/navigation";
import Rating from "./Rating"


LogBox.ignoreAllLogs();//Ignore all log notifications


const staticData = [
    {coordinates: {latitude: 55.751244, longitude: 37.618423}},
    {coordinates: {latitude: 55.741244, longitude: 37.628423}},
    {coordinates: {latitude: 55.731244, longitude: 37.608423}},
];

function arrowClick() {
    console.log("Arrow was clicked")
}

function editInfoClick() {
    console.log("Edit Info Button was clicked")
}

function AuthScreen() {
    return <LoginScreen/>
}

function SendRequest() {
    var XHR = new XMLHttpRequest();
    var params = [App.state.login, App.state.password]
    XHR.send(params, 'http://localhost:19003')
}

function HomeScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getCoffeeList = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/list`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCoffeeList
        ();
    }, []);

    const listener = EventRegister.addEventListener('UpdateMarker', (data) => {
        getCoffeeList();
    })

    return (
        <View>
            {isLoading ? <ActivityIndicator/> : (
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 55.751244,
                             longitude: 37.618423,
                             latitudeDelta: 0.65,
                             longitudeDelta: 0.0421,
                         }}
                         provider="google" //comment this to use ios maps
                         showsUserLocation={true}
                >
                    {data.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{latitude: marker.fields.latitude, longitude: marker.fields.longitude}}
                            title="Test"
                        >
                            <Callout tooltip onPress={() => markerClick(navigation, marker.fields, marker.pk)}>
                                <View style={styles.bubble}>
                                    <Text style={styles.coffeeName}>{marker.fields.name}</Text>
                                    <Text>{marker.fields.description}</Text>
                                </View>
                                <View style={styles.arrowBorder}/>
                                <View style={styles.arrow}/>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}
        </View>
    );
};

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='MapComponent'>

            <Stack.Screen name="MapComponent" component={HomeScreen}/>
            <Stack.Screen name="FullInfo" component={Full_About_Coffee}/>
        </Stack.Navigator>

    );
}

const Tab = createBottomTabNavigator();

function markerClick(navigation, marker, id) {
    // const Stack = createStackNavigator();
    console.log("Marker was clicked");
    navigation.navigate('Карта', {
        screen: 'FullInfo',
        params: {
            info: marker,
            shop_id: id
        }
    })
}

function AddMarker() {
    return <CoffeeShopAdd/>
}

export default function App() {
// export default class App extends React.Component{
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,

                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Карта') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Профиль') {
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }
                        if (route.name === 'Регистрация') {
                            iconName = focused
                                ? 'ios-lock-open'
                                : 'ios-lock-closed';
                        } else if (route.name === 'Авторизация') {
                            iconName = focused
                                ? 'person'
                                : 'person-outline';
                        } else if (route.name === 'Добавить') {
                            iconName = focused
                                ? 'add-circle'
                                : 'add-circle-outline';
                        } else if (route.name === 'Рейтинг') {
                          iconName = focused
                              ? 'ios-star'
                              : 'ios-star-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Карта" component={HomeStack}/>
                <Tab.Screen name="Профиль" component={Profile_page}/>
                <Tab.Screen name="Добавить" component={AddMarker}/>
                <Tab.Screen name="Регистрация" component={RegistrationNav}/>
                <Tab.Screen name="Авторизация" component={LoginScreen}/>
                <Tab.Screen name="Рейтинг" component={Rating}/>
            </Tab.Navigator>
        </NavigationContainer>


    );
}


const styles = StyleSheet.create({
    coffeeName: {
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    Iphone81: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 48,
        paddingBottom: 364,
        paddingLeft: 11,
        paddingRight: 14,
        backgroundColor: "rgba(255, 255, 255, 1)",
        width: 375,
        height: 667,
    },
    Group133: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    Txt767: {
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        color: "rgba(0,0,0,1)",
        marginBottom: 28,
    },
    Line3: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,1)",
        width: 348,
        height: 1,
        marginBottom: 30,
    },
    ButtonPrimary: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 17,
        borderRadius: 4,
        backgroundColor: "rgba(93,95,239,1)",
    },
    Txt935: {
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        color: "rgba(0,0,0,1)",
    },

    Line1: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,1)",
        width: 348,
        height: 1,
        marginBottom: 26,
    },
    ButtonPrimary1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 29,
        borderRadius: 4,
        backgroundColor: "rgba(93,95,239,1)",
    },
    Txt935: {
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        color: "rgba(0,0,0,1)",
    },

    Line2: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,1)",
        width: 348,
        height: 1,
        marginBottom: 14,
    },
    ButtonPrimary2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        backgroundColor: "rgba(93,95,239,1)",
    },
    Txt935: {
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        color: "rgba(0,0,0,1)",
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    Iphone81: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 19,
        paddingBottom: 217,
        paddingLeft: 16,
        paddingRight: 28,
        backgroundColor: "rgba(255, 255, 255, 1)",
        width: 375,
        height: 667,
    },
    Group066: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 12,
    },
    Group268: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 36,
    },
    KeyboardArrowLeft: {
        width: 26,
        height: 24,
        marginRight: 125,
    },
    Txt258: {
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "700",
        color: "rgba(0,0,0,1)",
        marginLeft: -12,
    },

    Group775: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 23,
        paddingBottom: 61,
        paddingLeft: 59,
        paddingRight: 57,
        borderRadius: 45,
        backgroundColor: "rgba(196,196,196,0.18)",
        // shadowColor: "rgba(0,0,0,0.25)",
        // elevation: 0,
        // shadowOffset: { width: 0, height: 4 },
    },
    Ellipse1: {
        backgroundColor: "white",
        /*  linear-gradient(131.36deg, rgba(53,195,204,1) 2%, rgba(244,166,48,0.17) 100%, )  */
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(24,71,141,1)",
        shadowColor: "rgba(0,0,0,0.25)",
        elevation: 0,
        shadowOffset: {width: 2, height: 4},
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    Txt385: {
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        fontWeight: "800",
        color: "rgba(0,0,0,1)",
        marginBottom: 19,
    },
    Component1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 31,
        paddingRight: 23,
        borderRadius: 10,
        backgroundColor: "rgba(16,197,197,0.36)",
        shadowColor: "rgba(0,0,0,0.25)",
        elevation: 0,
        shadowOffset: {width: 2, height: 4},
    },
    Txt816: {
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "300",
        color: "rgba(0,0,0,1)",
    },
    container: {
        flex: 1
    },
    textInputStyle: {

        marginTop: 150,
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    textOutputStyle: {
        fontSize: 20
    },


})


