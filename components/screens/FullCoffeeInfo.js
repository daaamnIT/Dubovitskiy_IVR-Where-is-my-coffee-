import * as React from 'react';
import 'react-native-gesture-handler';

 import { NavigationContainer } from '@react-navigation/native';
import { Text, View, TouchableHighlight, TextInput, FlatList, ActivityIndicator, Keyboard } from 'react-native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, Button, Alert } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Component } from 'react/cjs/react.production.min';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from 'react'
import FormData from 'form-data';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import Auth from '../../Token';
import IpAdress from '../../getIP';
import Login from '../../UserInfo';
import { EventRegister } from 'react-native-event-listeners'
import { LogBox } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';


LogBox.ignoreAllLogs();//Ignore all log notifications

function reportPostNotExist(coffee_id_1){
  console.log(coffee_id_1)
}

var rate = null

export default class Full_About_Coffee extends Component {

  commentInputRef = React.createRef();


    constructor(props) {
      super(props);
      this.state = {
        info: props.route.info,
        coffee_id: props.route.params.shop_id,
        text1: '',
        data: [],
        isLoading: true,
        reportReason: '',
        username: '',
      };
      console.log(this.state.coffee_id)
      console.log(Login.getInfoFirstname())
      this.submitPressed = this.submitPressed.bind(this);
      this.ratingCompleted = this.ratingCompleted.bind(this);
      this.ratingPas = this.ratingPas.bind(this);
    }

    async getComments() {
      try {
        console.log(Auth.getToken())
        const response = await fetch("http://127.0.0.1:8000/comments_list/" + this.state.coffee_id + "/",{
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

      async getUserInfo(){
        const response = await fetch('http://127.0.0.1:8000/api/me/', {
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
      }
      
      componentDidMount() {
        this.getComments();
        this.getUserInfo();
      }
     

    inputs = () => {
      return [
        this.commentInputRef,  
      ];
    };

    onChangeCommentlInputHandler = (value) => {
      this.setState({
        text1: value,
      });
    }

    reportSystem(){
      console.log("Test")
    }


    submitPressed() {
      console.log(this.state.text1)
      console.log(this.state.coffee_id)
      const formData = new FormData();
      formData.append('text', this.state.text1);
      formData.append('author', this.state.username);
      formData.append('coffee_shop_id', this.state.coffee_id);
      fetch('http://127.0.0.1:8000/comment_post/', {
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

    ratingPas(){
      Alert.alert("Спасибо, что оставляете оценки", "Вы делаете наш мир лучше!")
      const formData = new FormData();
      formData.append('rate', rate);
      formData.append('coffee_shop_id', this.state.coffee_id);
      fetch('http://127.0.0.1:8000/setRating/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: formData,
      });
    }

    reportPressed() {
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

    render() {  
      const { data, isLoading } = this.state;
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
          <Text style={styles.header}>{this.props.route.params.info.name}</Text>
          <Text style={styles.text}>{this.props.route.params.info.description}</Text>
          <Text style={styles.postComment}>Оставьте свой комментарий</Text>
          <Rating
            showRating
            onFinishRating={this.ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <View style={styles.btnContainer}>
            <Button color='#000' title="Подтвердить" onPress={this.ratingPas} />
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
  });
