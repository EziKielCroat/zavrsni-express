import { Button } from "../../Shared/shared";
import { DONATION_STATUSES } from "../../Donations/defaults";

function NudiSeDonacije({ donations, updateDonationStatus }) {
  return (
    <div>
      <h2>Nudi se</h2>
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
                      DONATION_STATUSES.DONATED
                    );
                  }}
                >
                  Prihvati
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NudiSeDonacije;
