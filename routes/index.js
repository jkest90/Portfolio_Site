/* Define the Routes - Only one route to send the index.html file to client. Since we are only serving one page,
  and not accessing data from a factory or a database, we do not need route controller/handelers.  */

//-- when we get a 'get' request to slash, send the index.html file from the public folder --\\

module.exports = (app) => {
    app.get('/', function(req, res) {
        res.sendFile('index.html', {root : './public'})
    });
}
