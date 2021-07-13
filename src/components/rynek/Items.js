import styled from 'styled-components'
import Chip from '@material-ui/core/Chip';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

const ItemStyle = styled.div`
height: max-content;
border: 1px solid lightgray;
// white-space: nowrap;
padding: 0 5px;
min-width: 60px;
min-height: 110px;
max-height: fit-content;
`
export const Items = ({ items }) => {
//   function IconChips() {
//     return (
//         <Chip icon={ <ShoppingCartRoundedIcon />} label={item.val.value} variant="outlined" />
//     );
//   }
  console.log(items);

  if (items.length === 0) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        {items &&
          items.map((item, index) => (
            <ItemStyle key={index}>
              <h5>{item.key}</h5>
              <h6 style={{marginTop: "5px"}}>gold: {item.val.value}</h6>
               <Chip label={item.val.value} icon={ <ShoppingCartRoundedIcon />}variant="outlined" size="small" style={{marginTop: "10px"}} />
              </ItemStyle>
          ))}
      </>
    );
  }
};
