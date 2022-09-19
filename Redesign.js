// import React, { Component } from 'react';
// import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View,  } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Auth from './Token';
// import Login from './UserInfo';
// import { EventRegister } from 'react-native-event-listeners'
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import { Svg, Path } from "react-native-svg";
// import { LogBox } from 'react-native';

// LogBox.ignoreAllLogs();//Ignore all log notifications

// export default class LoginScreen extends Component {

//   emailInputRef = React.createRef();
//   passwordInputRef = React.createRef();
//   firstnameInputRef = React.createRef();
//   lastnameInputRef = React.createRef();
//   occupationInputRef = React.createRef();
//   addressInputRef = React.createRef();
//   zipInputRef = React.createRef();
//   phoneInputRef = React.createRef();
//   scrollViewRef = React.createRef();

//   constructor(props) {
//     super(props);
//     this.state = {
//         email: '',
//         password: '',

//         showEmailError: false,
//         showPasswordError: false,

//     };
//     this.submitPressed = this.submitPressed.bind(this);
//   }

//   inputs = () => {
//     return [
//       this.emailInputRef,
//       this.passwordInputRef,

//     ];
//   };

//   onChangeEmailInputHandler = (value) => {
    
//     this.setState({
//       email: value,
//     });
//   }

//   onChangePasswordInputHandler = (value) => {
  
//     this.setState({
//       password: value,
//     });
//   }

//   async submitPressed() {
//     console.log(this.state.email)
//     console.log(this.state.password)
//     const formData = new FormData();
//     formData.append('username', this.state.email);
//     formData.append('password', this.state.password);

//     const token = await fetch('https://zkb-coffee-app.herokuapp.com/api/auth/login/', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: formData,
//     });
//     const jsonToken = await token.json();
//     console.log(jsonToken)
//     Auth.setToken(jsonToken.token)
//     console.log("TOKEN:", Auth.getToken())
//     EventRegister.emit('UserLogin', '')
//     Keyboard.dismiss();
// 	if(typeof Auth.getToken() == 'undefined'){
// 		Alert.alert("Не получилось войти", "Возможно вы ввели что-то не так" )
// 	}
// 	else{Alert.alert("Вы вошли в свой профиль" )}
//   }

