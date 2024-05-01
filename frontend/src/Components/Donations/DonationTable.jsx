import { Button } from "../Register/Register";
import { DONATION_STATUSES } from "./defaults";

const DonationTable = ({ title, donations, updateDonationStatus }) => {
  // poboljsaj izgled ovoga
  return (
    <div>
      <h2>{title}</h2>
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
              {title === "Traži se" && (
                <td>
                  <Button
                    onClick={() => {
                      updateDonationStatus(
                        donation._id,
                        DONATION_STATUSES.DONATED
                      );
                    }}
                  >
                    Doniraj
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;
