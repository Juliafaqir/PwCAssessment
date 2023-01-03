function initMap() {
    const PwCCoordinates = { lat: 31.956087449564073, lng: 35.90789081391843 };

    const mapOptions = {
        center: PwCCoordinates,
        mapTypeControl: false,
        zoom: 19,
    }

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchContainer);

    const autocomplete = new google.maps.places.Autocomplete(searchInput);

    // const infowindow = new google.maps.InfoWindow();
    // const infowindowContent = document.getElementById("infowindow-content");
    // infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
        map,
        // anchorPoint: new google.maps.Point(0, -29),
    });
    marker.setPosition(PwCCoordinates);

    autocomplete.addListener("place_changed", () => {
        // infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();
        console.log('*****place******',place);

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        // infowindowContent.children["place-name"].textContent = place.name;
        // infowindowContent.children["place-address"].textContent =
        // place.formatted_address;
        // infowindow.open(map, marker);
    });
}

window.initMap = initMap;