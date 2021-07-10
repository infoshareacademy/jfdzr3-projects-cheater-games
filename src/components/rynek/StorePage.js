import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useItems } from "../../hooks/useItems";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const StorePage = () => {
  // const docRef = {
  //   itemsRef: "db.collection('items')",
  //   userItemsRef: "db.collection('users').doc(user?.uid).collection(armory)",
  // };
  // const { itemsRef, userItemsRef } = docRef;
  // const items = useItems(itemsRef);
  // console.log(items);
  // const user = useUser(); 
  // const itemsRef = db.collection('items');
  // const userItemsRef = db.collection('users').doc(user?.uid).collection('armory');
  // const items = useItems(itemsRef);
  // const userItems = useItems(userItemsRef);



  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid item xs={12} md={12}>
        <h1>Mirek Handlarz</h1>
      </Grid>
    </Box>
    <Box sx={{ width: 1 }}>
    <Box display="grid" gridTemplateColumns="40% 20% 40%" gap={0}>
        <Box >
          {/* <ItemsGrid text="Sprzedaj" ref={userItems}/> */}
          <ItemsGrid text="Sprzedaj" />

        </Box>
        <Box >
          <Avatar />
        </Box>
        <Box>
          {/* <ItemsGrid text="Kup" ref={items} /> */}
          <ItemsGrid text="Kup" />

        </Box>
      </Box>
    </Box>
    </>

    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid item xs={12} md={12}>
    //     <h1>Mirek Handlarz</h1>
    //   </Grid>
    //   <Grid container spacing={0}>
    //     <Grid item>
    //       <ItemsGrid text="Sprzedaj" />
    //     </Grid>
    //     <Grid item xs={0} sm={0} lg={3}>
    //       <Avatar>xs={0} sm={0} lg={3} </Avatar>
    //     </Grid>
    //     <Grid item>
    //       <ItemsGrid text="Kup" />
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

{
  /* <Box sx={{ flexGrow: 1}}>
<Grid container spacing={1}>
  <Grid item xs={12} md={12}>
<h1>Mirek Handlarz</h1>
  </Grid>
<div className="store-wrapper">
  <ItemsGrid text="Sprzedaj" />
  <Avatar />
  <ItemsGrid text="Kup">
  <Items />

  </ItemsGrid>
</div>

</Grid>
</Box> */
}
