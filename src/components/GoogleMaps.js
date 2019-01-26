import React from "react";
import {compose, withProps, withHandlers, withState} from "recompose"
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import {DrawingManager} from "react-google-maps/lib/components/drawing/DrawingManager";
export const GoogleMaps = compose(withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,place" +
            "s",
    loadingElement: <div style={{
        height: `100%`
    }}/>,
    containerElement: <div style={{
        height: `400px`
    }}/>,
    mapElement: <div style={{
            height: `100%`
        }}/>
}), withState('bounds', 'onBoundsChange', {}), withHandlers(() => {
    const refs = {
        map: undefined
    }

    return {
        onMapMounted: () => ref => {
            refs.map = ref
        },
        onBoundsChanged: ({onBoundsChange}) => () => {
            onBoundsChange(refs.map.getBounds());
        }
    }
}), withScriptjs, withGoogleMap)((props) => <GoogleMap
    defaultZoom={7}
    ref={props.onMapMounted}
    bounds={props.bounds}
    onBoundsChanged={props.onBoundsChanged}
    defaultCenter={{
    lat: 35.397,
    lng: 50.644
}}>
    {props.isMarkerShown && props
        .data
        .map((item, index) => (<Marker
            key={index.toString()}
            position={{
            lat: item.lat,
            lng: item.long
        }}/>))
}
    <DrawingManager
        defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}
        onPolygonComplete={props.polyComplete}
        defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            fillColor: `#f38`,
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        }
    }}/>
</GoogleMap>)