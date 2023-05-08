import {Button} from 'primereact/button'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from 'react';


const DonationsTable = ({title, data, executeDonation, removeDonation}) => {
    const { user } = useContext(UserContext);
    const [donateLabel, setLabel] = useState("Donate")
    useEffect(() => {
      if(user === "Admin"){
        setLabel("Confirm donated")
      } else setLabel("Donate")
    }, [user]);

    const deleteDonation = (data) => (
      <Button
        label="Delete"
        className="p-button p-component p-button-raised  p-button-danger p-button-text"
        onClick={() => removeDonation(data, title)}
      />
    );

    const donate = (data) => (
        <Button
          label={donateLabel}
          className="p-button p-component p-button-raised  p-button-help p-button-text"
          onClick={() => executeDonation(data, title)}
        // onClick={() => donation(data)}

        />
      );
      const accept = (data) => (
        <Button
          label="Accept donation"
          className="p-button p-component p-button-raised  p-button-warning p-button-text"
          onClick={() => executeDonation(data, title)}

        />
      );
      const repeat = (data) => (
        <Button
          label="Repeat"
          className="p-button p-component p-button-raised  p-button-success p-button-text"
          onClick={() => executeDonation(data)}

        />
      );
  
    return (
      <div style={{ marginTop: "30px" }}>
        <p
          style={{
            fontFamily: "cursive",
            color: "#0b213f",
            marginBottom: "10px",
            fontSize: "1.2rem",
          }}
        >
          {title}:{" "}
        </p>
        <DataTable value={data} dataKey='id'>
        <Column field="type" header="Type"></Column>
        <Column field="value" header="Value"></Column>
        <Column field="description" header="Description"></Column>
        {user === "Admin" && title === "Looking for" && <Column body={donate}></Column>}
        {user === "Admin" && title === "Looking for" && <Column body={deleteDonation}></Column>}
        {user === "User" && title === "Looking for" && <Column body={donate}></Column>}
        {user === "Admin" && title === "Offering" && <Column body={accept}></Column>}
        {user === "Admin" && title === "Donated" && <Column body={repeat}></Column>}
        {user === "Admin" && title === "Donated" && <Column body={deleteDonation}></Column>}
      </DataTable>
      </div>
    );
}; export default DonationsTable