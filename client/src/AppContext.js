import React, { Component } from "react";
import axios from "axios";
const tieAxios = axios.create();

tieAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const AppContext = React.createContext();

export class AppContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            players: [],
            player: {},
            helmets: [],
            helmet: {},
            shoulderpads: [],
            shoulderpad: {},
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || ""
        }
    }

    // componentDidMount() {
    //     this.getPlayers()
    //     this.getHelmets()
    //     this.getShoulderpads()
    // }

    getPlayers = () => {
        return tieAxios.get("/api/player")
            .then(response => {
                this.setState({ players: response.data });
                return response;
            })
    }
    getHelmets = () => {
        return tieAxios.get("/api/helmet")
            .then(response => {
                this.setState({ helmets: response.data });
                return response;
            })
    }
    getShoulderpads = () => {
        return tieAxios.get("/api/shoulderpad")
            .then(response => {
                this.setState({ shoulderpads: response.data });
                return response;
            })
    }

    addPlayer = newPlayer => {
        return tieAxios.post("/api/player/", newPlayer)
            .then(response => {
                this.setState(prevState => {
                    return { players: [...prevState.players, response.data] }
                });
                return response;
            })
    }
    addHelmet = newHelmet => {
        return tieAxios.post("/api/helmet/", newHelmet)
            .then(response => {
                this.setState(prevState => {
                    return { helmets: [...prevState.helmets, response.data] }
                });
                return response;
            })
    }
    addShoulderpad = newShoulderpad => {
        return tieAxios.post("/api/shoulderpad/", newShoulderpad)
            .then(response => {
                this.setState(prevState => {
                    return { shoulderpads: [...prevState.shoulderpads, response.data] }
                });
                return response;
            })
    }

    getPlayer = playerId => {
        return tieAxios.get(`/api/player/${playerId}`)
            .then(response => {
                this.setState({ player: response.data });
                return response;
            })
    }
    getPlayerCardInfo = playerId => {
        const foundPlayer = this.state.players.find(player => player._id === playerId)
        console.log(foundPlayer.showModal, foundPlayer._id)
        foundPlayer.showModal = !foundPlayer.showModal
        console.log(foundPlayer.showModal, foundPlayer._id)
        this.setState({ player: foundPlayer })

        const updateShowModal = {
            showModal: true
        }
        this.editPlayer(playerId, updateShowModal)
    }
    closePlayerCardInfo = playerId => {
        const foundPlayer = this.state.players.find(player => player._id === playerId)
        console.log(foundPlayer.showModal, foundPlayer._id)
        foundPlayer.showModal = !foundPlayer.showModal
        console.log(foundPlayer.showModal, foundPlayer._id)
        this.setState({ player: {} })

        const updateShowModal = {
            showModal: false
        }
        this.editPlayer(playerId, updateShowModal)
    }
    getHelmet = helmetId => {
        return tieAxios.get(`/api/helmet/${helmetId}`)
            .then(response => {
                this.setState({ helmet: response.data });
                return response;
            })
    }
    getShoulderpad = shoulderpadId => {
        return tieAxios.get(`/api/shoulderpad/${shoulderpadId}`)
            .then(response => {
                this.setState({ shoulderpad: response.data });
                return response;
            })
    }

    editPlayer = (playerId, player) => {
        console.log("fired", playerId, player)
        return tieAxios.put(`/api/player/${playerId}`, player)
            .then(response => {
                this.setState(prevState => {
                    const updatedPlayers = prevState.players.map(player => {
                        return player._id === response.data._id ? response.data : player
                    })
                    return { players: updatedPlayers }
                })
                return response;
            })
    }
    editHelmet = (helmetId, helmet) => {
        console.log("fired", helmetId, helmet)
        return tieAxios.put(`/api/helmet/${helmetId}`, helmet)
            .then(response => {
                this.setState(prevState => {
                    const updatedHelmets = prevState.helmets.map(helmet => {
                        return helmet._id === response.data._id ? response.data : helmet
                    })
                    return { helmets: updatedHelmets }
                })
                return response;
            })
    }
    editShoulderpad = (shoulderpadID, shoulderpad) => {
        return tieAxios.put(`/api/shoulderpad/${shoulderpadID}`, shoulderpad)
            .then(response => {
                this.setState(prevState => {
                    const updatedShoulderpads = prevState.shoulderpads.map(shoulderpad => {
                        return shoulderpad._id === response.data._id ? response.data : shoulderpad
                    })
                    return { shoulderpads: updatedShoulderpads }
                })
                return response;
            })
    }

    deletePlayer = (playerId) => {
        return tieAxios.delete(`/api/player/${playerId}`)
            .then(response => {
                this.setState(prevState => {
                    const updatedPlayers = prevState.players.filter(player => {
                        return player._id !== playerId
                    })
                    return { players: updatedPlayers }
                })
                return response;
            })
    }
    deleteHelmet = (helmetId) => {
        return tieAxios.delete(`/api/helmet/${helmetId}`)
            .then(response => {
                this.setState(prevState => {
                    const updatedHelmets = prevState.helmets.filter(helmet => {
                        return helmet._id !== helmetId
                    })
                    return { helmets: updatedHelmets }
                })
                return response;
            })
    }
    deleteShoulderpad = (shoulderpadId) => {
        return tieAxios.delete(`/api/shoulderpad/${shoulderpadId}`)
            .then(response => {
                this.setState(prevState => {
                    const updatedShoulderpads = prevState.shoulderpads.filter(shoulderpad => {
                        return shoulderpad._id !== shoulderpadId
                    })
                    return { shoulderpads: updatedShoulderpads }
                })
                return response;
            })
    }


    signup = (userInfo) => {
        return tieAxios.post("/auth/signup", userInfo)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({
                    user,
                    token
                });
                return response;
            })
    }

    login = (credentials) => {
        return tieAxios.post("/auth/login", credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.setState({
                    user,
                    token
                });
                this.getPlayers();
                this.getHelmets();
                this.getShoulderpads();
                return response;
            })
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            players: [],
            player: {},
            helmets: [],
            helmet: {},
            shoulderpads: [],
            shoulderpad: {},
            user: {},
            token: ""
        })
    }
    render() {
        return (
            <AppContext.Provider
                value={{
                    getPlayers: this.getPlayers,
                    getPlayer: this.getPlayer,
                    getPlayerCardInfo: this.getPlayerCardInfo,
                    closePlayerCardInfo: this.closePlayerCardInfo,
                    addPlayer: this.addPlayer,
                    editPlayer: this.editPlayer,
                    deletePlayer: this.deletePlayer,
                    getHelmets: this.getHelmets,
                    addHelmet: this.addHelmet,
                    editHelmet: this.editHelmet,
                    deleteHelmet: this.deleteHelmet,
                    getShoulderpads: this.getShoulderpads,
                    addShoulderpad: this.addShoulderpad,
                    editShoulderpad: this.editShoulderpad,
                    deleteShoulderpad: this.deleteShoulderpad,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    ...this.state
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        )
    }
}

export const withContext = Component => {
    return props => {
        return (
            <AppContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </AppContext.Consumer>
        )
    }
}