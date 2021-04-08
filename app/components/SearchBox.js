import React, {useEffect, useState, createRef} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'react-native-elements';

import {updateFirstMarker, updateLastMarker} from "../helpers/actions";


// Redux
import { useDispatch, useSelector } from "react-redux";








const SearchBox = () => {
    const markers = useSelector(state => state.Markers);
    const camera = useSelector(state => state.mapConf.Camera)
    const dispatch = useDispatch();

    const inputSource = createRef();
    const inputDestination = createRef();

    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    // temp states

    const [tempSource, setTempSource] = useState('');
    const [tempDestination, setTempDestination] = useState('');

    // Create the function to link searchBox with the markers - maps




    useEffect(() => {


        if (markers.length > 0) {
            setTempSource(markers[0].label)
        }
        if (markers.length > 1) {
            setTempDestination(markers[markers.length - 1 ].label)
        }

        // if marker removed
        if (markers.length === 0 ) {
            setTempSource('')

        }
        if (markers.length === 1 ) {
            setTempDestination('')
        }



    }, [markers]);





    return (
        <>
            <GooglePlacesAutocomplete
                placeholder='Source'
                minLength={2}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    const coordinate =  {latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}
                    dispatch(updateFirstMarker(coordinate, details.formatted_address))
                    camera(coordinate)

                    // setSource(data.description)
                    // inputSource.current.blur()

                }}
                query={{
                    key: 'AIzaSyAPTCCzITkFpUrtjJMEPQsgMS9wsW6NYX4',
                    language: 'en-ar',  // TODO: user preferences
                    components: 'country:AE',

                }}
                // currentLocation={allowed} TODO: something wrong is going here

                getDefaultValue={() => ''}
                textInputProps={{
                    InputComp: Input,
                    // leftIcon: { type: 'font-awesome', name: 'chevron-left' },
                    errorStyle: { color: 'red' },
                    value: tempSource,
                    onChangeText: val => setTempSource(val),
                    ref: inputSource,
                    onFocus: () => {
                        setSource(tempSource)
                        setTempSource('')
                    },
                    onBlur: () => {
                        setTempSource(source)
                        setSource('')
                    },



                }}
                keyboardShouldPersistTaps='always'

                styles={{
                    container: {
                        top:  40
                    },

                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    listView: {
                        color: 'red', //To see where exactly the list is
                        zIndex: 1000,//To popover the component outwards
                        position: 'absolute',
                        top: 55,
                        width: 355,
                        left: 10
                    },
                }}
            />

            <GooglePlacesAutocomplete
                textInputHide={markers.length < 1}
                placeholder='Destination'
                minLength={2}
                fetchDetails={true}

                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    const coordinate =  {latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}
                    dispatch(updateLastMarker(coordinate, details.formatted_address))
                    camera(coordinate)
                }}

                textInputProps={{
                    InputComp: Input,
                    // leftIcon: { type: 'font-awesome', name: 'chevron-left' },
                    errorStyle: { color: 'red' },
                    value: tempDestination,
                    onChangeText: val => setTempDestination(val),
                    ref: inputDestination,
                    onFocus: () => {
                        setDestination(tempDestination)
                        setTempDestination('')
                    },
                    onBlur: () => {
                        setTempDestination(destination)
                        setDestination('')
                    },


                }}


                query={{
                    key: 'AIzaSyAPTCCzITkFpUrtjJMEPQsgMS9wsW6NYX4',
                    language: 'en',
                    components: 'country:AE',

                }}



                styles={{
                    container: {
                        top:  -150
                    },

                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    listView: {
                        color: 'red', //To see where exactly the list is
                        zIndex: 1000,//To popover the component outwards
                        position: 'absolute',
                        top: 55,
                        width: 355,
                        left: 10
                    },
                }}
            />
        </>

    );
};

export default SearchBox;
