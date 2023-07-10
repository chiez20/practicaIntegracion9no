require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


const Cancha = require('./models/cancha.models');


app.use(express.json());
app.use(cors());

const Conexion = async()=> { 
    try {
        mongoose.connect(process.env.MONGO);
        console.log('CONNECTED TO MONGODB!!');

    } catch (error) {
        console.log(error)
        throw new Error('FAILED TO CONNECT TO MONGODB')
    }
  }

Conexion();


app.get('/canchas', async (req, res) => {
    console.log('TRYING TO FETCH Canchas');
    try {
      const Canchas = await Cancha.find();
      res.status(200).json({
        canchas: Canchas.map((Cancha) => ({
          id: Cancha.id,
          descripcion: Cancha.descripcion,
        })),
      });
      console.log('FETCHED Canchas');
    } catch (err) {
      console.error('ERROR FETCHING Canchas');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to load Canchas.' });
    }
});

app.post('/canchas', async (req, res) => {
  console.log('TRYING TO STORE cancha');
  const canchaDescripcion = req.body.descripcion;

  if (!canchaDescripcion || canchaDescripcion.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid cancha text.' });
  }

  const cancha = new Cancha({
    descripcion: canchaDescripcion,
  });

  try {
    await cancha.save();
    res
      .status(201)
      .json({ message: 'cancha saved', cancha: { id: cancha.id, descripcion: cancha.descripcion } });
    console.log('STORED NEW cancha');
  } catch (err) {
    console.error('ERROR FETCHING canchaS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save descripcion.' });
  }
});

app.delete('/canchas/:id', async (req, res) => {
  console.log('TRYING TO DELETE GOAL');
  try {
    await Cancha.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted cancha!' });
    console.log('DELETED cancha');
  } catch (err) {
    console.error('ERROR FETCHING canchaS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete cancha.' });
  }
});

app.put('/canchas/:id', async (req, res) => {
  console.log('TRYING TO UPDATE cancha');
  try {
   const {id} = req.params;
   const {...data } =  req.body;
   console.log(id,data)
   await Cancha.findByIdAndUpdate(id,data )
  console.log('UPDATE cancha');
  res.status(200).json({ message: 'Actualizo' });
  } catch (err) {
    console.error('ERROR FETCHING cancha');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to update cancha.' });
  }
});

// app.post('/goals', async (req, res) => {
//     console.log('TRYING TO STORE GOAL');
//     const goalText = req.body.text;

//     if (!goalText || goalText.trim().length === 0) {
//       console.log('INVALID INPUT - NO TEXT');
//       return res.status(422).json({ message: 'Invalid goal text.' });
//     }

//     const goal = new Goal({
//       text: goalText,
//     });

//     try {
//       await goal.save();
//       res
//         .status(201)
//         .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } });
//       console.log('STORED NEW GOAL');
//     } catch (err) {
//       console.error('ERROR FETCHING GOALS');
//       console.error(err.message);
//       res.status(500).json({ message: 'Failed to save goal.' });
//     }
//   });



app.listen(process.env.PORT,()=>{
   console.log('SERVIDOR INICIADO')
  });