var IP = 'http://127.0.0.1:8000'

export default class IpAdress{
    static GetIp(){
        return IP
    }
    static setIP(_IP){
        IP = _IP
    }
}
