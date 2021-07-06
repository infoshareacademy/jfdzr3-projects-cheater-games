export const TextBlock = ({children}) => {
    const style = {
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "10px"
    }
    return <p style={style}>{children}</p>
}