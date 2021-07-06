export const TextBlock = ({children}) => {
    const style = {
        fontSize: "20px",
        fontWeight: "bold"
    }
    return <p style={style}>{children}</p>
}