import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";

export const useHitPoints = (user) => {
  const [hitPoints, setHitPoints] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    if (user?.uid === undefined) {
      const vitality = user?.vit;
      const toughness = user?.tough;
      const level = user?.level;
      setHitPoints(
        Math.floor(
          5.42 * (vitality * 7.27 + level * 6.89 + toughness * 4.43) + 100
        )
      )
    } else {
      db.collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const vitality = doc.data().stats.vit;
            const toughness = doc.data().stats.tough;
            const level = doc.data().level;
            setHitPoints(
              Math.floor(
                5.42 * (vitality * 7.27 + level * 6.89 + toughness * 4.43) + 100
              )
            );
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [user, db]);

  return hitPoints;
};
