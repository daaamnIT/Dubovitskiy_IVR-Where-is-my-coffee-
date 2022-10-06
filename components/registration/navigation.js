import RegistrationScreen from "./Registration";
import OwnerRegistration from "./OwnerRegistration";
import {Component} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default class RegistrationNav extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props

    }


    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="RegScreen"
                    component={RegistrationScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="OwnerReg" component={OwnerRegistration}/>
            </Stack.Navigator>
        );
    }
}
