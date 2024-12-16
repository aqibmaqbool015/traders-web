import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

function MapComponent({ isVehicleDetail }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (
      isVehicleDetail?.lat &&
      isVehicleDetail?.long &&
      !isNaN(isVehicleDetail.lat) &&
      !isNaN(isVehicleDetail.long)
    ) {
      setMapLoaded(true);
    }
  }, [isVehicleDetail]);

  const defaultProps = {
    center: {
      lat: parseFloat(isVehicleDetail?.lat) || 0,
      lng: parseFloat(isVehicleDetail?.long) || 0,
    },
    zoom: 11,
  };

  const handleApiLoaded = (map, maps) => {
    new maps.Marker({
      position: defaultProps.center,
      map,
      title: "Vehicle Location",
    });
  };

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
          language: "en",
          region: "gb",
        }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
}

export default MapComponent;