//   render() {
//     return (
//       <ScrollView>
//       <View>
//         <View style = {stylesheet._Subtract}>
//         </View>
//         <View style = {stylesheet._Brand}>
//           <View style = {stylesheet._cib_buy_me_a_coffee}>
//             <Svg style = {stylesheet._Vector} fill = {"rgba(0, 0, 0, 1)"}>
//             <Path fillRule = {"nonzero"} d = {"M 4.025999546051025 0.0010000000474974513 L 2.4070000648498535 3.735999822616577 L 0 3.735999822616577 L 0 7.09499979019165 L 0.9210000038146973 7.09499979019165 L 1.863999843597412 13.070000648498535 L 0.39099979400634766 13.070000648498535 L 2.3390002250671387 24.042999267578125 L 3.5879998207092285 24.027999877929688 L 4.844000339508057 32.000999450683594 L 16.735000610351562 32.000999450683594 L 16.81800079345703 31.469999313354492 L 17.989999771118164 24.02699851989746 L 19.178001403808594 24.04199981689453 L 21.121000289916992 13.069000244140625 L 19.714000701904297 13.069000244140625 L 20.6510009765625 7.093999862670898 L 21.66200065612793 7.093999862670898 L 21.66200065612793 3.734999895095825 L 19.104999542236328 3.734999895095825 L 17.479999542236328 0 L 4.025999546051025 0.0010000000474974513 Z M 4.730000019073486 1.0740000009536743 L 16.78700065612793 1.0740000009536743 L 17.812000274658203 3.4489998817443848 L 3.697000026702881 3.4489998817443848 L 4.730000019073486 1.0740000009536743 Z M 1.064000129699707 4.803999900817871 L 20.589000701904297 4.803999900817871 L 20.589000701904297 6.0320000648498535 L 1.064000129699707 6.0320000648498535 L 1.064000129699707 4.803999900817871 Z M 1.6680002212524414 14.13700008392334 L 19.85099983215332 14.13700008392334 L 18.283000946044922 22.959999084472656 L 10.746999740600586 22.880998611450195 L 3.235999584197998 22.959999084472656 L 1.6680002212524414 14.13700008392334 Z"}   strokeLinejoin = {"miter"}/>
//             </Svg>
//           </View>
//           <View style = {stylesheet._Group_1}>
//             <View style = {[stylesheet._ZKB_COFFEE, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//             <Text style = {[stylesheet._ZKB_COFFEE, {position: "relative", flexGrow: 0, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
//               ZKB-COFFEE
//             </Text>
//             </View>
//             <View style = {[stylesheet._Find_Your_Coffee, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//             <Text style = {[stylesheet._Find_Your_Coffee, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
//               Find Your Coffee
//             </Text>
//             </View>
//           </View>
//         </View>
//         <View style = {[stylesheet._avtorizatsiya, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//         <Text style = {[stylesheet._avtorizatsiya, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
//           Авторизация
//         </Text>
//         </View>
//         <View style = {stylesheet._input}>
//         </View>
//         <View style = {[stylesheet._Email, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//         <TextInput style = {[stylesheet._Email, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
//           placeholder="Почта"
//           returnKeyType="next"
//           onChangeText={this.onChangeEmailInputHandler}
// 		  placeholderTextColor="lightgrey"
//         />
//         </View>
//         <View style = {[stylesheet._adres_elektronnoi_pochti, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//         <Text style = {[stylesheet._adres_elektronnoi_pochti, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
//           Адрес электронной почты
//         </Text>
//         </View>
//         <View style = {stylesheet._input_2}>
//         </View>
//         <View style = {[stylesheet.passwordStyle, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//         <Text style = {[stylesheet.passwordStyle, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
//           Ваш пароль
//         </Text>
//         </View>
//         <View style = {[stylesheet._Parol_, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//         <TextInput style = {[stylesheet._Parol_, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
//           placeholder="Пароль"
//           returnKeyType="next"
//           secureTextEntry={true}
//           onChangeText={this.onChangePasswordInputHandler}
// 		  placeholderTextColor="lightgrey"
//         />
//         </View>
//         <View style = {[stylesheet._Zabili_, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//         </View>
//         <View style = {stylesheet._Login_Button}>
//           <View style = {[stylesheet._Voiti, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
//           <TouchableOpacity onPress= {()=>this.submitPressed()} >
//             <Text style = {[stylesheet._Voiti, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
//               Войти
//             </Text> 
//             </TouchableOpacity>
//             </View>
//         </View>
//       </View>
//     </ScrollView>
//       );
//   }
// }

// const stylesheet = StyleSheet.create({
//   passwordStyle:{
//     position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 52,
// 		right: "auto",
// 		top: 580,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],

// 		textDecorationLine: "none",
// 		lineHeight: 20,
// 		fontSize: 12,
// 		color: "rgba(0, 0, 0, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
//   },
// 	_Brand: {
// 		position: "absolute",
// 		width: 194,
// 		height: 49,
// 		transform: [
// 			{translateX: 110},
// 			{translateY: 124},
// 			{rotate: "0deg"},
// 		],
// 		overflow: "hidden",
// 		backgroundColor: "rgba(0,0,0,0)",
// 	},
// 	_cib_buy_me_a_coffee: {
// 		position: "absolute",
// 		width: 32,
// 		height: 32,
// 		borderRadius: 0,
// 		overflow: "hidden",
// 		left: 0,
// 		right: "auto",
// 		top: 0,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 5},
// 			{rotate: "0deg"},
// 		],
// 		backgroundColor: "rgba(255, 255, 255, 0)",
// 	},
// 	_Vector: {
// 		position: "absolute",
// 		color: "rgba(0, 0, 0, 1)",
// 		width: "auto",
// 		height: 32.000999450683594,
// 		borderRadius: 0,
// 		left: 5.170997619628906,
// 		right: 5.167001724243164,
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 	},
// 	_Group_1: {
// 		position: "absolute",
// 		width: 155,
// 		height: 42,
// 		transform: [
// 			{translateX: 39},
// 			{translateY: 7},
// 			{rotate: "0deg"},
// 		],
// 		overflow: "hidden",
// 		backgroundColor: "rgba(0,0,0,0)",
// 	},
// 	_ZKB_COFFEE: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 0,
// 		right: "auto",
// 		top: 0,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		textDecorationLine: "none",
// 		lineHeight: 24,
// 		fontSize: 22,
// 		color: "rgba(0, 1, 19, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_Find_Your_Coffee: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 0,
// 		right: "auto",
// 		top: 25,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		textDecorationLine: "none",
// 		fontSize: 14,
// 		color: "rgba(0, 1, 19, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_avtorizatsiya: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 101,
// 		right: "auto",
// 		top: 331,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		textDecorationLine: "none",
// 		fontSize: 32,
// 		color: "rgba(30, 41, 59, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_input: {
// 		position: "absolute",
// 		width: 298,
// 		height: 0,
// 		borderRadius: undefined,
// 		borderWidth: 1,
// 		borderStyle: "solid",
// 		borderColor: "rgb(0,0,0)",
// 		left: 52,
// 		right: "auto",
// 		top: 557,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0.000005008956130975337deg"},
// 		],
// 	},
// 	_Email: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 52,
// 		right: "auto",
// 		top: 527,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		textDecorationLine: "none",
// 		lineHeight: 20,
// 		fontSize: 14,
// 		color: "rgba(71, 85, 105, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_adres_elektronnoi_pochti: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 52,
// 		right: "auto",
// 		top: 494,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],

