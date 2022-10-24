import {Text} from "react-native";
import {Component} from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
            <SafeAreaView>
                <Text>ID = {this.state.coffee_id}</Text>
                <Text>Name = {this.state.info.fields.name}</Text>
                <Text>longitude = {this.state.info.fields.longitude}</Text>
                <Text>latitude = {this.state.info.fields.latitude}</Text>
            </SafeAreaView>
        );
    }
}