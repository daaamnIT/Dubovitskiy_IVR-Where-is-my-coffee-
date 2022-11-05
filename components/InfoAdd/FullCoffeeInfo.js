import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { Text, View, TouchableHighlight, TextInput, FlatList, ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, Button, Alert } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Component } from 'react/cjs/react.production.min';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState, useEffect} from 'react'
import FormData from 'form-data';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import Auth from '../../Token';
import IpAdress from '../../getIP';
import Login from '../../UserInfo';
import { EventRegister } from 'react-native-event-listeners'
import { LogBox } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MultiSelect from 'react-native-multiple-select';
import { apiurl } from '../../URL';



LogBox.ignoreAllLogs();//Ignore all log notifications

function reportPostNotExist(coffee_id_1){     //useless
  console.log(coffee_id_1)
}

var rate = null //переменная рейтинга

export default class Full_About_Coffee extends Component {    //класс экрана

  commentInputRef = React.createRef();


    constructor(props) {    //конструктор
      super(props);
      this.state = {
        email: "",
        info: props.route.params.info,
        coffee_id: props.route.params.shop_id,
        text1: '',
        data: [],
        isLoading: true,
        reportReason: '',
        username: '',
        infodata: [
          {id: 1, name: 'WiFi'},
          {id: 1, name: 'Еда'},
          {id: 1, name: 'Dog friendly'},
        ],
        selectedItems: [],
        infodata: [],
      };
      console.log(this.state.coffee_id)
      console.log(Login.getInfoFirstname())
      this.submitPressed = this.submitPressed.bind(this);
      this.ratingCompleted = this.ratingCompleted.bind(this);
      this.ratingPas = this.ratingPas.bind(this);
      this.AddInfo = this.AddInfo.bind(this);
      this.addToFavourite = this.addToFavourite.bind(this);
      this.getUserInfo = this.getUserInfo.bind(this);
    }

