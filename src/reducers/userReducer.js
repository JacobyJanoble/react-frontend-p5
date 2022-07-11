const initialState = {
    isLoggedIn: false,
    allUsers: [],
    currentUser: {
        password: '',
        username: '',
        email: ''
    },
    notifications: [],
    userFetch: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS' : {
            return {
                ...state,
                allUsers: action.users,
                userFetch: true
            }
        }
        case 'LOGOUT' : {
            return {
                ...state,
                isLoggedIn: false,
                currentUser: action.user
            }
        }
        case 'LOGIN' : {
            let cUser = state.allUsers.find(user => user.username === action.username)
            return {
                ...state,
                isLoggedIn: true,
                currentUser: cUser
            }
        }
        case 'SIGN_UP' : {
            let cUser = action.user
            return {
                ...state,
                isLoggedIn: true,
                currentUser: cUser
            }
        }
        case 'BAN_USER' : {
            let newAllUsers = state.allUsers.filter(u => u.id !== action.channelMember.user_id)
            let bannedUser = state.allUsers.find(u => u.id === action.channelMember.user_id)
            bannedUser.channel_members = bannedUser.channel_members.filter(cMemb => cMemb.channel_id !== action.channelMember.channel_id)
            let newNotification = `You have been banned from ${action.channelTitle}`
            return {
                ...state,
                allUsers: [...newAllUsers, bannedUser],
                notifications: [...state.notifications, newNotification ]
            }
        }
        default:
            return state;
    }
};

export default userReducer;