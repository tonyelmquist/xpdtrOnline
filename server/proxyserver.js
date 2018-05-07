var proxy = require('express-http-proxy');
var app = require('express')();
 
app.use('/proxy', proxy('a810-efiling.nyc.gov'));

app.listen(process.env.PORT || 3000);  