// 		textDecorationLine: "none",
// 		lineHeight: 20,
// 		fontSize: 12,
// 		color: "rgba(0, 0, 0, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_input_2: {
// 		position: "absolute",
// 		width: 298,
// 		height: 0,
// 		borderRadius: undefined,
// 		borderWidth: 1,
// 		borderStyle: "solid",
// 		borderColor: "rgba(0,0,0,1)",
// 		left: 52,
// 		right: "auto",
// 		top: 639,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0.000005008956130975337deg"},
// 		],
// 	},
// 	_Parol_: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 52,
// 		right: "auto",
// 		top: 609,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		textDecorationLine: "none",
// 		lineHeight: 20,
// 		fontSize: 14,
// 		color: "rgba(71, 85, 105, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_Zabili_: {
// 		position: "absolute",
// 		width: "auto",
// 		height: "auto",
// 		left: 302,
// 		right: "auto",
// 		top: 589,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		textDecorationLine: "none",
// 		lineHeight: 20,
// 		fontSize: 14,
// 		color: "rgba(0, 1, 19, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 	},
// 	_Login_Button: {
// 		position: "absolute",
// 		width: 298,
// 		height: "auto",
// 		borderRadius: 4,
// 		left: 52,
// 		right: "auto",
// 		top: 658,
// 		bottom: "auto",
// 		transform: [
// 			{translateX: 0},
// 			{translateY: 0},
// 			{rotate: "0deg"},
// 		],
// 		backgroundColor: "rgba(0, 1, 19, 1)",
// 		paddingTop: 10,
// 		paddingLeft: 0,
// 		paddingRight: 0,
// 		paddingBottom: 10,
// 		display: "flex",
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 	},
// 	_Voiti: {
// 		position: "relative",
// 		width: "auto",
// 		height: "auto",
// 		minWidth: 0,
// 		transform: [
// 			{translateX: 130},
// 			{translateY: 0},
// 		],
// 		textDecorationLine: "none",
// 		lineHeight: 20,
// 		fontSize: 14,
// 		color: "rgba(255, 255, 255, 1)",
// 		textAlign: "left",
// 		textAlignVertical: "top",
// 		letterSpacing: 0.1,
// 		flexShrink: 0,
// 	},
// });








// import React, { Component } from 'react';
// import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View, Alert, Image } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Auth from './Token';
// import Login from './UserInfo';
// import { EventRegister } from 'react-native-event-listeners'
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import Svg, { Path, SvgUri } from "react-native-svg";
// import { LogBox } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Dimensions } from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
// import { Margarine_400Regular } from '@expo-google-fonts/dev';


// LogBox.ignoreAllLogs();//Ignore all log notifications

// const entireScreenWidth = Dimensions.get('window').width;

// export default class LoginScreen extends Component {

//   emailInputRef = React.createRef();
//   passwordInputRef = React.createRef();
//   firstnameInputRef = React.createRef();
//   lastnameInputRef = React.createRef();
//   occupationInputRef = React.createRef();
//   addressInputRef = React.createRef();
//   zipInputRef = React.createRef();
//   phoneInputRef = React.createRef();
//   scrollViewRef = React.createRef();

//   constructor(props) {
//     super(props);
//     this.state = {
//         email: '',
//         password: '',

//         showEmailError: false,
//         showPasswordError: false,

//     };
//     this.submitPressed = this.submitPressed.bind(this);
//   }

//   inputs = () => {
//     return [
//       this.emailInputRef,
//       this.passwordInputRef,

//     ];
//   };

//   onChangeEmailInputHandler = (value) => {
    
//     this.setState({
//       email: value,
//     });
//   }

