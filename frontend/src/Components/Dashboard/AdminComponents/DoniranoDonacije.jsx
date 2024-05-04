import { Button } from "../../Register/Register";
import { DONATION_STATUSES } from "../../Donations/defaults";

function DoniranoDonacije({ donations, updateDonationStatus, deleteDonation }) {
  return (
    <div>
      <h2>Donirano</h2>
      <table
        style={{
          padding: "12px",
          borderRadius: "6px",
          backgroundColor: "#eaf6ff",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr style={{ textAlign: "center" }} key={index}>
              <td>{donation.donationType}</td>
              <td>{donation.donationAmount}€</td>
              <td>{donation.donationDescription}</td>
              <td>
                <Button
                  onClick={() => {
                    updateDonationStatus(
                      donation._id,
                      DONATION_STATUSES.IN_NEED
                    );
                  }}
                >
                  Ponovi
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    deleteDonation(donation._id);
                  }}
                >
                  Izbriši
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoniranoDonacije;
