import { useItems } from "../../hooks/useItems";
import { useUser } from "../../hooks/useUser";

export const Items = (ref) => {
    const user = useUser();
    const items = useItems(ref);
    console.log(items);
    

  

    return (
        <>
        {items && items.map((item, index) => (

         <div key={index}>
                <h5>{item.key}</h5>
                <h6>gold: {item.val.value}</h6>
            </div>
        ))}
        
        </>
    )
}