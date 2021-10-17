export const getIcon = (weatherId) => {
  const r1 = /^2\d+/;
  const r2 = /^3\d+/;
  const r3 = /^5\d+/;
  const r4 = /^6\d+/;
  const r5 = /^7\d+/;

  const wString = weatherId.toString();
  if (r1.test(wString)) {
    return "mdi-weather-lightning";
  } else if (r2.test(wString)) {
    return "mdi-weather-rainy";
  } else if (r3.test(wString)) {
    return "mdi-weather-pouring";
  } else if (r4.test(wString)) {
    return "mdi-weather-snowy-heavy";
  } else if (r5.test(wString)) {
    return "mdi-weather-tornado";
  } else if (wString === "800") {
    return "mdi-weather-sunny";
  } else if (weatherId >= 801 || weatherId <= 802) {
    return "mdi-weather-partly-cloudy";
  } else {
    return "mdi-weather-cloudy";
  }
};

const GOOGLE_MAPS_API_KEY = "AIzaSyCJfNSlTfsEGFo5FrYLHXzQzRdFtLtY9Oo";

export const getGoogleMapScript = () => {
  const checkScript = document.getElementById("google-maps");
  if (!checkScript) {
    const script = document.createElement("script");
    const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.setAttribute("id", "google-maps");
    script.setAttribute("async", "");
    script.setAttribute("src", src);
    document.head.appendChild(script);
    return script;
  }
  return checkScript;
};
