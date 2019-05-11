import React, { memo } from 'react';

import GoogleMapReact, { ChangeEventValue } from 'google-map-react';
import { googleMapAPIKey } from '../apiKey';

export interface MapProps extends Partial<ChangeEventValue> {}

export interface EventMarkerInterface {
  marker?: number;
  key?: number;
  lat: number;
  lng: number;
  showBalloon?: boolean;
  children?: React.ReactChild;
}

const EventMarker = ({ children }: EventMarkerInterface) => (
  <div style={{ color: 'white', fontSize: '21px' }}>{children}</div>
);

const Map = (props: MapProps) => {
  const { center } = props;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapAPIKey }}
        defaultCenter={center}
        defaultZoom={props.zoom}
        options={{
          styles: [
            {
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f5f5eb' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#212a37' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }]
            }
          ]
        }}
      >
        {center && (
          <EventMarker
            marker={444}
            key={4}
            lat={center.lat}
            lng={center.lng}
            showBalloon
          >
            <i className="fa fa-map-marker" aria-hidden="true" />
          </EventMarker>
        )}
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  zoom: 12
};

export default memo(Map);
