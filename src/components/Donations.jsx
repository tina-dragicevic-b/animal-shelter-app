import {Button} from 'primereact/button'
import { useEffect, useState } from 'react';
import { getDonations , updateDonation, createDonation, deleteDonation} from "../utils/api";
import DonationsTable from './DonationsTable';
import DonationForm from './DonationForm';

const Donations = () => {
  const [isDonationForm, setIsDonationForm] = useState(false);
  const [needed, setNeeded] = useState([]);
  const [offered, setOffered] = useState([]);
  const [donated, setDonated] = useState([]);

  useEffect(() => {
    getDonations().then((response) => {
      var len = response.data.length;
      var n = [];
      var o = [];
      var d = [];

      for (var i = 0; i < len; i++) {
        response.data[i].donated
          ? d.push(response.data[i])
          : response.data[i].userDonation
          ? o.push(response.data[i])
          : n.push(response.data[i]);
      }
      setNeeded(() => [...n]);
      setOffered(() => [...o]);
      setDonated(() => [...d]);
    });
  }, []);

  const donate = async (donation, group) => {
    donation.donated = true;
    donation.userDonation = false;
    await updateDonation(donation);

    group === "Looking for" ? updateArray(needed, setNeeded, donation) : updateArray(offered, setOffered, donation);
    setDonated((prev) => [...prev, donation]);

  };

  function updateArray (list, setter, donation) {
  const stateChange = list.filter((d) => {
        if (d.id !== donation.id) {
          return d;
        }
      });
      setter(stateChange);
  }

  const repeatDonation = async (donation) => {
    donation.donated = false;
    await updateDonation(donation);
    updateArray(donated, setDonated, donation);
    setNeeded((prev) => [...prev, donation])
  }

  const removeDonation = async (donation, group) => {
    await deleteDonation(donation.id);
    group === "Looking for" ? updateArray(needed, setNeeded, donation) : updateArray(donated, setDonated, donation);
  }

  const onCreateNew = (isAdmin, newDonation) => {
    createDonation(newDonation).then((response) => {
      isAdmin ? setNeeded((prev) => [...prev, response.data]) : setOffered((prev) => [...prev, response.data]);
    })
    setIsDonationForm(!isDonationForm)
  }

  return (
    <>
      <Button
        label="New donation"
        className="p-button p-component p-button-raised  p-button-success p-button-text"
        onClick={() => setIsDonationForm(!isDonationForm)}
      />
      <div style={{ display: "grid", justifyContent: "space-evenly" }}>
        <div style={{ gridColumn: "1/2" }}>
          <DonationsTable
            title="Looking for"
            data={needed}
            executeDonation={donate}
            removeDonation={removeDonation}
          />
          <DonationsTable
            title="Offering"
            data={offered}
            executeDonation={donate}
          />
          <DonationsTable
            title="Donated"
            data={donated}
            executeDonation={repeatDonation}
            removeDonation={removeDonation}
          />
        </div>
        {isDonationForm && (
          <div
            style={{
              fontFamily: "cursive",
              color: "#0b213f",
              gridColumn: "2/3",
            }}
          >
            <DonationForm onCreateNew={onCreateNew} />
          </div>
        )}
      </div>
    </>
  );
}; export default Donations