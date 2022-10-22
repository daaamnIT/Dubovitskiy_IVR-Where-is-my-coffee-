import React, {Component} from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    LogBox,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
} from 'react-native';
import FormData from 'form-data';
import {EventRegister} from 'react-native-event-listeners'
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {SafeAreaView} from 'react-native-safe-area-context';

const entireScreenWidth = Dimensions.get('window').width;


export default class Rating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        };
      }

      async getRateInfo(){
        const response = await fetch('http://127.0.0.1:8000/rate_list/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
        const json = await response.json()
		this.setState({data: json})
        console.log(this.state.data)
      }

      componentDidMount() {
        this.getRateInfo()
    } 

    render(){
        return(
            <SafeAreaView>
                    <View style={{height: 1000*(entireScreenWidth / 380)}}>
                        <Text style={{fontSize: 22 * (entireScreenWidth / 380)}}>Рейтинг</Text>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={({ id }, index) => index}
                            renderItem={({ item }) => (
                            <Text style={{padding: 10*(entireScreenWidth / 380)}}>
                                <Text>Название: {item.fields.name} {'\n'}</Text>
                                <Text>Рейтинг: {item.fields.rating}/5 {'\n'}</Text>
                                <Text>Количество оценок: {item.fields.numRates}</Text>
                            </Text>
                            )}
                        />
                    </View>
            </SafeAreaView>
        );
    }
};
