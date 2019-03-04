const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'Error404',
            component: function (resolve, reject) {
                loadComponent('Error404', '/components/Pages/Error404/js/Error404.js').then(resolve, reject);
            }
        },
        {
            path: '/',
            name: 'Main',
            component: function (resolve, reject) {
                loadComponent('Main', '/components/Pages/Main/js/Main.js').then(resolve, reject);
            },
            children: [
                {
                    path: '',
                    component: function (resolve, reject) {
                        loadComponent('Step_1', '/components/Pages/Main/Steps/Step_1/js/Step_1.js').then(resolve, reject);
                    }
                },
                {
                    path: 'Step-2',
                    component: function (resolve, reject) {
                        loadComponent('Step_2', '/components/Pages/Main/Steps/Step_2/js/Step_2.js').then(resolve, reject);
                    }
                }
            ]
        }
    ]
});