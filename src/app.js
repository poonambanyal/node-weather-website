const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app =express()
// Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
res.render('index',{
    title:'weather App',
    name:'poonam kumari'
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page App',
        name:'poonam kumari'
    })
    })

    app.get('/help',(req,res)=>{
        res.render('help',{
            title:'Help page App',
            name:'poonam kumari'
        })
        })
app.get('',(req,res)=>{
res.send('<h1>Home Page</h1>')
})


   

        app.get('/weather',(req,res)=>{
           
            if(!req.query.address){
                return res.send({
                      error:'You must provide address'
                  })
              }

              const address=req.query.address;
              geocode(address,(error,{latitude,longitude,location}={})=>{
                if(error){
                    
                 return res.send({error})
                }
              
              
              forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    Forecast:forecastdata,
                    location,
                    address        })
                //console.log(location)
                //console.log(forecastdata)
              })
              })




              
            })

            app.get('/products',(req,res)=>{
                console.log(req.query.search)

                if(!req.query.search){
                  return res.send({
                        error:'You must provide search term'
                    })
                }
                res.send({
                    products:[]
                })
                })
app.get('/help/*',(req,res)=>{
    res.render('help404Error',{
        title:'Error Page',
        name:'poonam kumari',
        errorText:'Help article not found'
    })
})
            app.get('*',(req,res)=>{
                res.render('404ErrorPage',{
                    title:'Error Page',
                    name:'poonam kumari',
                    errorText:'404 Error Page'
                })
            })
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})