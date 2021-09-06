/*--
        Google Map
        -----------------------------------*/

    // Google Map For Single Property Map
    $('.googleMap-1').each(function() {
        if ($(this).length) {
            var $this = $(this);
            var $lat = $this.data('lat');
            var $long = $this.data('long');

            function initialize() {
                var mapOptions = {
                    zoom: 14,
                    scrollwheel: false,
                    center: new google.maps.LatLng($lat, $long),
                    styles: [{
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#F1F1F1"
                            }]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [{
                                    "color": "#F1F1F1"
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#fff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#fff"
                            }]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#F1F1F1"
                                },
                                {
                                    "weight": 1.8
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#ECECEC"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#FF5151"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#fff"
                            }]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#F1F1F1"
                            }]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#ffffff"
                            }]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#F9F9F9"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#B7B7B7"
                            }]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#8b8b8b"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#d6d6d6"
                            }]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {},
                        {
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#EBEBEB"
                            }]
                        }
                    ]
                };
                var map = new google.maps.Map(document.getElementById('googleMap-1'), mapOptions);
                var marker = new google.maps.Marker({
                    position: map.getCenter(),
                    icon: '',
                    map: map,
                    overlay: {
                        values: [{
                            address: "40.7590615,-73.969231",
                            position: 'center',
                            options: {
                                content: '',
                            }
                        }, ],
                        events: {
                            mouseover: function(overlay, event, context) {
                                var target = overlay.getDOMElement();

                                target.style.zIndex = 2;

                                var info = $(target).find('.gmap-info-wrapper');
                                info.find('.gmap-info-template').show();
                            },
                            mouseout: function(overlay) {
                                var target = overlay.getDOMElement();

                                target.style.zIndex = 1;

                                var info = $(target).find('.gmap-info-wrapper');
                                info.find('.gmap-info-template').hide();
                            }
                        }
                    },


                });






            };

            google.maps.event.addDomListener(window, 'load', initialize);
        }
    });