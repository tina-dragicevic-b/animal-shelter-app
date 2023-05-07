import {Button} from 'primereact/button'
import { useEffect, useState } from 'react';
import { getDonations } from "../utils/api";
import DonationsTable from './DonationsTable';

const Donations = () => {
    const [isDonationForm, setIsDonationForm] = useState(false);
    const [needed, setNeeded] = useState([])
    const [offered, setOffered] = useState([])
    const [donated, setDonated] = useState([])

    useEffect(() => {
        getDonations().then((response) => {
            var len = response.data.length;
            var n =  []; var o =  []; var d =  [];

            for(var i = 0; i < len; i++){
                response.data[i].donated
                  ? d.push(response.data[i])
                  : response.data[i].userDonation
                  ? o.push(response.data[i])
                  : n.push(response.data[i]);
            }
            setNeeded(() => [...n]);
            setOffered(() => [...o]);
            setDonated(() => [...d]);
        })
    }, [])

    const donate = (donation, group) => {
      console.log(donation, group)
      // donation.donated = true;
      // donation.userDonation = false;
      // const stateChange = group.map((d) => {
      //   if(d.id === donation.id) {
      //     return donation
      //   }
      //   return d;
      // });

    }

    return (
      <>
        <Button
          label="New donation"
          className="p-button p-component p-button-raised  p-button-success p-button-text"
          onClick={() => setIsDonationForm(!isDonationForm)}
        />
        <div style={{display: 'grid', justifyContent: "space-evenly",}}>
          <div style={{gridColumn: "1/2"}}>
            <DonationsTable title="Looking for" data={needed} executeDonation = {donate}/>
            <DonationsTable title="Offering" data={offered}/>
            <DonationsTable title="Donated" data={donated}/>
          </div>
          {isDonationForm && <div style={{ fontFamily: "cursive", color: "#0b213f", gridColumn: "2/3", border: "1px solid black" }}>dddd</div>}
        </div>
      </>
    );

}; export default Donations