import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapComponent({ isVehicleDetail }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (isVehicleDetail?.lat && isVehicleDetail?.long) {
      setMapLoaded(true);
    }
  }, [isVehicleDetail]);

  const defaultProps = {
    center: {
      lat: isVehicleDetail?.lat || 59.955413,
      lng: isVehicleDetail?.long || 30.337844,
    },
    zoom: 11,
  };

  // console.log("Latitude:", defaultProps.center.lat);
  // console.log("Longitude:", defaultProps.center.lng);

  if (!mapLoaded) {
    return (
      <div className="text-center my-10 text-customBlue">Loading map...</div>
    );
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyD_KJynrQba_jgW-fo3F4ItmLiy58jD0es",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="Vehicle Location"
        />
      </GoogleMapReact>
    </div>
  );
}
