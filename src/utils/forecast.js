const request=require('request')

const forecast=(latitude,longitude ,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=cbb7073c40c2455a96c34f4d2e38f750&query='+latitude+','+longitude

    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('unable to connct to weather services',undefined)
        }
        else if(body.error){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,'It is currently ' +body.current.temperature +' degrees out.It feels like '+body.current.feelslike+' degrees out')
        
        }
        })

}

module.exports=forecast