Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        stepChecked: false,
        routePageLoading: true,
        langLoading: false,
        stepState: 0,
        data: {
            websiteName: "",
            websiteDescription: "",
            db: {
                host: "",
                dbName: "",
                username: "",
                password: ""
            }
        }
    },

    mutations: {
        SET_LANG(state, payload) {
            loadLanguageAsync(payload)
            LanguageUtil.saveLanguage(payload)
        },

        initializeCurrentStep(state, response) {
            const step = response.data.step

            state.stepState = step

            if (step === 0) {
                router.push('/')
            } else if (step === 1) {
                state.data.websiteName = response.data.websiteName
                state.data.websiteDescription = response.data.websiteDescription

                router.push('/step-1')
            } else if (step === 2) {
                state.data.db.host = response.data.db.host
                state.data.db.dbName = response.data.db.dbName
                state.data.db.username = response.data.db.username
                state.data.db.password = response.data.db.password

                router.push('/step-2')
            } else if (step === 3) {
                // TODO

                router.push('/step-3')
            } else {
                router.push('/')
            }

            state.stepChecked = true
        }
    },

    actions: {
        setLang({commit}, payload) {
            commit('SET_LANG', payload)
        },

        checkCurrentStep(context) {
            ApiUtil.post("/api/setup/step/check", {})
                .then(response => {
                    context.commit("initializeCurrentStep", response)
                })
        },

        nextStep(context, data) {
            ApiUtil.post("/api/setup/step/nextStep", data)
                .then(() => {
                    context.dispatch("checkCurrentStep")
                })
        },

        backStep(context, data) {
            ApiUtil.post("/api/setup/step/backStep", data)
                .then(() => {
                    context.dispatch("checkCurrentStep")
                })
        }
    },

    getters: {}
})
