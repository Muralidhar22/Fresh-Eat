import { ReactComponent as PageNotFoundSVG } from "../assets/404.svg";

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const PageNotFound = () => {
    return (
        <div style={style}>
            <PageNotFoundSVG />
        </div>
    )
}

export default PageNotFound;