    async getComments() {   //функция получения комментов
      try {
        console.log(Auth.getToken())
        const response = await fetch(apiurl + "comments_list/" + this.state.coffee_id + "/",{
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        var json = await response.json();
        json = json.reverse();
        console.log(json)
        this.setState({ data: json });
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }

      async getUserInfo(){    //ф-ия получения информации о пользователе
        const response = await fetch(apiurl + 'api/me/', {
            method: 'GET',
            headers: {
              Authorization: 'Token ' + Auth.getToken(),
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
        const json = await response.json()
        console.log(json)
        this.setState({username: json[0].fields.first_name})
        this.setState({email: json[0].fields.username})
      }

      async getInfo() {   //функция получения комментов
        try {
          console.log(Auth.getToken())
          const response = await fetch(apiurl + "info_list/" + this.state.coffee_id + "/",{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          });
          var json = await response.json();
          json = json.reverse();
          console.log(json)
          this.setState({ infodata: json });
          } catch (error) {
            console.log(error);
          } finally {
            this.setState({ isLoading: false });
          }
          console.log("INFOOOOOOO")
          console.log(this.state.infodata)
        }
  
      
      componentDidMount() {       //ф-ии, которые должны выполнятся при первом запуске экрана
        this.listener = EventRegister.addEventListener('FullCoffeeInfo', (infodata) => this.getInfo())
        this.getComments();
        this.getUserInfo();
        this.getInfo();
      }
     

    inputs = () => {      //ф-ия для ввода данных
      return [
        this.commentInputRef,  
      ];
    };

    onChangeCommentlInputHandler = (value) => {     //ф-ия сохранения комментов в стейт
      this.setState({
        text1: value,
      });
    }

    reportSystem(){       //система репортов
      console.log("Test")
    }


    submitPressed() {           //ф-ия записи коммента в бд
      console.log(this.state.text1)
      console.log(this.state.coffee_id)
      const formData = new FormData();
      formData.append('text', this.state.text1);
      formData.append('author', this.state.username);
      formData.append('coffee_shop_id', this.state.coffee_id);
      fetch(apiurl + 'comment_post/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: formData,
      }).then(()=> this.getComments());
      Keyboard.dismiss();
    }

    ratingCompleted(rating) {
      rate = rating
      console.log(rate)
    }

    ratingPas(){        //ф-ия записи рейтинга
      Alert.alert("Спасибо, что оставляете оценки", "Вы делаете наш мир лучше!")
      const formData = new FormData();
      formData.append('rate', rate);
      formData.append('coffee_shop_id', this.state.coffee_id);
      fetch(apiurl + 'setRating/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: formData,
      }).then(()=>EventRegister.emit('Rate', ''));
    }

    AddInfo(){
      console.log(1)
      this.props.navigation.navigate('Информация', {
        screen: 'AddInfo',
        params: {                                   //В параметры передает всю информацию о маркере и его id
          info: this.state.info,
          shop_id: this.state.coffee_id,
      }
    })
    }

    reportPressed() {     //ф-ия обрабатывающая окно репортов
      Alert.alert(
        "Жалоба на эту кофейню",
        "Выберите причину",
        [
          {
            text: "Этой кофейни не существует",
            onPress: () => Alert.alert(
              "Жалоба отправлена"
            )
          },
          {
            text: "Отменить",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Оскорбительное описание", 
            onPress: () => Alert.alert(
              "Жалоба отправлена"
          ) },
          {
            text: "Оскорбительные комментарии",
            onPress: () => Alert.alert(
              "Жалоба отправлена"
            )
          }
        ]
      );
    }

    addToFavourite(){
      if (Auth.getToken() != 'noToken'){
        const formData = new FormData();
        formData.append('shop_id', this.state.coffee_id);
        formData.append('username', this.state.email);
        formData.append('shop_name', this.props.route.params.info.name);
        fetch(apiurl + 'add_to_favourite/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: formData,
        }).then(
          console.log("added"),
          Alert.alert("Кофейня добавлена в список избранных"),
          EventRegister.emit('UserLogin', '')
          );
      }else{
        Alert.alert("Пожалуйста авторизуйтесь")
      }
    }


    render() {      //рендер страницы
      const { data, isLoading } = this.state;
      const { infodata, isLoading2 } = this.state;
      // const Item = ({ info }) => (
      //   <View>
      //     <Text style={styles.textinfo}>{info}</Text>
      //   </View>
      // );

      // const renderItem = ({ item }) => (
      //   <Item info={item.fields.info} />
      // );
      return (
        <View style={{ flex: 1, padding: 24, backgroundColor: 'white' }}>
          <TouchableOpacity
            onPress={this.reportPressed}
            style={styles.Button}
          >
            <View style={styles.Component1}>
              <Text style={styles.Txt265}>Report</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.addToFavourite}
            style={styles.Button}
          >
            <View style={styles.Component1}>
              <Text style={styles.Txt265}>Love it!</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.header}>{this.props.route.params.info.name}</Text>
          <Text style={styles.text}>{this.props.route.params.info.description}</Text>
          <View style={styles.info}>
          {isLoading2 ? <ActivityIndicator/> : (
            <FlatList
              data={infodata}
              renderItem={({ item }) => (
                <Text style={styles.textinfo}>{item.fields.info}</Text>
              )}
              keyExtractor={item => item.pk}
            />
          )}
          </View>
          <Text style={styles.postComment}>Оставьте свой комментарий</Text>
          <Rating
            showRating
            onFinishRating={this.ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <View style={styles.btnContainer}>
            <Button color='#000' title="Подтвердить" onPress={this.ratingPas} />
          </View>
          <View style={styles.btnContainer}>
            <Button color='#000' title="Add Info" onPress={this.AddInfo} />
          </View>
           <View style={styles.inputTextWrapper}>
              <TextInput
                  placeholder="Ваш комментарий"
                  style={styles.textInput}
                  returnKeyType="next"
                  onChangeText={this.onChangeCommentlInputHandler}
                  placeholderTextColor="lightgrey"
              />
          </View>
          <View style={styles.btnContainer}>
            <Button color='#000' title="Подтвердить" onPress={this.submitPressed} />
          </View>
          <Text style={styles.h2}>Комментарии</Text>
          <View style={{ flex: 1, paddingTop: 10, paddingBottom: 0 }}>
            {isLoading ? <ActivityIndicator/> : (
              <FlatList
                data={data}
                keyExtractor={({ id }, index) => index}
                renderItem={({ item }) => (
                  <Text style={styles.main}>
                    <Text style={styles.author}>Автор: {item.fields.author} {'\n'}</Text>
                    <Text style={styles.coment}>{item.fields.text}</Text>
                  </Text>
                )}
              />
            )}
          </View>

        </View>
      );
    }
  };


  //стили
  const styles = StyleSheet.create({
    postComment:{
      textAlign:'center',
      margin:20,
      fontSize: 20,
    },
    main:{
      margin:10
    },
    author:{
      textAlign: 'center',
      textDecorationLine: 'underline'
    },
    coment:{
      textAlign: 'center',
      marginBottom: 10,
    },
    container: {
      flex: 1,
      padding: 16,
      paddingBottom: 100,
    },
    header: {
      fontSize: 36,
      padding: 24,
      margin: 12,
      textAlign: "center",
      fontWeight: 'bold',
    },
    text:{
      fontSize: 14,
      textAlign: "center",
      marginBottom: 30,
    },
    inputTextWrapper: {
      marginBottom: 24,
    },
    h2:{
      marginTop: 40,
      fontSize: 30,
      textDecorationLine: 'underline',
      textAlign: 'center'
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      paddingRight: 30,
    },
    errorText: {
      fontSize: 10,
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 5,
    },
    Component1: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingTop: 8,
      paddingBottom: 6,
      paddingLeft: 19,
      paddingRight: 18,
      borderRadius: 15,
      backgroundColor: "rgba(223,223,223,1)",
      shadowColor: "rgba(0,0,0,0.25)",
      elevation: 0,
      shadowOffset: { width: 3, height: 5 },
      width: 78,
      height: 32,
    },
    Txt265: {
      fontSize: 12,
      fontWeight: "200",
      color: '#000'
    },
    Button:{
      justifyContent: "flex-end",
      alignItems: "flex-end",
      marginTop: 30,
    },
    starStyle:{
      width: 100,
      height: 20,
      marginBottom: 20,
    },
    MainContainer: {
      flex: 1,
      padding: 12,
      backgroundColor: 'white'
    },
   
    text: {
      padding: 12,
      fontSize: 15,
      textAlign: 'center',
      color: 'black'
    },
    info:{
      flex: 1,
      alignItems: 'center',
    },
    textinfo:{
      flex: 1,
      justifyContent: 'center',
    },
  });
