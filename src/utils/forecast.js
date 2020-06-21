const request = require('request')
const forecast = (lat, lang, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=51f2ce178a5fe7b36e82fd44c5564d6f&query="+lat+","+lang
    request({url : url, json: true}, (error, response)=>{

        if(error){
            callback('Unable to connect to weather services.', undefined)
        }else if(response.body.error){
            callback('Unable to Unable to get Weather Info', undefined)
        }else{
            callback(undefined, {
                Temperature : response.body.current.temperature+" Degree Celcius",
                Location : response.body.location.name +" "+response.body.location.region,
                Weather : response.body.current.weather_descriptions[0]

            })
        }
    })
}
module.exports = forecast