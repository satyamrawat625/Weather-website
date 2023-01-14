const { response } = require("express")
const express= require("express")
const https= require("https")
const bodyParser= require("body-parser")
const app= express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res) {
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function (req,res) {
    const queryCity= req.body.cityName
    const apiKey="92d41bf4ca65d59d538996ed2e007ccb"
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q=" +queryCity+ "&appid=" +apiKey+ "&units="+units //kashipur
    // const url="https://api.openweathermap.org/data/2.5/weather?q=clement%20town&appid=92d41bf4ca65d59d538996ed2e007ccb&units=metric"//clement town
        
    https.get(url,function (response) {
        console.log(response.statusCode)//to see status code
        
        response.on("data",function(data) {
            const weatherData =JSON.parse(data) 
            const temp= weatherData.main.temp
            const weatherDescript= weatherData.weather[0].description
            const icon= weatherData.weather[0].icon
            const imgeurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently "+weatherDescript+"</p>")
            res.write("<h1>The temp in "+queryCity+" is "+temp+" deg Celsius</h1>")
            res.write("<img src="+imgeurl+ ">")
            res.send()
        })
    })
})

app.listen(3000,function (){
    console.log("Server is running  on port 3000")
})