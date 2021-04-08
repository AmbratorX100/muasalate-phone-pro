import React, { Component } from "react";
import { Dimensions, StyleSheet, Platform} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';

// Redux
import { connect} from 'react-redux'
import {addMarker, addToast, removeMarker, clearMarkers, updateCamera} from "../helpers/actions";
import { geoInfo } from '../helpers/auth'



const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE = 24.4638;
const LONGITUDE = 54.363;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyAPTCCzITkFpUrtjJMEPQsgMS9wsW6NYX4';

const cleanMarkersInfo = (markers) => {
    // maybe more info will come and needed to be cleaned

    // console.log(markers)
    return markers
}


class Map extends Component {

    constructor(props) {
        // console.log(Platform.OS)
        super(props);
        // this.props.clearMarkers();

        this.state = {
            markerColors: ['red', 'black', 'blue', 'green', 'grey', 'orange', 'purple', 'white', 'yellow']
        };

        this.mapView = null;

        this.moveCamera = this.moveCamera.bind(this)


    }

    onMapPress = async (e) => {
        if (this.props.markers.length < 11) {
            const coordinates = e.nativeEvent.coordinate
            this.props.AddMarker(coordinates, await geoInfo(coordinates))

            const coordinate = {latitude: coordinates.latitude, longitude: coordinates.longitude}
            this.moveCamera(coordinate)
        }

    }

    moveCamera = (coordinate) => {
        this.mapView.animateCamera({center: coordinate, pitch: 2, heading: 20, altitude: 200, zoom: 13}, {duration: 800})

    }

    componentDidMount() {
        this.props.UpdateCamera(this.moveCamera)

    }


    render() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE} // give the user more options
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                style={StyleSheet.absoluteFill}
                ref={c => this.mapView = c}
                onPress={this.onMapPress}
            >
                {this.props.markers.map((coordinate, index) =>

                    <MapView.Marker
                        key={`${coordinate.location.latitude}_${coordinate.location.longitude}`}
                        coordinate={coordinate.location}
                        // icon={{
                        //     url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_${this.state.markerColors[Math.floor(Math.random() * 9)]}${++index}.png`
                        //
                        // }}
                        onPress={() => Platform.OS !== 'ios' ? this.props.RemoveMarker(coordinate.location): null}
                    />

                )}
                {(this.props.markers.length >= 2) && (
                    <MapViewDirections
                        origin={this.props.markers[0].location}
                        waypoints={ (this.props.markers.length > 2) ? this.props.markers.slice(1, -1).map(location => location.location): []}
                        destination={this.props.markers[this.props.markers.length-1].location}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="blue"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            // console.log(`Distance: ${result.distance} km`)
                            // console.log(`Duration: ${result.duration} min.`)
                            this.props.AddToast([`Distance: ${result.distance} km\n\n`, `Duration: ${result.duration.toFixed(2)} min.` ])

                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 20),
                                    bottom: (height / 20),
                                    left: (width / 20),
                                    top: (height / 20),
                                }
                            });
                        }}
                        onError={(errorMessage) => {
                            console.log('GOT AN ERROR\n', errorMessage);
                        }}
                    />
                )}
            </MapView>
        );
    }
}
// Redux - connect
const mapStateToProps = (state) => {
    return {
        // Markers
        markers: cleanMarkersInfo(state.Markers),

    }
}

const mapDispatchToProps = dispatch => {
    return {
        // Markers
        AddMarker: (marker, label) => dispatch(addMarker(marker, label)),
        RemoveMarker: marker => dispatch(removeMarker(marker)),
        clearMarkers: () => dispatch(clearMarkers()),

        // Toasts
        AddToast: msg => dispatch(addToast(msg)),

        // Set Map ref
        UpdateCamera: camera => dispatch(updateCamera(camera))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
