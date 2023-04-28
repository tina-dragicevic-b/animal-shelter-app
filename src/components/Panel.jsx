import { useState } from "react";
import { Sidebar } from 'primereact/sidebar';
import { InputSwitch } from 'primereact/inputswitch';
 
const Panel = () => {

    // const [openMenu, setOpenMenu] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    return (
      <div className="panelBackground">
         <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-full md:w-20rem lg:w-30rem">
                <h2 style={{fontSize: "20px", fontFamily: "fantasy", marginBottom: "20px"}}>We love animals!</h2>
                <ul className="panelList">
                    <li>About us</li>
                    <li>List of animals</li>
                    <li>Donations</li>
                    <li>News</li>
                    <li>Create new</li>
                </ul>
            </Sidebar>
        {/* SLIKA */}
        <div>
            <div className="grid-container" style={{display: "grid", justifyContent: "space-between", padding: "15px"}}>
              <div onClick={() => setVisible(true)} style={{width: "30px", gridColumn: "1/2"}}>
                  <hr style={{bodrer: "none", color: "#fff", backgroundColor: "#fff", height: "3px"}}></hr>
                  <hr style={{bodrer: "none", color: "#fff", backgroundColor: "#fff", height: "3px", marginTop: "5px"}}></hr>
                  <hr style={{bodrer: "none", color: "#fff", backgroundColor: "#fff", height: "3px", marginTop: "5px"}}></hr>
              </div>
              <div style={{display: "grid", justifyContent: "space-between", gridColumn: "2/3"}}>
                <span style={{gridColumn: "1/2", marginRight: "10px", fontFamily: "cursive", fontSize: "20px", color: "#fff"}}>{isAdmin ? "Admin" : "User"}</span>
                <InputSwitch style={{gridColumn: "2/3"}} checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)}/>
              </div>
            </div>
            <div style={{marginTop: "130px", marginLeft: "30px", textAlign: "left", color: "#fff"}}>
              <h1 style={{fontFamily: "fantasy", fontSize: "2rem"}}>ANIMAL SHELTER</h1>
              <h3 style={{fontFamily: "cursive", fontSize: "1.5rem"}}>Split, Croatia 🇭🇷  </h3>
            </div>
          {/* <img
            className="panelImage w-full h-96 "
            src={
              "https://c1.wallpaperflare.com/preview/592/936/918/animals-dogs-cat-play.jpg"
            }
          /> */}
        </div>
      </div>
    );
}; export default Panel