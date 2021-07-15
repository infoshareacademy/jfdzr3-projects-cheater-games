export const TextBlock = ({ children }) => {
  const style = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0",
  };
  return <span style={style}>{children}</span>;
};
