import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Sidebar } from 'primereact/sidebar';
import { InputSwitch } from 'primereact/inputswitch';
import { NavLink } from 'react-router-dom';
const Panel = () => {

    const [visible, setVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const onSetUser = () => {
      setIsAdmin(!isAdmin);
    }

    useEffect(() => {
      setUser(isAdmin ? "Admin" : "User")
    }, [isAdmin])
    
    return (
      <div className="panelBackground">
         <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-full md:w-20rem lg:w-30rem">
                <h2 style={{fontSize: "20px", fontFamily: "fantasy", marginBottom: "20px"}}>We love animals!</h2>
                <nav>
                <ul className="panelList">
                    <li><NavLink onClick={() => setVisible(false)} to="/">About us</NavLink></li>
                    <li><NavLink onClick={() => setVisible(false)} to="/animals">List of animals</NavLink></li>
                    <li><NavLink onClick={() => setVisible(false)} to="/donations">Donations</NavLink></li>
                    <li><NavLink onClick={() => setVisible(false)} to="/news">News</NavLink></li>
                    {isAdmin && <li><NavLink onClick={() => setVisible(false)} to="/newAnimal">Create new</NavLink></li>}
                </ul>
                </nav>
            </Sidebar>
        <div>
            <div className="grid-container" style={{display: "grid", justifyContent: "space-between", padding: "15px"}}>
              <div onClick={() => setVisible(true)} style={{width: "30px", gridColumn: "1/2"}}>
                  <hr style={{bodrer: "none", color: "#fff", backgroundColor: "#fff", height: "3px"}}></hr>
                  <hr style={{bodrer: "none", color: "#fff", backgroundColor: "#fff", height: "3px", marginTop: "5px"}}></hr>
                  <hr style={{bodrer: "none", color: "#fff", backgroundColor: "#fff", height: "3px", marginTop: "5px"}}></hr>
              </div>
              <div style={{display: "grid", justifyContent: "space-between", gridColumn: "2/3"}}>
                <span style={{gridColumn: "1/2", marginRight: "10px", fontFamily: "cursive", fontSize: "20px", color: "#fff"}}>{isAdmin ? "Admin" : "User"}</span>
                <InputSwitch style={{gridColumn: "2/3"}} checked={isAdmin} onChange={onSetUser}/>
              </div>
            </div>
            <div style={{marginTop: "130px", marginLeft: "30px", textAlign: "left", color: "#fff"}}>
              <h1 style={{fontFamily: "fantasy", fontSize: "2rem"}}>ANIMAL SHELTER</h1>
              <h3 style={{fontFamily: "cursive", fontSize: "1.5rem"}}>Split, Croatia 🇭🇷  </h3>
            </div>
        </div>
      </div>
    );
}; export default Panel