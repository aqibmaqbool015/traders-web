import Autocomplete from "react-google-autocomplete";

<Autocomplete
  apiKey="AIzaSyD_KJynrQba_jgW-fo3F4ItmLiy58jD0es"
  style={{ width: "90%" }}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
  options={{
    types: ["(regions)"],
    componentRestrictions: { country: "gb" },
  }}
  defaultValue="London"
/>;
