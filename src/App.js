import React from "react";
import logo from './logo.svg';
import './App.css';
import API from './api.js';
// import {
//   Stack,
//   Button
// } from '@mui/material'

import {
  Box,
  TextField,
  Stack,
  Button,
  Alert,
  MobileStepper
} from '@mui/material'

import {
  Drawer,
  Mandala,
  Stepper,
  // Snackbar,
  Table
} from "./components";

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';



// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "success",
      pedals: 25,
      layers: 25,
      tempSave: [],
      mandalaIndex: 0,
      mandalaComponentsList: [],
      activeStep: 0,
      currentMandala: null
    }
    this.myRef = React.createRef();
  }


  componentDidMount = () => {
    this.generateMandala();
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  randInt = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getTanFromDegrees = (degrees) => {
    return Math.tan(degrees * Math.PI / 180);
  }

  getConfig = (j) => {
    let ang = 360 / this.state.pedals;
    let ly = j / this.state.layers;
    let x1 = Math.floor(this.randInt(185 * ly, 205 * ly));
    let x2 = Math.floor(this.randInt(190 * ly, 215 * ly));
    let x3 = Math.floor(this.randInt(210 * ly, 230 * ly));
    let x4 = Math.floor(this.randInt(230 * ly, 245 * ly));

    let maxX2 = x2 * this.getTanFromDegrees(ang) * 0.9;
    let y2 = Math.floor(this.randInt(15 * ly, maxX2 * ly));
    let y3 = Math.floor(this.randInt(15 * ly, maxX2));

    return [x1, x2, x3, x4, y2, y3]
  }

  generateMandala = () => {
    let currentMandala = {
      layers: this.state.layers,
      pedals: this.state.pedals, 
      list: [],
    }

    // for (let j = 0; j <= this.state.layers; j++) {
    //   const config = this.getConfig(j);
    //   currentMandala.list.push(config);
    // }
    for (let j = this.state.layers; j >= 0; j--) {
      const config = this.getConfig(j);
      currentMandala.list.push(config);
    }


    const mandalaComponentsList = [...this.state.mandalaComponentsList, currentMandala];
    this.setState({
      activeStep: mandalaComponentsList.length - 1,
      currentMandala,
      mandalaComponentsList
    })

    console.log("currentMandala", currentMandala)
    console.log("mandalaList", this.state.mandalaComponentsList)
  }


  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  }


  render() {

    const {
      layers,
      pedals,
      mandalaIndex,
      mandalaComponentsList,
      activeStep,
      currentMandala
    } = this.state;

    const maxSteps = mandalaComponentsList.length;



    return (
      <div className="App">
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            background: "#ddd",
            borderBottom: "2px solid #bbb"
          }}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
        <Box
          component="form"
          sx={{ padding: "10px 10px", paddingTop: "20px", }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={2} direction="row">
            <TextField
              id="pedals"
              label="Pedals"
              variant="outlined"
              fullWidth
              value={pedals}
              onChange={this.handleChange("pedals")}
            />
            <TextField
              id="layers"
              label="Layers"
              variant="outlined"
              fullWidth
              value={layers}
              onChange={this.handleChange("layers")}
            />
            <Button
              variant="contained"
              onClick={this.generateMandala}
              fullWidth
            >
              Generate
            </Button>
          </Stack>
        </Box>


        {/* {mandalaComponentsList[activeStep]} */}
        {
          currentMandala &&
          <Mandala
            key={activeStep}
            mandala={mandalaComponentsList[activeStep]}
          />
        }


        {/* <Stepper
          steps={mandalaComponentsList}
        /> */}

      </div>
    );
  }

}

export default App;
