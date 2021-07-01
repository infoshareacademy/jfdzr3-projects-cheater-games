import "firebase/firestore";

export const FightBar = (props) => {
  
  const handleClick = () => {
      const random = Math.floor(Math.random() * 100);
      if (random < 80) {
        console.log("Hit");
        props.updateMonsterHP(props.monsterHP-20)
      } else {
        console.log("Miss");
        props.updateUserHP(props.userHP-20);
      }
    };

  return <button onClick={handleClick}>Hit me!</button>;
};
