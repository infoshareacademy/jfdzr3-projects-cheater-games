export const TextBlock = ({ children }) => {
  const style = {
    fontSize: "20px",
    fontFamily: "Metamorphous",
    fontWeight: "bold",
    margin: "15px 0",
    textAlign: "center"
  };
  return <div style={style}>{children}</div>;
};
