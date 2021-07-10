import { useItems } from "../../hooks/useItems";
import { useUser } from "../../hooks/useUser";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Item } from "./Item";
import { db } from "../../firebaseConfig";

export const Items = () => {
 

  const ref = db.collection('items')
  const user = useUser();
  console.log(user?.uid);
  // const ref = db.collection('users').doc(user?.uid).collection('armory')
 
  const items = useItems({ref}); 
  console.log(items);


  return (
    <Container>
      <Grid container style={{marginTop: "30px", marginBottom: '30px'}} >
        {items &&
          items.map((item, index) => (
            <Grid item key={index} xs={12} md={6} lg={3} style={{marginTop: "10px", textAlign: "left", border: "1px solid lightgray"}} >
             <Item item={item} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );

};
