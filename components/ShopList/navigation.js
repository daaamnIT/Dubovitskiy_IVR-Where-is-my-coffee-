import Rating from "./Rating";
import ShopOnMap from "./ShopOnMap";
import {Component} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack2 = createNativeStackNavigator();


export default class ListNav extends Component {        //класс отдельного навигатора для рейнтинг листа
    constructor(props) {
        super(props);
        const {navigation} = this.props

    }


    render() {
        return (
            <Stack2.Navigator>
                <Stack2.Screen
                    name="Rating"
                    component={Rating}
                    options={{headerShown: true}}
                />
                <Stack2.Screen name="ShopOnMap" component={ShopOnMap}/>
            </Stack2.Navigator>
        );
    }
}
