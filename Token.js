var Token = '';

export default class Auth {
    static getToken(){
        return Token;
    }

    static setToken(_token){
        Token = _token;
    }
}