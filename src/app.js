const path = require('path')
const express = require('express')
const hbd = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Changed Commit

const app = express()

const fileTemplate = path.join(__dirname, '../templetes/views')

const partialPath = path.join(__dirname, '../templetes/partials')


const imagePath = path.join(__dirname, '../templetes/img')

app.set('view engine', 'hbs')
app.set('views', fileTemplate)
hbd.registerPartials(partialPath)
app.use(express.static(imagePath)); 


app.get('', (req, res)=>{

    res.render('index',{

        cont: 'Welcome to Yash Vishwakarma Website'

    })

})
app.get('/about',(req, res)=>{

    res.render('about',{
        name: 'Yash Vishwakarma'

    })

})

app.get('/weather', (req, res) => {

    res.render('weather')

})

app.get('/fetchweather', (req, res) =>{

    if(!req.query.address){
        res.send({
            error: 'Please provide address'
        })
    }else{

        //const address = encodeURIComponent(req.query.address)
        geocode(req.query.address, (error, data = '') =>{
            if(error){
                return res.send({error: error})
            }
            const infoLatLng = JSON.stringify(data)  
            const dataParsed = JSON.parse(infoLatLng)
           forecast(dataParsed.longitude, dataParsed.latitude, (error1, data1)=>{
             if(error){
               res.send({error: error1})
             }else{
                const data = JSON.stringify(data1)
                const parsedData = JSON.parse(data)
                res.send({
                    temperature : parsedData.Temperature,
                    location : parsedData.Location,
                    weather : parsedData.Weather
                })
             }
          })
        })
     }

})
app.get('/products', (req, res)=>{

    if(!req.query.search){

        return res.send({

            error : 'You must provide a search tearm'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res)=> {

    res.render('error',{
        
    })

})
app.listen(3000, () => {

    console.log('Server is Running.')
})