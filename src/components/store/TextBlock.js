export const TextBlock = ({children}) => {
    const style = {
        fontSize: "24px",
        fontWeight: "bold"
    }
    return <p style={style}>{children}</p>
}