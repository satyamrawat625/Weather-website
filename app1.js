const { response } = require("express")
const express= require("express")
const https= require("https")
const app= express()

app.get("/",function(req,res) {
    //this is static and will only  show weather for clement town
    const url="https://api.openweathermap.org/data/2.5/weather?q=clement%20town,uttarakhand&appid=92d41bf4ca65d59d538996ed2e007ccb&units=metric"//clement town
    // const url="https://api.openweathermap.org/data/2.5/weather?q=kashipur&appid=92d41bf4ca65d59d538996ed2e007ccb&units=metric"//kashipur
    
    https.get(url,function (response) {
        // console.log(response)
        console.log(response.statusCode)//to see status code

        response.on("data",function(data) {
            const weatherData =JSON.parse(data) 
            const temp= weatherData.main.temp
            const weatherDescript= weatherData.weather[0].description
            const icon= weatherData.weather[0].icon
            const imgeurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently "+weatherDescript+"</p>")
            res.write("<h1>The temp in london is "+temp+" deg Celsius</h1>")
            res.write("<img src="+imgeurl+ ">")
            res.send()
        })
    })
})
app.listen(3000,function (){
    console.log("Server is running  on port 3000")
})
