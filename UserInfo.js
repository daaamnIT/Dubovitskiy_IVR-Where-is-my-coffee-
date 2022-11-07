var email = '';
var firstname = '';
var lastname = '';
var date_joined = '';
var is_Owner = '';

export default class Login {
    static getInfoEmail(){
        return email;
    }

    static getInfoFirstname(){
        return firstname;
    }

    static getInfoLastname(){
        return lastname;
    }

    static getInfoJoined(){
        return date_joined;
    }

    static setFirstname(name){
        firstname = name;
    }

    static getStatus(){
        return is_Owner;
    }

    static setStatus(status){
        is_Owner = status
    }

    static setInfo(_email, _firstname, _lastname, _datejoined){
        email = _email;
        firstname = _firstname;
        lastname = _lastname;
        date_joined = _datejoined;
    }
}