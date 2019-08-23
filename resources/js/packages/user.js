import { get } from '../helpers/api'

export default function (Vue) {

    Vue.user = {

        data: '',
        ready: false,


        init(_this, callback) {

            let component = this;

            get(_this, '/api/user', function (response) {

                component.data = response.data;
                component.ready = true;
                /* eslint-disable-next-line no-undef */
                _this.$root.user = data;
                _this.$root.userReady = true;

                callback();

            }, function () {

            });

        },

        getName() {
            return this.data ? this.data.firstname : '';
        }


    };

    Object.defineProperties(Vue.prototype, {
        $user: {
            get() {
                return Vue.user;
            }
        }
    })

}