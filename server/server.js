import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';



const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "dbms",
  password: "Surya@260604",
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

// app.post('/provider_signup', async(req,res)=>{
//   // console.log('Hello');
//   const { name, address, mobile_no, mail, pincode, password} = req.body;
//   console.log(mobile_no, name, mail, pincode, password);
//   try{
//       const result = await db.query("INSERT INTO provider(name, address, mobile_no, mail, password, pincode) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",[name, address, mobile_no, mail, password, pincode]);
//       res.status(201).json({message:"User Created Successfully", user:result.rows[0]})
//   }
//   catch(err){
//       console.log(err);
//       res.status(500).json({error:"Internal Server Error"});
//   }
// });


app.post('/provider_signup', async(req, res) => {
  const { name, address, mobile_no, mail, pincode, password } = req.body;
  try {
    const result = await db.query("INSERT INTO provider(name, address, mobile_no, mail, pincode, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING id", [name, address, mobile_no, mail, pincode, password]);
    const providerId = result.rows[0].id;
    console.log("provid",providerId);
    res.status(201).json({ message: "User Created Successfully", providerId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
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


// app.post('/provider_details', async (req, res) => {
//   const { restoName, veg, nonVeg, foodName, peopleCount, name } = req.body;
//   try {
//     const providerQuery = await db.query("SELECT id FROM provider WHERE name = $1", [name]);
//     const providerId = providerQuery.rows[0].id;
  
//     const result = await db.query("INSERT INTO foodDetails(resto_name, veg, food_name, people_count, provider_id) VALUES($1, $2, $3, $4, $5) RETURNING *", [restoName, veg, nonVeg, foodName, peopleCount, providerId]);
//     res.status(201).json({ message: "Booking submitted successfully", data: result.rows[0] });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post('/provider_details', async (req, res) => {
  const { restoName, veg, foodName, peopleCount, providerId } = req.body;
  try {
    const result = await db.query("INSERT INTO foodDetails (resto_name, veg, food_name, people_count, provider_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [restoName, veg, foodName, peopleCount, providerId]);
    res.status(201).json({ message: "Data inserted successfully", data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/ConsumerRequest',(req,res)=>{
 
      db.query("SELECT * FROM foodDetails", (err, result) => {
    if (err) {
      console.error("Error retrieving foodDetails", err.stack);
      return res.status(500).send({ error: "Error signing in" });
    }
    console.log(result.rows[0]);
    // res.send("Completed");
    res.send(result.rows);
  })
}
);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
