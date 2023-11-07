// Mapman Mapman Mapman manmanman

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup,Tooltip } from "react-leaflet";
import { Icon } from "leaflet";




function Map() {


  const icons = new Icon({
    iconUrl: require("../img/questmarker.png"),
    iconSize: [16,64]
});
  const markers= [{
    id : 0,
    geocode: [51.505, -0.09],
    popUp :"kill 5 wolfs for 5 gold 32 copper",
    time:"11/09/1979"
  },{
    id : 1,
    geocode: [51.505, -0.04],
    popUp :"Talk to lady next to commender",
    time:"28/04/2004"
  },
  {
    id : 2,
    geocode: [51.48, -0.08],
    popUp :"Found the Ligma of the wood",
    time:"01/02/1989"
  }]
  return (
    <MapContainer 
    center={[51.505, -0.09]}
    zoom={13} 
    style={{ height: "1000px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {/*  Markers and Popups here */
      markers.map(marker =>(
          <Marker position={marker.geocode}
          icon={icons}>
            
            <Tooltip direction="right" offset={[5, 0]} opacity={1} permanent>
              {marker.id +1}
            </Tooltip>
            <Popup>
              <h2>Quest</h2>
              <p>
              {marker.popUp}
              </p>
              <span>{marker.time}</span>
              
            </Popup>

          </Marker>
          
         )
        )
      }

    </MapContainer>
  );
}

export default Map;
