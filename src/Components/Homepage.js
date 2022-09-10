import "../Style/Homepage.scss"
import {Link} from "react-router-dom";

function Homepage(){
    return(
        <div className="homescreen">
            <h1>MORTALTALE</h1>
            <Link to={"/normalmode"}><button >Normal mode</button></Link>
            <Link to={"/endlessmode"}><button>Endless mode<p>(in construction)</p></button></Link>
        </div>

    )
}
export default Homepage