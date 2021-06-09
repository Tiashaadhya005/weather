const fs= require('fs');
const http= require('http');
const requests=require('requests');
const replaceval = (tempe,origi)=>{
    let t=tempe.replace("{%temp%}",Math.ceil(origi.main.temp-273.15));
    t=t.replace("{%tempmin%}",Math.ceil(origi.main.temp_min-273.15));
    t=t.replace("{%tempmax%}",Math.ceil(origi.main.temp_max-273.15));
    t=t.replace("{%place%}",origi.name);
    t=t.replace("{%country%}",origi.sys.country);
    t=t.replace("{%tempstatus%}",origi.weather[0].main);
    t=t.replace("{%tempfeel%}",Math.ceil(origi.main.feels_like-273.15));
    //console.log(t);
    return t;
}
const homefile=fs.readFileSync("weather.html","utf-8");
//const ho=fs.writeFileSync("weather.html",err=>{})
console.log(homefile);
const server = http.createServer((req, res)=>{
    if(req.url == "/" )
        requests('http://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=6195a7e2dd6406c00312b56e281f5099')
            .on('data', function (chunk) {
                const objd1=JSON.parse(chunk);
                const arr1=[objd1];
                //console.log(arr1[0].main.temp);
                const realtimee=arr1.map(val => replaceval(homefile,val)).join("");
                res.write(realtimee);
                //console.log(realtimee);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                    res.end();
                });
    
});
server.listen(8000,"127.0.0.1");
