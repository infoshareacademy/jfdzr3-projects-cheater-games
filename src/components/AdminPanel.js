import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import firebaseApp from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { TextField } from "@material-ui/core/";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    inputLabel: {
        margin: theme.spacing(30),
    }
   
  }));

export const AdminPanel = (props) => {

  const classes = useStyles();

  const [itemType, setItemType] = useState("");

  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  const user = useUser();

  const {itemName} = 0;

  const addItem = () => {
    console.log("item");
  };

  console.log(user);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="simple-select-outlined-label">Typ przedmiotu</InputLabel>
        <Select
          labelId="simple-select-outlined-label"
          id="simple-select-outlined"
          value={itemType}
          onChange={handleChange}
          label="Typ przedmiotu"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"handWeapon"}>handWeapon</MenuItem>
          <MenuItem value={"handWeaponPrefix"}>handWeaponPrefix</MenuItem>
          <MenuItem value={"handWeaponSuffix"}>handWeaponSuffix</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="simple-select-outlined-label">Nazwa przedmiotu</InputLabel>
      <Input id="simple-select-outlined-label" value={itemName}></Input>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="simple-select-outlined-label">Wartość przedmiotu</InputLabel>
      <Input id="simple-select-outlined-label" value={itemName}></Input>
      </FormControl>
    </div>
  );
};
