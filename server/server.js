import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';



const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "dbms",
  password: "AmPpg@123",
  port: 5432,
});

db.connect();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/consumer_signup', async(req,res)=>{
  const { mobile_no, name, mail, pincode, password} = req.body;
  console.log(mobile_no, name, mail, pincode, password);
  try{
      const result = await db.query("INSERT INTO consumer(mobile_no, name, mail, pincode, password)VALUES($1, $2, $3, $4, $5) RETURNING *",[mobile_no, name, mail, pincode, password]);
      res.status(201).json({message:"User Created Successfully", user:result.rows[0]})
  }
  catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"});
  }
});

app.post('/consumer_signin', async (req, res) => {
  const { mobile_no, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM consumer WHERE mobile_no = $1 AND password = $2", [mobile_no, password]);
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(200).json({ message: "Signin Successful", user: result.rows[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/provider_signup', async(req,res)=>{
  console.log('Hello');
  const { name, address, mobile_no, mail, pincode, password} = req.body;
  console.log(mobile_no, name, mail, pincode, password);
  try{
      const result = await db.query("INSERT INTO provider(name, address, mobile_no, mail, password, pincode) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",[name, address, mobile_no, mail, password, pincode]);
      res.status(201).json({message:"User Created Successfully", user:result.rows[0]})
  }
  catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"});
  }
});

app.post('/provider_signin', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM provider WHERE name = $1 AND mail = $2 AND password = $3", [name, email, password]);
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(200).json({ message: "Signin Successful", user: result.rows[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
