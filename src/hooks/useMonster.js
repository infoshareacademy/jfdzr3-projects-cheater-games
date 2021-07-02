import { useState, useEffect } from "react";

export const useMonster = (user, difficulty) => {
    const [monster, setMonster] = useState({});

    useEffect(() => {
        const level = user?.level < 4 ? parseInt(Math.floor(Math.random()*(user?.level) + 1)*difficulty) : parseInt((Math.floor(Math.random()*((user?.level + 3) - (user?.level - 3) + 1) + (user?.level - 3)))*difficulty);
        const randomStat = () => {
            if (level < 4){
                return Math.floor(Math.random()*(level+5)+level)    
            }
            return Math.floor(Math.random()*((level-5)+(level+5))+(level+5))
        }
        setMonster({
            level: level,
            str: randomStat(),
            agi: randomStat(),
            tough: randomStat(),
            vit: randomStat(),
            perc: randomStat(),
            int: randomStat(),
            speed: randomStat(),
          })        
    }, [user, difficulty])
    return monster;
}