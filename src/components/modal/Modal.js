import { easy1 } from "./monsters/easy1.jpg";
import { easy2 } from "./monsters/easy2.jpg";
import { easy3 } from "./monsters/easy3.jpg";
import { medium1 } from "./monsters/medium1.jpg";
import { medium2 } from "./monsters/medium2.jpg";
import { medium3 } from "./monsters/medium3.jpg";
import { hard2 } from "./monsters/hard1.jpg";
import { hard3 } from "./monsters/hard2.jpg";
import { hard1 } from "./monsters/hard3.jpg";

const easyMonsters = [easy1, easy2, easy3];
const mediumMonsters = [medium1, medium2, medium3];
const hardMonsters = [hard1, hard2, hard3];

export const Modal = ({ onClose, difficulty }) => {
  return (
    <div className="modal">
      <div className="modal__content"></div>
    </div>
  );
};
