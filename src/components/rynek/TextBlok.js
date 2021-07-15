export const TextBlock = ({ children }) => {
  const style = {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  };
  return <span style={style}>{children}</span>;
};
