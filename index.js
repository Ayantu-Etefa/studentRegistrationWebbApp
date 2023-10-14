var express=require("express");
var bodyParser=require("body-parser");
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.eqgvban.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const client = new MongoClient(uri);
   
var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', async function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const db = client.db('student_reg_db');
        const col = db.collection('student_reg_coll');

        // Insert the document into the specified collection        
        const studentData = await col.insertOne(data);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

	return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
