import React from 'react'
import MapView from 'react-native-maps'
import CustomeSafeArea from '../components/CustomeSafeArea'
import CustomeTitle from '../components/CustomeTitle'

const Map = () => {
    return (
        <CustomeSafeArea>
            <CustomeTitle title='Map' />
            <MapView
                mapType={Platform.OS == "android" ? "none" : "standard"}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </CustomeSafeArea>
    )
}

export default Map