import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "dbms",
  password: "",
  port: 5432,
});

db.connect();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const jwtSecret = 'your_jwt_secret';

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, mobile_no: user.mobile_no, name: user.name }, jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1]; 
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post('/consumer_signup', async (req, res) => {
  const { mobile_no, name, mail, pincode, password } = req.body;
  console.log(mobile_no, name, mail, pincode, password);
  try {
    const hashedPassword = await hashPassword(password);
    const result = await db.query("INSERT INTO consumer(mobile_no, name, mail, pincode, password)VALUES($1, $2, $3, $4, $5) RETURNING *", [mobile_no, name, mail, pincode, hashedPassword]);
    res.status(201).json({ message: "User Created Successfully", user: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/consumer_signin', async (req, res) => {
  const { mobile_no, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM consumer WHERE mobile_no = $1", [mobile_no]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = result.rows[0];
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "Signin Successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
      const user = result.rows[0];
      const token = generateToken(user);
      res.status(200).json({ message: "Signin Successful",token});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/provider_id',verifyToken, async(req,res)=>{
  const userId = req.userId
  try{
    const result = await db.query("SELECT id FROM provider WHERE id = $1",[userId]);
    if(result.rows.length === 0){
      return res.status(404).json({error:"Provider ID not found"});
    }
    const providerId = result.rows[0].id;
    res.status(200).json({providerId});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error"})
  }
})

app.post('/provider_details', verifyToken, async (req, res) => {
  const { restoName, veg, foodName, peopleCount, providerId } = req.body;
  try {
    const result = await db.query("INSERT INTO foodDetails (resto_name, veg, food_name, people_count, provider_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [restoName, veg, foodName, peopleCount, providerId]);
    res.status(201).json({ message: "Data inserted successfully", data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/ConsumerRequest', verifyToken, (req, res) => {
  db.query("SELECT * FROM foodDetails", (err, result) => {
    if (err) {
      console.error("Error retrieving foodDetails", err.stack);
      return res.status(500).send({ error: "Error signing in" });
    }
    res.send(result.rows);
  });
});

app.post('/update_count', verifyToken,(req,res)=>{
  const {food_id, count} = req.body;
  db.query('UPDATE foodDetails SET people_count = people_count -$1 WHERE food_id = $2 RETURNING people_count',[count,food_id], (err,result)=>{
    if(err){
      console.error('Error updating people count', err.stack);
      return res.status(500).send({ error: 'Error updating people count' });
    }
    res.status(200).send(result.rows[0]);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
