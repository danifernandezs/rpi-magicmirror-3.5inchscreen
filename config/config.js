/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
  address: "127.0.0.1", // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "0.0.0.0" to listen on any interface
  // Default, when address config is left out, is "localhost"
  port: 8080,
  ipWhitelist: ["127.0.0.1"], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  language: "es",
  timeFormat: 24,
  units: "metric",

  modules: [

// Clock Module

    {
      disabled: "true",
      module: "clock",
      position: "top_center",
      config: {
        clockBold: "true",
        showWeek: "true",
     // Madrid Latitude and Longitude (only for digital)
        showSunTimes: "true",
        lat:"40.416775",
        lon: "-3.703790",
     // analog, digital or both
        displayType: "digital",
     // Timezone
        timezone: "Europe/Madrid"
      }
    },

// Weather Modules

    {
      module: "currentweather",
      position: "top_center",
      config: {
        location: "Madrid",
        locationID: "3117735",
        appid: "8e8...a53"
      }
    },
    {
      module: "weatherforecast",
      position: "top_center",
      header: "",
      config: {
        location: "Madrid",
        locationID: "3117735",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: "8e8...a53"
      }
    },

// Page Indicator

    {
        module: 'MMM-page-indicator',
        position: 'bottom_bar',
        config: {
        }
    },

// Hide All

    {
      module: 'mm-hide-all',
      position: 'bottom_right',
    },

// News Feed

    {
      module: "newsfeed",
      position: "top_center",
      config: {
        maxNewsItems: "5",
        feeds: [

          {
            title: "El Pais",
            url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada"
          },
          {
            title: "El Mundo",
            url: "https://e00-elmundo.uecdn.es/elmundo/rss/espana.xml"
          },
          {
            title: "Xataka",
            url: "http://feeds.weblogssl.com/xataka2"
          },

        ],
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true
      }
    },

// Pages

    {
      module: 'MMM-pages',
      config: {
        animationTime: "500",
        rotationTime: "100",
        rotationDelay: "5000",
        modules:
          [
           [ "newsfeed" ],
           [ "clock" ],
           [ "currentweather" ],
           [ "clock" ],
           [ "weatherforecast" ],
           [ "clock" ]],
        fixed:
          [ "mm-hide-all" ],
        }
    }
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
