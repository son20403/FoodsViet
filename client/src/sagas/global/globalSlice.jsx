import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showNavbar: false,
    showSetting: false,
    showSearch: false,
    isRequest: false,
    errorGlobal: '',
    notifyGlobal: ''
}
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        toggleNavbar: (state,) => {
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
        closeNavbar: (state,) => {
            return {
                ...state,
                showNavbar: false
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

export const { toggleNavbar, toggleSearch, toggleSetting, closeNavbar, closeSearch, closeSetting, setErrorGlobal, setNotifyGlobal, setRequest } = globalSlice.actions;
export default globalSlice.reducer