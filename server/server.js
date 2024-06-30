import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const jwtSecret = "your_jwt_secret";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      mobile_no: user.mobile_no,
      name: user.name,
      pincode: user.pincode,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    if (decoded.id) {
      req.userId = decoded.id;
    }
    if (decoded.mobile_no) {
      req.userMobileNo = decoded.mobile_no;
    }
    next();
  });
};

app.post("/consumer_signup", async (req, res) => {
  const { mobile_no, name, mail, pincode, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await db.query(
      "INSERT INTO consumer(mobile_no, name, mail, pincode, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [mobile_no, name, mail, pincode, hashedPassword]
    );
    res
      .status(201)
      .json({ message: "User Created Successfully", user: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/consumer_signin", async (req, res) => {
  const { mobile_no, password } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM consumer WHERE mobile_no = $1",
      [mobile_no]
    );
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

app.post("/provider_signup", async (req, res) => {
  const { name, address, mobile_no, mail, pincode, password } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO provider(name, address, mobile_no, mail, pincode, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      [name, address, mobile_no, mail, pincode, password]
    );
    const providerId = result.rows[0].id;
    console.log("provid", providerId);
    res.status(201).json({ message: "User Created Successfully", providerId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/provider_signin", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM provider WHERE name = $1 AND mail = $2 AND password = $3",
      [name, email, password]
    );
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const user = result.rows[0];
      const token = generateToken(user);
      res.status(200).json({ message: "Signin Successful", token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/provider_id", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const result = await db.query("SELECT id FROM provider WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Provider ID not found" });
    }
    const providerId = result.rows[0].id;
    res.status(200).json({ providerId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/provider_details", verifyToken, async (req, res) => {
  const { restoName, veg, foodName, peopleCount, providerId } = req.body;
  const expirationTime = new Date();
  expirationTime.setSeconds(expirationTime.getSeconds() + 200000);

  try {
    const result = await db.query(
      "INSERT INTO foodDetails (resto_name, veg, food_name, people_count, provider_id, expiration_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [restoName, veg, foodName, peopleCount, providerId, expirationTime]
    );
    res
      .status(201)
      .json({ message: "Data inserted successfully", data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/provider_history_curr', verifyToken, async (req, res) => {

  console.log("You are here");
  const providerId = req.userId;
  console.log("provider : "+ providerId);
  try {
    const result = await db.query("SELECT * FROM foodDetails WHERE provider_id = $1", [providerId]);
    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving food details", err.stack);
    res.status(500).json({ error: "Error retrieving food details" });
  }
});



app.get('/provider_history_prev', verifyToken, async (req, res) => {

  console.log("You are here");
  const providerId = req.userId;
  console.log("provider : "+ providerId);
  try {
    const result = await db.query("SELECT * FROM foodDetailsHistory WHERE provider_id = $1", [providerId]);
    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving food details", err.stack);
    res.status(500).json({ error: "Error retrieving food details" });
  }
});



app.get("/ConsumerRequest", verifyToken, async (req, res) => {
  const userMobileNo = req.userMobileNo;

  try {
    const consumerResult = await db.query(
      "SELECT pincode FROM consumer WHERE mobile_no = $1",
      [userMobileNo]
    );

    if (consumerResult.rows.length === 0) {
      return res.status(404).json({ error: "Consumer not found" });
    }

    const consumerPincode = consumerResult.rows[0].pincode;

    const foodDetailsQuery = `
      SELECT fd.*
      FROM foodDetails fd
      JOIN provider p ON fd.provider_id = p.id
      WHERE p.pincode = $1
    `;

    const foodDetailsResult = await db.query(foodDetailsQuery, [
      consumerPincode,
    ]);

    res.json(foodDetailsResult.rows);
  } catch (err) {
    console.error("Error retrieving foodDetails", err.stack);
    res.status(500).json({ error: "Error retrieving foodDetails" });
  }
});

app.post("/update_count", verifyToken, async (req, res) => {
  const { food_id, count } = req.body;
  const userMobileNo = req.userMobileNo;
  try {
    await db.query("BEGIN");

    const updateResult = await db.query(
      "UPDATE foodDetails SET people_count = people_count - $1 WHERE food_id = $2 RETURNING people_count",
      [count, food_id]
    );

    if (updateResult.rows.length === 0) {
      await db.query("ROLLBACK");
      return res
        .status(404)
        .json({ error: "Food item not found or people count update failed" });
    }

    const newPeopleCount = updateResult.rows[0].people_count;

    const insertResult = await db.query(
      "INSERT INTO consumer_requests (consumer_mobile_no, food_id, booked_count) VALUES ($1, $2, $3) RETURNING *",
      [userMobileNo, food_id, count]
    );

    await db.query("COMMIT");

    res
      .status(200)
      .json({ newPeopleCount, bookedRequest: insertResult.rows[0] });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("Error booking request", err.stack);
    res.status(500).json({ error: "Error booking request" });
  }
});

app.get("/current_requests", verifyToken, async (req, res) => {
  const userMobileNo = req.userMobileNo;

  try {
    const result = await db.query(
      "SELECT cr.*, fd.resto_name, fd.food_name FROM consumer_requests cr JOIN foodDetails fd ON cr.food_id = fd.food_id WHERE cr.consumer_mobile_no = $1",
      [userMobileNo]
    );

    // console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving current requests", err.stack);
    res.status(500).json({ error: "Error retrieving current requests" });
  }
});

async function checkExpiredRequests() {
  try {
    const currentTime = new Date();
    const result = await db.query(
      "SELECT * FROM foodDetails WHERE expiration_time <= $1",
      [currentTime]
    );
    
    if (result.rows.length > 0) {
      const insertPromises = result.rows.map(async (row) => {
        const { food_id, resto_name, veg, food_name, people_count, provider_id, expiration_time } = row;
        try {
          // Insert into foodDetailsHistory
          await db.query(
            "INSERT INTO foodDetailsHistory (food_id, resto_name, veg, food_name, people_count, provider_id, expiration_time, request_time) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)",
            [food_id, resto_name, veg, food_name, people_count, provider_id, expiration_time]
          );

          // Delete from foodDetails
          await db.query(
            "DELETE FROM foodDetails WHERE food_id = $1",
            [food_id]
          );

          // console.log(`Moved expired request (food_id: ${food_id}) to history`);
        } catch (err) {
          // console.error(`Error moving expired request (food_id: ${food_id}) to history:`, err);
        }
      });

      await Promise.all(insertPromises);
      // console.log(`${result.rows.length} expired requests moved to history`);
    } else {
      // console.log('No expired requests found');
    }
  } catch (err) {
    console.error('Error checking/moving expired requests:', err);
  }
}

// Run the check every 10 seconds for testing (adjust as needed)
setInterval(checkExpiredRequests, 10 * 1000);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
