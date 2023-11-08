import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showNavbar: false,
    showSetting: false,
    showSidebar: false,
    showSearch: false,
    isRequest: false,
    errorGlobal: '',
    notifyGlobal: '',
    showDetailPost: false,
    showDetailCustomer: false,
    showDetailCategory: false,
    showDetailAdmin: false,
    showDetailComment: false,
    showUpdatePost: false,
    showUpdateCategory: false,
    showUpdateCustomer: false,
    showUpdateAdmin: false,
    showUpdateComment: false,
}
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        toggleNavbar: (state) => {
            return {
                ...state,
                showNavbar: !state.showNavbar
            }
        },
        toggleSetting: (state) => {
            return {
                ...state,
                showSetting: !state.showSetting
            }
        },
        toggleSearch: (state) => {
            return {
                ...state,
                showSearch: !state.showSearch
            }
        },
        toggleSideBar: (state) => {
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        },
        toggleDetaiPost: (state) => {
            return {
                ...state,
                showDetailPost: !state.showDetailPost
            }
        },
        toggleDetailCategory: (state) => {
            return {
                ...state,
                showDetailCategory: !state.showDetailCategory
            }
        },
        toggleDetailCustomer: (state) => {
            return {
                ...state,
                showDetailCustomer: !state.showDetailCustomer
            }
        },
        toggleDetailAdmin: (state) => {
            return {
                ...state,
                showDetailAdmin: !state.showDetailAdmin
            }
        },
        toggleUpdateAdmin: (state) => {
            return {
                ...state,
                showUpdateAdmin: !state.showUpdateAdmin
            }
        },
        toggleUpdateCustomer: (state) => {
            return {
                ...state,
                showUpdateCustomer: !state.showUpdateCustomer
            }
        },
        toggleUpdateCategory: (state) => {
            return {
                ...state,
                showUpdateCategory: !state.showUpdateCategory
            }
        },
        toggleUpdatePost: (state) => {
            return {
                ...state,
                showUpdatePost: !state.showUpdatePost
            }
        },

        closeNavbar: (state) => {
            return {
                ...state,
                showNavbar: false
            }
        },
        closeSidebar: (state) => {
            return {
                ...state,
                showSidebar: false
            }
        },
        closeDetailPost: (state) => {
            return {
                ...state,
                showDetailPost: false
            }
        },
        closeDetailCategory: (state) => {
            return {
                ...state,
                showDetailCategory: false
            }
        },
        closeDetailCustomer: (state) => {
            return {
                ...state,
                showDetailCustomer: false
            }
        },
        closeDetailAdmin: (state) => {
            return {
                ...state,
                showDetailAdmin: false
            }
        },
        closeUpdatePost: (state) => {
            return {
                ...state,
                showUpdatePost: false
            }
        },
        closeUpdateAdmin: (state) => {
            return {
                ...state,
                showUpdateAdmin: false
            }
        },
        closeUpdateCustomer: (state) => {
            return {
                ...state,
                showUpdateCustomer: false
            }
        },
        closeUpdateCategory: (state) => {
            return {
                ...state,
                showUpdateCategory: false
            }
        },
        closeSetting: (state) => {
            return {
                ...state,
                showSetting: false
            }
        },
        closeSearch: (state) => {
            return {
                ...state,
                showSearch: false
            }
        },
        setErrorGlobal: (state, action) => {
            return {
                ...state,
                errorGlobal: action.payload
            }
        },
        setNotifyGlobal: (state, action) => {
            return {
                ...state,
                notifyGlobal: action.payload
            }
        },
        setRequest: (state, action) => {
            return {
                ...state,
                isRequest: action.payload
            }
        }
    }
})

export const { toggleNavbar, toggleSearch, toggleSetting, closeNavbar, closeSearch, closeSetting, setErrorGlobal, setNotifyGlobal, setRequest, closeDetailAdmin, closeDetailCategory, closeDetailCustomer, closeDetailPost, closeSidebar, toggleDetaiPost, toggleDetailAdmin, toggleDetailCategory, toggleDetailCustomer, toggleSideBar, closeUpdateAdmin, closeUpdateCategory, closeUpdateCustomer, closeUpdatePost, toggleUpdateAdmin, toggleUpdateCategory, toggleUpdateCustomer, toggleUpdatePost } = globalSlice.actions;
export default globalSlice.reducer