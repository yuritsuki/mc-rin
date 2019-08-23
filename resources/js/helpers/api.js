import axios from 'axios'

export function post(_this, url, payload, successCallback, errorCallback) {

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`, 'Accept': 'application/json'} : '';

    return axios({
        method: 'POST',
        url: "http://academy-back.tk" + url,
        data: payload,
        headers: headers
    }).then(response => {
        successCallback( response.data );
    }).catch(error => {
        if(!error.status)
            console.log('network error');
        console.log(error.response);
        if(errorCallback)
            errorCallback( error );
    });
}

export function get(_this, url, payload, successCallback, errorCallback) {

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return axios({
        method: 'GET',
        url: "http://academy-back.tk" + url,
        params: payload.params,
        headers: headers
    }).then(response => {
        successCallback( response.data );
    }).catch(error => {
        if(errorCallback)
            errorCallback( error );
    });
}


export function del(_this, url, payload, successCallback, errorCallback) {

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return axios({
        method: 'DELETE',
        url: "http://academy-back.tk" + url,
        headers: headers
    }).then(response => {
        successCallback( response );
    }).catch(error => {
        if(errorCallback)
            errorCallback( error );
    });


}

// Запрос с выводом прогресса загрузки
export function postFile(_this, url, payload, progressCallback, successCallback, errorCallback) {

    let headers = _this.$auth.getToken() ? {'Authorization': `Bearer ${_this.$auth.getToken()}`} : '';

    return axios({
        method: 'POST',
        url: "http://academy-back.tk" + url,
        data: payload,
        headers: headers,
        onUploadProgress: function (progressEvent) {
            const progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            progressCallback(progress);
        }
    }).then(response => {
        successCallback( response );
    }).catch(error => {
        if(!error.status)
            console.log('network error');
        console.log(error.response);
        if(errorCallback)
            errorCallback( error );
    });

}
