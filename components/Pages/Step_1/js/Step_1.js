'use strict';

Vue.component('Step_1', new Promise(function (resolve) {
        axios.get('/components/Pages/Step_1/ui').then(function (response) {
            resolve({
                template: response.data
            });
        });
    })
);