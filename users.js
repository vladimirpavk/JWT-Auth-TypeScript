"use strict";
class Users {
    constructor() {
        this._fillKorisnici();
    }
    _fillKorisnici() {
        this._korisnici = [
            {
                'name': 'Vladimir',
                'password': 'vlada_pass',
                'role': 'admin',
                'roleid': 1
            },
            {
                'name': 'Natasa',
                'password': 'natasa_pass',
                'role': 'plain_user',
                'roleid': 2
            },
            {
                'name': 'Pavle',
                'password': 'pavle_pass',
                'role': 'little_user',
                'roleid': 3
            },
        ];
    }
    authUser(username, password) {
        let trazeni = this._korisnici.filter((item) => {
            return item.name == username && item.password == password;
        });
        return (trazeni.length > 0) ?
            {
                isAuthenticated: true,
                roleid: trazeni[0].roleid
            } :
            {
                isAuthenticated: false
            };
    }
}
exports.Users = Users;
//# sourceMappingURL=users.js.map