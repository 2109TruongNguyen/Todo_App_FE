const API ={
    BASE_URL: "http://localhost:5000",

    Authentication : {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        LOGOUT: "/api/auth/logout",
        REFRESH: "/api/auth/refresh-token",
    },

    User : {
        UPDATE_AVATAR: "/api/user/update-avatar",
        UPDATE_PROFILE: "/api/user/update-profile",
        GET_INFORMATION: "/api/user/get-information",
    },

    Category : {
        CREATE: "/api/categories/create",
    }
}

export default API;