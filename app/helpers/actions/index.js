import {
    ADD_MARKERS,
    REMOVE_MARKER,
    UPDATE_FIRST,
    UPDATE_LAST,
    UPDATE_CAMERA,
    UPDATE_TYPE,
    UPDATE_DESCRIPTION,
    UPDATE_DATE,
    UPDATE_ADULTS,
    UPDATE_CHILDREN,
    UPDATE_DRIVER_ID,
    UPDATE_USER_INFO,
    SET_ROOMS,
    SET_UPDATE_ROOM,
    UPDATE_IS_OPEN,
    UPDATE_JOIN,
    LEAVE_ROOM,
    UPDATE_MEMBERS_REFERENCE,
    SET_ROOM_MEMBERS,
    RESET_MAP,
    RESET_MARKER,
    RESET_ORDER,
    RESET_RESERVATION,
    RESET_ROOM,
    RESET_ROOM_MEMBERS, RESET_SETTING, RESET_TAB_BAR, RESET_TOAST
} from "../reducers/names";



export const addToast = (toast)  => {
    return {
        type: 'AddToast',
        payload: {
            message: toast
        }
    }
}

export const removeToast = (key)  => {
    return {
        type: 'RemoveToast',
        payload: {
            key: key
        }
    }
}

// Map => Markers

export const addMarker = (marker, label) => {
    return {
        type: ADD_MARKERS,
        payload: {
            location: marker,
            label: label
        }
    }
}

export const removeMarker = (marker) => {
    return {
        type: REMOVE_MARKER,
        payload: {
            location: marker
        }
    }
}

// SearchBox => Markers

export const updateFirstMarker = (marker, label) => {
    return {
        type: UPDATE_FIRST,
        payload: {
            location: marker,
            label: label
        }
    }
}

export const updateLastMarker = (marker, label) => {
    return {
        type: UPDATE_LAST,
        payload: {
            location: marker,
            label: label
        }
    }
}

// MAP

export const updateCamera = (camera) => {
    return {
        type: UPDATE_CAMERA,
        payload: {
            camera: camera
        }
    }
}


// Reservations

export const updateType = (value) => {
    return {
        type: UPDATE_TYPE,
        payload: {
            type: value
        }
    }
}

export const updateDate = (value) => {
    return {
        type: UPDATE_DATE,
        payload: {
            date: value
        }
    }
}

export const updateAdults = (value) => {
    return {
        type: UPDATE_ADULTS,
        payload: {
            adults: value
        }

    }
}

export const updateChildren = (value) => {
    return {
        type: UPDATE_CHILDREN,
        payload: {
            children: value
        }

    }
}

export const updateDescription = (value) => {
    return {
        type: UPDATE_DESCRIPTION,
        payload: {
            description: value
        }

    }
}

export const updateDriverId = (value) => {
    return {
        type: UPDATE_DRIVER_ID,
        payload: {
            driverid: value
        }

    }
}

// Settings

export const updateUserInfo = (value) => {
    return {
        type: UPDATE_USER_INFO,
        payload: {
            userInfo: value
        }
    }
}

// Rooms

export const updateRoom = (value) => {
    return {
        type: SET_UPDATE_ROOM,
        payload: {
            room: value
        }
    }
};

export const updateJoin = (value) => {
    return {
        type: UPDATE_JOIN,
        payload: {
            id: value
        }
    }
}

export const updateMembersReference = (value) => {
    return {
        type: UPDATE_MEMBERS_REFERENCE,
        payload: {
            membersReference: value
        }

    }
}

export const leaveRoom = (value) => {
    return {
        type: LEAVE_ROOM,
        payload: {
            roomId: value
        }
    }
}

// tabBar

export const updateIsOpen = (value) => {
    return {
        type: UPDATE_IS_OPEN,
        payload: {
            open: value
        }
    }
}

// roomMembers

export const updateRoomMembers = (value) => {
    return {
        type: SET_ROOM_MEMBERS,
        payload: {
            roomMembers: value
        }
    }
}


// Reset states

export const resetMap = () => {
    return {
        type: RESET_MAP
    }
}

export const resetMarker = () => {
    return {
        type: RESET_MARKER
    }
}

export const resetOrder = () => {
    return {
        type: RESET_ORDER
    }
}

export const resetReservation = () => {
    return {
        type: RESET_RESERVATION
    }
}

export const resetRoom = () => {
    return {
        type: RESET_ROOM
    }
}

export const resetRoomMembers = () => {
    return {
        type: RESET_ROOM_MEMBERS
    }
}

export const resetSettings = () => {
    return {
        type: RESET_SETTING
    }
}

export const resetTabBar = () => {
    return {
        type: RESET_TAB_BAR
    }
}

export const resetToasts = () => {
    return {
        type: RESET_TOAST
    }
}




// devs
export const clearToast = ()  => {
    return {
        type: 'ClearToast'

    }
}

export const clearMarkers = () => {
    return {
        type: 'ClearMarkers'
    }
}
