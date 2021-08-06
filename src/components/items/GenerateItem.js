import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import firebase from "firebase/app";
import { useUser } from "../../hooks/useUser";
import { ShowItem } from "./ShowItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export const GenerateItem = () => {
  const user = useUser();
  const history = useHistory();

  const itemType = "handWeapon";

  const [itemName, setItemName] = useState([]);
  const [itemPrefix, setItemPrefix] = useState([]);
  const [itemSuffix, setItemSuffix] = useState([]);
  const [itemQuality, setItemQuality] = useState(0);
  const [itemID, setItemID] = useState(0);
  const [userGold, setUserGold] = useState(0);

  useEffect(() => {
    setItemID(Date.now());
    return;
  }, []);

  useEffect(() => {
    if (itemQuality === 0) {
      const random = Math.floor(Math.random() * 100);
      if (random < 55) {
        setItemQuality(1);
        return;
      }
      if (random >= 55 && random < 80) {
        setItemQuality(1.5);
        return;
      }
      if (random >= 80) {
        setItemQuality(2.5);
        return;
      }
    } else {
      return;
    }
  });

  useEffect(() => {
    return db
      .collection("items")
      .doc(itemType)
      .onSnapshot((itemList) => {
        if (!itemList) {
          return;
        }
        let itemsNamesArray = Object.keys(itemList?.data());
        let itemsValuesArray = [];
        itemsNamesArray.map((el, i) => {
          itemsValuesArray[i] = itemList.data()[itemsNamesArray[i]]?.value;
        });
        let itemsIconsArray = [];
        itemsNamesArray.map((el, i) => {
          itemsIconsArray[i] = itemList.data()[itemsNamesArray[i]]?.icon;
        });
        let itemsNamesAndValues = [];
        itemsNamesArray.map((names, i) => {
          return (itemsNamesAndValues[i] = {
            name: names,
            value: itemsValuesArray[i],
            icon: itemsIconsArray[i]
          });
        });
        const getFilteredValues = (itemArray) => {
          const random = Math.floor(Math.random() * 100);
          if (random < 75) {
            return itemArray?.value < 1000;
          }
          if (random < 85) {
            return itemArray?.value < 10000;
          }
          if (random < 95) {
            return itemArray?.value < 15000;
          }
          if (random <= 100) {
            return itemArray;
          }
        };
        const filteredItems = itemsNamesAndValues.filter(getFilteredValues);
        const randomItemFactor = Math.floor(
          Math.random() * (filteredItems.length - 1)
        );
        setItemName(filteredItems[randomItemFactor]);
        return;
      });
  }, [db]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random > 55) {
      setItemPrefix({ name: "", value: 0 });
      return;
    } else {
      return db
        .collection("items")
        .doc(`${itemType}Prefix`)
        .onSnapshot((itemList) => {
          if (!itemList) {
            return;
          }
          let itemsNamesArray = Object.keys(itemList?.data());
          let itemsValuesArray = [];
          itemsNamesArray.map((el, i) => {
            itemsValuesArray[i] = itemList.data()[itemsNamesArray[i]]?.value;
          });
          let itemsNamesAndValues = [];
          itemsNamesArray.map((names, i) => {
            return (itemsNamesAndValues[i] = {
              name: names,
              value: itemsValuesArray[i],
            });
          });
          const getFilteredValues = (itemArray) => {
            const random = Math.floor(Math.random() * 100);
            if (random < 75) {
              return itemArray?.value < 1000 && itemArray?.value > 0;
            }
            if (random < 85) {
              return itemArray?.value < 10000 && itemArray?.value > 0;
            }
            if (random < 95) {
              return itemArray?.value < 15000 && itemArray?.value > 0;
            }
            if (random <= 100) {
              return itemArray > 0;
            }
          };
          const filteredItems = itemsNamesAndValues.filter(getFilteredValues);
          const randomPrefixFactor = Math.floor(
            Math.random() * filteredItems.length
          );
          setItemPrefix(filteredItems[randomPrefixFactor]);
          return;
        });
    }
  }, [db]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    if (random > 65) {
      setItemSuffix({ name: "", value: 0 });
      return;
    }
    return db
      .collection("items")
      .doc(`${itemType}Suffix`)
      .onSnapshot((itemList) => {
        if (!itemList) {
          return;
        }
        let itemsNamesArray = Object.keys(itemList?.data());
        let itemsValuesArray = [];
        itemsNamesArray.map((el, i) => {
          itemsValuesArray[i] = itemList.data()[itemsNamesArray[i]]?.value;
        });
        let itemsNamesAndValues = [];
        itemsNamesArray.map((names, i) => {
          return (itemsNamesAndValues[i] = {
            name: names,
            value: itemsValuesArray[i],
          });
        });
        const getFilteredValues = (itemArray) => {
          const random = Math.floor(Math.random() * 100);
          if (random < 75) {
            return itemArray?.value < 1000 && itemArray?.value > 0;
          }
          if (random < 85) {
            return itemArray?.value < 10000 && itemArray?.value > 0;
          }
          if (random < 95) {
            return itemArray?.value < 15000 && itemArray?.value > 0;
          }
          if (random <= 100) {
            return itemArray > 0;
          }
        };
        const filteredItems = itemsNamesAndValues.filter(getFilteredValues);
        const randomSuffixFactor = Math.floor(
          Math.random() * (filteredItems.length - 1)
        );
        setItemSuffix(filteredItems[randomSuffixFactor]);
        return;
      });
  }, [db]);

  let fullItem = {
    name: itemName?.name,
    prefix: itemPrefix?.name,
    suffix: itemSuffix?.name,
    icon: itemName?.icon,
    type: itemType,
    quality: itemQuality,
  };

  let itemTotalValue =
    itemQuality * (itemName?.value + itemPrefix?.value + itemSuffix?.value);

  const qualityDisplay = () => {
    if (itemQuality === 1) {
      return "";
    } else if (itemQuality === 1.5) {
      return "Dobry";
    } else if (itemQuality === 2.5) {
      return "Doskonały";
    }
  };

  useEffect(() => {
    if (!user?.uid) {
      return;
    } else {
      return db
        .collection("users")
        .doc(user?.uid)
        .onSnapshot((resources) => {
          if (!resources) {
            return;
          } else {
            if (isNaN(itemTotalValue)) {
              return;
            }
            else {
            let gold = resources.data().resources?.gold;
            setUserGold(gold+itemTotalValue);
            }
          }
        });
    }
  }, [user, itemTotalValue]);

  let displayingQuality = qualityDisplay();

  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const addItem = (e) => {
    if (!user?.uid) {
      return;
    }
    if (
      itemName?.name === undefined ||
      itemSuffix?.name === undefined ||
      itemPrefix?.name === undefined
    ) {
      return;
    } else {
      db.collection("users")
        .doc(user?.uid)
        .collection("armory")
        .add({
          icon: itemName?.icon,
          name: itemName?.name,
          prefix: itemPrefix?.name,
          suffix: itemSuffix?.name,
          obtainedAt: firebase.firestore.FieldValue.serverTimestamp(),
          type: itemType,
          quality: itemQuality,
          value: itemTotalValue,
        })
        .then(() => {
          alert("Dodano przedmiot do zbrojowni");
          history.push("/hunt")
          // history.push("/hunt");
        });
    }
    return;
  };

  const sellItem = (e) => {
    if (!user?.uid) {
      return;
    }
    if (
      itemName?.name === undefined ||
      itemSuffix?.name === undefined ||
      itemPrefix?.name === undefined
    ) {
      return;
    } else {
      if (userGold !== undefined && itemTotalValue !== undefined) {
        db.collection("users")
          .doc(user?.uid)
          .update({
            "resources.gold": userGold,
          })
          .then(() => {
            e.preventDefault();
            alert("Sprzedano przedmiot");
            history.push("/hunt")
            // window.location = "/hunt";
          });
      } else {
        return;
      }
    }
  };

  return (
    <div>
      <span>
        Zdobyto przedmiot:{" "}
        <Typography
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {displayingQuality} {fullItem?.prefix} {fullItem?.name}{" "}
          {fullItem?.suffix}
        </Typography>
      </span>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          <ShowItem itemID={fullItem} />
        </Typography>
      </Popover>
      <div>
        <button className="btn btn-green btn-small" onClick={addItem}>
          Zachowaj przedmiot
        </button>{" "}
        <button className="btn btn-red btn-small" onClick={sellItem}>
          Sprzedaj przedmiot
        </button>
      </div>
    </div>
  );
};
