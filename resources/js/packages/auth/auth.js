export default function (Vue) {
    Vue.auth = {

        setToken(token) {
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', 31622400 + Date.now());
        },

        getToken() {
            let token = localStorage.getItem('token');
            let expiration = localStorage.getItem('expiration');

            if (!token || !expiration)
                return null;

            if (Date.now() > parseInt(expiration)) {
                this.destroyToken();
                return null;
            }

            return token;

        },

        destroyToken() {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            this.destroyAccountId();
        },

        isAuthenticated() {
            return !!this.getToken();
        },

        setAccountId(accountId) {
            localStorage.setItem('accountId', accountId);
        },
        getAccountId(){

            let accountId = localStorage.getItem('accountId');

            return accountId ? accountId : null;

        },
        destroyAccountId(){
            localStorage.removeItem('accountId');
        },



    };

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get() {
                return Vue.auth;
            }
        }
    })
}