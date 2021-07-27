import "./store.css";
import { TextBlock } from "./TextBlock";
import styled from "styled-components";

export const ItemsGrid = ({ text, children }) => (
  <div className="items-wrapper">
    <TextBlock>{text}</TextBlock>
    {children}
  </div>
);
