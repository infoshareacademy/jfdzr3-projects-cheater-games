import { GenerateItem } from "./items/GenerateItem";
import { useUserItems } from "../hooks/useUserItems";
import { ShowItem } from "./items/ShowItem";

export const CharacterViewPage = () => {
  const userItemCollection = useUserItems();

  const result = [];

  if (userItemCollection === undefined) {
    return;
  } else {
    const map = new Map();
    for (const item of userItemCollection) {
      if (!map.has(item.id)) {
        map.set(item.id, true);
        result.push(item.id);
      }
    }
  }

  return (
    <>
      <h1>Widok postaci</h1>
      <GenerateItem />
      <div>
        {result.map((itemID) => {
          return <ShowItem itemID={itemID} key={itemID} />;
        })}
      </div>
    </>
  );
};
