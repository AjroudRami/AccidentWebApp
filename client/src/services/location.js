const location = {
  lat: 43.615552,
  lng: 7.072875
}
export default {
  lat: location.lat,
  lng: location.lng,
  setLocation: function(lat, lng) {
    this.lat = lat
    this.lng = lng
  }
}
