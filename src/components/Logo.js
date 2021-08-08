import s from "styled-components";

const Img = s.img`
  width: 80%;
  display: block;
  margin: 0 auto;
  padding-bottom: 20px;
`;

export const Logo = () => (
  <Img src={`${process.env.PUBLIC_URL}/logo-monster-hunt.png`} alt="" />
);
