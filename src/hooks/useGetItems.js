import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

export const useGetItems = (user) => {
    const userItemName = db.collection("users").doc(user?.uid).collection("armory").get().then((item) => 
    item.data().name)
    const userItemPrefix = weźZKolekcjiArmory.Prefix
    const userItemSuffix = weźZKolekcjiArmory.Suffix
    const userItemQuality = weźZKolekcjiArmory.Quality i JEŚLI quality === 1, wyświetl "", jeśli quality === 1.5 wyświetl "Dobry", jeśli quality === 2.5 wyświetl "Doskonały"
}