//   onChangePasswordInputHandler = (value) => {
  
//     this.setState({
//       password: value,
//     });
//   }

//   async submitPressed() {
//     console.log(this.state.email)
//     console.log(this.state.password)
//     const formData = new FormData();
//     formData.append('username', this.state.email);
//     formData.append('password', this.state.password);

//     const token = await fetch('https://zkb-coffee-app.herokuapp.com/api/auth/login/', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: formData,
//     });
//     const jsonToken = await token.json();
//     console.log(jsonToken)
//     Auth.setToken(jsonToken.token)
//     console.log("TOKEN:", Auth.getToken())
//     EventRegister.emit('UserLogin', '')
//     Keyboard.dismiss();
// 	if(typeof Auth.getToken() == 'undefined'){
// 		Alert.alert("Не получилось войти", "Возможно вы ввели что-то не так" )
// 	}
// 	else{Alert.alert("Вы вошли в свой профиль" )}
//   }

//   render() {
// 		return (
// 			<SafeAreaView style={styles.container}>
//       			<ScrollView style={styles.scrollView}>
// 				  <View style = {styles.row}>
// 					<View style = {styles.svg}>
// 						<Image
// 							style={styles.tinyLogo}
// 							source={{uri: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/buy_me_a_coffee_logo_icon_145434.png'}}
// 						/>
// 						</View>
// 						<View style = {styles.headers}>
// 							<View>
// 								<Text style = {styles.h1}>WHERE'S MY</Text>
// 							</View>
// 							<View>
// 								<Text style = {styles.h2}>COFFEE</Text>
// 							</View>
// 						</View>
// 					</View>
// 				<View style = {styles.mainheader}>
// 					<Text style = {styles.h3}>Авторизация</Text>
// 				</View>
// 				<View style = {styles.allinp}>

// 					<View style = {styles.names}>
// 						<Text style = {styles.names}>Адрес электронной почты</Text>
// 					</View>

// 					<View style = {styles.inputs}>
// 						<TextInput
// 							placeholder="Почта"
// 							returnKeyType="next"
// 							onChangeText={this.onChangeEmailInputHandler}
// 							placeholderTextColor="lightgrey"
// 						/>
// 					</View>

// 					<View style = {styles.names}>
// 						<Text style = {styles.names}>Ваш пароль</Text>
// 					</View>
					
// 					{/* <View style = {styles.inputs}>
// 						<TextInput
// 							placeholder="Пароль"
// 							returnKeyType="next"
// 							onChangeText={this.onChangePasswordInputHandler}
// 							placeholderTextColor="lightgrey"
// 						/>
// 					</View> */}

// 				</View>
// 				</ScrollView>
//     		</SafeAreaView>
// 		);
//   }
// }
  

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	  },
// 	  scrollView: {
// 		// marginHorizontal: 20,
// 		// backgroundColor: "#7cb48f",
// 		height: '10%'
// 	  },
// 	  row: {
// 		marginTop: '20%',
// 		flex: 1,
// 		position: 'relative',
// 		justifyContent: 'center',
// 		// alignItems: 'center',
// 		flexDirection: 'row',
// 	  },
// 	  svg: {
// 		// backgroundColor: "#7cb48f",
// 		flex: 0,
// 		width: 50*(entireScreenWidth / 380),
// 		height: 50*(entireScreenWidth / 380),
// 		margin: 4,
// 	  },
// 	  h1: {
// 		  fontSize: 19 * (entireScreenWidth / 380)
// 	  },
// 	  h2: {
// 		  fontSize: 30 * (entireScreenWidth / 380),
// 		  fontWeight: "500"
// 	  },
// 	  headers:{
// 		  flexDirection: 'column',
// 		  flex: 0
// 	  },
// 	  mainheader:{
// 		marginTop: '15%',
// 		flex: 1,
// 		position: 'relative',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	  },
// 	  h3:{
// 		  fontSize: 42,
// 		  fontWeight: "600"
// 		//   textDecorationLine: 'underline',

// 	  },
// 	  tinyLogo: {
// 		width: 50 * (entireScreenWidth / 380),
// 		height: 50 * (entireScreenWidth / 380),
// 	  },
// 	  allinp:{
// 		flexDirection: 'column',
// 		marginTop: '15%',
// 	  },
// 	  names:{
// 		margin: 5,
// 		left: 0,
// 		fontSize: 12 * (entireScreenWidth / 380)
// 	  },
// 	  inputs: {
		
// 	  },
//   });
  