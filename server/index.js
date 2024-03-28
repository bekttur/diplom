const express = require('express');
const algoliasearch = require('algoliasearch');
const multer = require('multer');
require('dotenv').config();

const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

require('./db/connection');
const Dialects = require('./models/Dialect');

const User = require('./models/User');
const { default: mongoose } = require('mongoose');
const JWT_SECRET = process.env.JWT_SECRET;

require('./models/ImageDetails');
const Images = mongoose.model('ImageDetails');

const generateTokenAndSetCookie = (userId, response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  response.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};

// function algolia
async function searchWithAlgolia(search) {
  try {
    const client = algoliasearch(
      process.env.APPLICATION_ID,
      process.env.API_KEY
    );
    const index = client.initIndex(process.env.INDEX_NAME);
    const found = await index.search(search);
    return found;
  } catch (error) {
    console.error(error);
  }
}

// SIGN UP
app.post('/api/auth/signup', async (request, response) => {
  try {
    const {
      fullname,
      email,
      password,
      confirmPassword,
      address,
      city,
      birthday,
      gender,
      phone,
    } = request.body;

    if (password !== confirmPassword) {
      return response.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return response.status(400).json({ error: 'email already exists' });
    }

    const newUser = new User({
      fullname,
      email,
      password,
      role: 'user',
      address,
      city,
      birthday,
      gender,
      phone,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, response);
      await newUser.save();

      response.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        address: newUser.address,
        city: newUser.city,
        birthday: newUser.birthday,
        gender: newUser.gender,
        phone: newUser.phone,
      });
    } else {
      response.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error', error.message);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// LOGIN
app.post('/api/auth/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user || password !== user.password) {
      return response.status(400).json({ error: 'Invalid email or password' });
    }

    response.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      address: user.address,
      city: user.city,
      birthday: user.birthday,
      gender: user.gender,
      phone: user.phone,
    });
  } catch (error) {
    console.log('Error', error.message);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// LOGOUT
app.post('/api/auth/logout', (request, response) => {
  try {
    response.cookie('jwt', '', { maxAge: 0 });
    response.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error', error.message);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// EDIT USER DATA
app.put('/update/user', async (request, response) => {
  const { data } = request.body;

  try {
    await User.updateOne(
      { _id: data._id },
      {
        $set: {
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          birthday: data.birthday,
          gender: data.gender,
          address: data.address,
          city: data.city,
        },
      }
    );
    return response.json({ status: 'ok', data: 'updated' });
  } catch (error) {
    return response.json({ status: 'error', data: error });
  }
});




///upload avatar user
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images');
  },
  filename: function (req, file, cb) {
    const userEmail = req.body.email;
    const uniqueSuffix = Date.now();
    const filename = `${userEmail}-${uniqueSuffix}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

app.post('/upload-image', upload.single('image'), async (request, response) => {
  const imageName = request.file.filename;

  try {
    await Images.create({ image: imageName, userEmail: request.body.email });
    response.json({ status: 'ok' });
  } catch (error) {
    response.json({ status: error });
  }
});

app.put('/update-image', upload.single('image'), async (request, response) => {
  try {
    const userEmail = request.body.email;
    const imageName = request.file.filename;

    await Images.updateOne(
      { userEmail: userEmail },
      {
        $set: {
          image: imageName,
        },
      }
    );

    return response.json({ status: 'ok' });
  } catch (error) {
    console.error('Error updating image:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-image', async (request, response) => {
  try {
    Images.find({}).then((data) => {
      response.send({ status: 'ok', data: data });
    });
  } catch (error) {
    response.json({ status: error });
  }
});

////////////////////////////////////////////////////////////////////////////////

// ADD DIALECT
app.post('/add', async (request, response) => {
  let dialect = new Dialects(request.body);
  let result = await dialect.save();
  response.send(result);
});

// ALL DIALECT DATA GET
app.get('/data', async (request, response) => {
  try {
    const data = await Dialects.find();
    response.json(data);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// ALL USER DATA GET
app.get('/users', async (request, response) => {
  try {
    const data = await User.find();
    response.json(data);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//edit role
app.put('/update/userRole', async (request, response) => {
  console.log(request.body);
  const { _id, role } = request.body;

  const data = await User.updateOne({ _id: _id }, { role: role });
  response.send({
    success: true,
    message: 'data updated succesfully',
    data: data,
  });
});

// edit dialect
app.put('/update/dialect', async (request, response) => {
  const { dialectData } = request.body;

  try {
    await Dialects.updateOne(
      { _id: dialectData._id },
      {
        $set: {
          title: dialectData.title,
          kzMeaning: dialectData.kzMeaning,
          enMeaning: dialectData.enMeaning,
          ruMeaning: dialectData.ruMeaning,
          kzRegion: dialectData.kzRegion,
          enRegion: dialectData.enRegion,
          ruRegion: dialectData.ruRegion,
          zone: dialectData.zone,
        },
      }
    );
    return response.json({ status: 'ok', data: 'updated' });
  } catch (error) {
    return response.json({ status: 'error', data: error });
  }
});

//delete dialect
app.delete('/delete/dialect/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await Dialects.deleteOne({ _id: id });
    response.send({ status: 'Ok', data: 'deleted' });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send({ status: 'Error', message: 'Failed to delete dialect' });
  }
});

// forgot password
app.post('/forgot-password', async (request, response) => {
  const { email } = request.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return response.send({ status: 'User not exists' });
    }

    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '5m',
    });

    const link = `http://localhost:4000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'askarov0306@gmail.com',
        pass: 'gzkjfblfvqwamdqq',
      },
    });

    var mailOptions = {
      from: 'youremail@gmail.com',
      to: oldUser.email,
      subject: 'Password Reset',
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get('/reset-password/:id/:token', async (request, response) => {
  const { id, token } = request.params;
  console.log(request.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return response.send({ status: 'User not exists' });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    response.render('index', { email: verify.email, status: 'Not Verified' });
  } catch (error) {
    console.log(error);
    response.send('Not verified');
  }
});

app.post('/reset-password/:id/:token', async (request, response) => {
  const { id, token } = request.params;
  const { password } = request.body;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return response.send({ status: 'User not exists' });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await password;
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    // Only rendering the view after updating the password
    response.render('index', { email: verify.email, status: 'verified' });
  } catch (error) {
    console.log(error);
    response.send({ status: 'Something went wrong' });
  }
});

// algolia
// app.get('/search', async (request, response) => {
//   const query = request.query.search;
//   const find = await searchWithAlgolia(query);
//   response.send(find.hits);
// });

app.listen(4000);
