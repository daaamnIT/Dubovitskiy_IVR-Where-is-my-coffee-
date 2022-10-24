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
    StatusBar,
} from 'react-native';
import FormData from 'form-data';
import {EventRegister} from 'react-native-event-listeners'
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {SafeAreaView} from 'react-native-safe-area-context';

const entireScreenWidth = Dimensions.get('window').width;


export default class Rating extends Component {
      state = {
        data: [],
        selectedId: null,
        isLoading: true,
    }

    constructor(props) {
      super(props);
      const {navigation} = this.props
      this.onPressShop = this.onPressShop.bind(this);
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

    onPressShop(id) {
        this.setState({selectedId: id.pk})
        console.log(id)
        this.props.navigation.navigate('Рейтинг', {
          screen: 'ShopOnMap',
          params: {
            info: id,
            shop_id: id.pk
        }
      })
    }

    render(){
        const Item = ({ item, onPress, backgroundColor, textColor }) => (
            <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
              <Text style={[styles.title, textColor]}>{item.fields.name} - {item.fields.rating}</Text>
            </TouchableOpacity>
          );
        
        const renderItem = ({ item }) => {
            const backgroundColor = item.id === this.selectedId ? "#6e3b6e" : "#f9c2ff";
            const color = item.id === this.selectedId ? 'white' : 'black';

            return (
            <Item
                item={item}
                onPress={() => this.onPressShop(item)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
            );
        };

        return(

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={this.selectedId}
                />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20 * (entireScreenWidth / 380),
    },
  });
  