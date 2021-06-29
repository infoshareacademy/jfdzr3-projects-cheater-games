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
    totalDmg: "",
    str: 0,
    agi: 0,
    tough: 0,
    vit: 0,
    perc: 0,
    int: 0,
    speed: 0,
  });

  let { itemName, itemValue, itemType, itemLower, itemUpper, totalDmg, itemDef } = item;

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
          value: itemValue,
          dmgLow: itemLower,
          dmgUpp: itemUpper,
          totDmg: totalDmg,
          def: itemDef,
          str: item.str,
          agi: item.agi,
          tough: item.tough,
          vit: item.vit,
          perc: item.perc,
          int: item.int,
          speed: item.speed,
        },
      });
  };

  return (
    <form onSubmit={addItem}>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Nazwa przedmiotu
          </InputLabel>
          <Input
            id="simple-select-outlined-label"
            value={itemName}
            name="itemName"
            onChange={handleChange}
          ></Input>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Typ przedmiotu
          </InputLabel>
          <Select
            labelId="simple-select-outlined-label"
            id="simple-select-outlined"
            value={itemType}
            onChange={handleChange}
            label="Typ przedmiotu"
            name="itemType"
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
      </div>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Wartość przedmiotu
          </InputLabel>
          <Input
            id="simple-select-outlined-label"
            onChange={handleChange}
            value={itemValue}
            name="itemValue"
          ></Input>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Obrażenia
          </InputLabel>
          <Input
            id="simple-select-outlined-label"
            onChange={handleChange}
            value={totalDmg}
            name="itemValue"
          ></Input>
        </FormControl>
        {itemType !== "handWeapon" && itemType !== "handWeaponPrefix" && itemType !== "handWeaponSuffix" ? (
      <>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Obrona
          </InputLabel>
          <Input
            id="simple-select-outlined-label"
            onChange={handleChange}
            value={itemDef}
            name="itemDef"
          ></Input>
        </FormControl>
      </>
        ) : (
          <>
          </>
        )}
      </div>
      {itemType !== "helmet" && itemType !== "armor" ? (
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Minimalne obrażenia
          </InputLabel>
          <Input
            id="simple-select-outlined-label"
            onChange={handleChange}
            value={itemLower}
            name="itemLower"
          ></Input>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="simple-select-outlined-label">
            Maksymalne obrażenia
          </InputLabel>
          <Input
            id="simple-select-outlined-label"
            onChange={handleChange}
            value={itemUpper}
            name="itemUpper"
          ></Input>
        </FormControl>
      </div>
        ) : (
          <>
          </>
        )}
      {stats.map((stat) => {
        return (
          <div key={stat}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="simple-select-outlined-label">
                {`${unitsMap[stat]?.label || stat.name}`}
              </InputLabel>
              <Input
                id="simple-select-outlined-label"
                onChange={handleChange}
                value={item.stat}
                name={`${stat}`}
              ></Input>
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
