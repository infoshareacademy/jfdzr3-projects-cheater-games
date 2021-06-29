import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { db } from "../firebaseConfig";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    margin: theme.spacing(30),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export const AdminPanel = (props) => {
  const classes = useStyles();
  const user = useUser();

  const stats = ["str", "agi", "tough", "vit", "perc", "int", "speed"];

  const [item, setItem] = useState({
    itemName: "",
    itemValue: "",
    itemType: "",
    itemLower: "",
    itemUpper: "",
    totalDmg: 0,
    itemDef: 0,
    str: 0,
    agi: 0,
    tough: 0,
    vit: 0,
    perc: 0,
    int: 0,
    speed: 0,
  });

  let {
    itemName,
    itemValue,
    itemType,
    itemLower,
    itemUpper,
    totalDmg,
    itemDef,
  } = item;

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      error: "",
    });
    return item;
  };

  const unitsMap = {
    str: { label: "Siła" },
    agi: { label: "Zręczność" },
    tough: { label: "Wytrzymałość" },
    vit: { label: "Żywotność" },
    perc: { label: "Spostrzegawczość" },
    int: { label: "Inteligencja" },
    speed: { label: "Szybkość" },
    def: { label: "Obrona" },
    gold: { label: "Przyrost złoto", unit: "/h" },
    wood: { label: "Przyrost drewna", unit: "/h" },
    mat: { label: "Przyrost materiału", unit: "/h" },
  };

  const addItem = async (e) => {
    e.preventDefault();
    db.collection("items")
      .doc(itemType)
      .set({
        [itemName]: {
          value: parseInt(itemValue),
          dmgLow: parseInt(itemLower),
          dmgUpp: parseInt(itemUpper),
          totalDmg: parseInt(totalDmg),
          def: parseInt(itemDef),
          str: parseInt(item.str),
          agi: parseInt(item.agi),
          tough: parseInt(item.tough),
          vit: parseInt(item.vit),
          perc: parseInt(item.perc),
          int: parseInt(item.int),
          speed: parseInt(item.speed),
        },
      });
  };

  return (
    <form onSubmit={addItem} autoComplete="off">
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.root}>
          <InputLabel id="simple-select-label" labelId="simple-select-label">
            Typ przedmiotu
          </InputLabel>
          <Select
            id="simple-select-outlined"
            value={itemType}
            onChange={handleChange}
            label="Typ przedmiotu"
            name="itemType"
            required
          >
            <MenuItem value="" name="itemType">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"handWeapon"}>handWeapon</MenuItem>
            <MenuItem value={"handWeaponPrefix"}>handWeaponPrefix</MenuItem>
            <MenuItem value={"handWeaponSuffix"}>handWeaponSuffix</MenuItem>
            <MenuItem value={"armor"}>armor</MenuItem>
            <MenuItem value={"armorPrefix"}>armorPrefix</MenuItem>
            <MenuItem value={"armorSuffix"}>armorSuffix</MenuItem>
            <MenuItem value={"helmet"}>helmet</MenuItem>
            <MenuItem value={"helmetPrefix"}>helmetPrefix</MenuItem>
            <MenuItem value={"helmetSuffix"}>helmetSuffix</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.root}>
          <TextField
            label="Nazwa przedmiotu"
            id="outlined-margin-normal"
            className={classes.root}
            variant="outlined"
            value={itemName}
            name="itemName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.root}>
          <TextField
            label="Wartość przedmiotu"
            id="outlined-margin-normal"
            className={classes.root}
            variant="outlined"
            type="number"
            onChange={handleChange}
            value={itemValue}
            name="itemValue"
          />
        </FormControl>
      </div>
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.root}>
          <TextField
            label="Obrażenia"
            id="outlined-margin-normal"
            type="number"
            className={classes.root}
            onChange={handleChange}
            value={totalDmg}
            name="totalDmg"
          />
        </FormControl>
        {itemType !== "handWeapon" &&
        itemType !== "handWeaponPrefix" &&
        itemType !== "handWeaponSuffix" ? (
          <>
            <FormControl variant="outlined" className={classes.root}>
              {/* <InputLabel id="simple-select-outlined-label">Obrona</InputLabel> */}
              <TextField
                label="Obrona"
                id="outlined-margin-normal"
                className={classes.root}
                type="number"
                onChange={handleChange}
                value={itemDef}
                name="itemDef"
              />
            </FormControl>
          </>
        ) : (
          <></>
        )}
      </div>
      {itemType !== "helmet" && itemType !== "armor" ? (
        <div className={classes.root}>
          <FormControl variant="outlined" className={classes.root}>
            <TextField
              label="Minimalne obrażenia"
              id="outlined-margin-normal"
              className={classes.root}
              type="number"
              onChange={handleChange}
              value={itemLower}
              name="itemLower"
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.root}>
            <TextField
              label="Maksymalne obrażenia"
              id="outlined-margin-normal"
              className={classes.root}
              type="number"
              onChange={handleChange}
              value={itemUpper}
              name="itemUpper"
            />
          </FormControl>
        </div>
      ) : (
        <></>
      )}
      {stats.map((stat) => {
        return (
          <div key={stat}>
            <FormControl variant="outlined" className={classes.root}>
              <TextField
                label={`${unitsMap[stat]?.label || stat.name}`}
                id="outlined-margin-normal"
                className={classes.root}
                type="number"
                onChange={handleChange}
                value={item.stat}
                name={`${stat}`}
              />
            </FormControl>
          </div>
        );
      })}
      <FormControl variant="outlined" className={classes.formControl}>
        <Button type="submit" variant="contained" color="primary">
          Dodaj przedmiot
        </Button>
      </FormControl>
    </form>
  );
};
