import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

import FilterWindow from "./FilterWindow";
import { Filter } from "../Shared/icons";
import { Button } from "../Shared/shared";

const DisplayWrapper = styled.div`
  height: inherit;
  width: auto;
  background: #fff;
  padding: 30px;
  padding-left: 50px;
  padding-left: 50px;
`;

const HeaderWrapper = styled.div`
  background: #eaf6ff;
  width: auto;
  padding: 20px;
  border-radius: 6px;
`;

const FilterText = styled.span`
  display: flex;
  align-items: center;
  color: #3e2f4e;
  font-weight: 550;
  cursor: pointer;
  user-select: none;
  width: fit-content;

  svg {
    padding-right: 4px;
  }
`;

const GridWrapper = styled.div`
  width: auto;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  color: #3e2f4e;
  overflow-y: auto;
`;

const AnimalWrapper = styled.div`
  background: #bbd8cc;
  margin: 15px;
  padding: 20px;
  max-height: 600px;
  border-radius: 6px;

  img {
    border-radius: 4px;
  }
`;

const AnimalName = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0px;
`;

const Subtext = styled.span`
  color: #7e9899;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 18px;
`;

const notifySucess = (msg) => toast.success(msg);
const notify = (msg) => toast.error(msg);

function DisplayAnimals() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPosition, setFilterPosition] = useState({
    x: "",
    y: "",
  });
  const [animals, setAnimals] = useState([]);
  const [originalAnimals, setOriginalAnimals] = useState([]);

  const openFilter = (e) => {
    const { clientX, clientY } = e;

    const xPos = clientX + 10;
    const yPos = clientY + 30;

    setFilterPosition({ x: xPos, y: yPos });

    setFilterOpen(!filterOpen);
  };

  const getImage = (animalType) => {
    const images = {
      Pas: [
        "https://assets3.thrillist.com/v1/image/2846030/792x594/scale;webp=auto;jpeg_quality=60.jpg",
        "https://post.bark.co/wp-content/uploads/2013/04/astathebullmastiff.jpg",
        "https://toshala.srichinmoycentre.org/files/Members/toshala/puppy-small.jpg",
      ],
      Macka: [
        "https://i.pinimg.com/474x/a7/e8/89/a7e889effe08ecbede2ddaafbecdbd66.jpg",
        "https://i.redd.it/drawing-the-cat-as-random-cat-memes-day-57-original-in-v0-ww64vba9zb6a1.jpg?width=1280&format=pjpg&auto=webp&s=bb1ed22c02f1d6a514e1da3fc3a9b244f574db8d",
        "https://live.staticflickr.com/4023/4427404323_7e044d02dc_b.jpg",
      ],
      Ptica: [
        "https://hips.hearstapps.com/hmg-prod/images/fregata-magnificens1-1546622581.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a37d2382608217.5d23291b10337.jpg",
        "https://pics.craiyon.com/2023-08-04/45d38aa89f8b4caa962b27bd22a7cb60.webp",
      ],
      Gmizavac: [
        "https://i.redd.it/flgll4zwqq3c1.jpg",
        "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODRjYzljZmEtMTYwMC00NTFiLWE4M2QtNWI2ZjliOGU2YTQ3LndlYnA.webp",
        "https://preview.redd.it/i-have-never-seen-a-random-wild-lizard-in-my-life-who-is-v0-c2cwefobeumb1.png?auto=webp&s=ca973d84372597b581f72ff4fe7a690589066ab0",
      ],
      Ostalo: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfnGZNjQkW6ygUKDl_0B7uC8gnCVFtqiDKgQtWhb8Vw&s",
        "https://qph.cf2.quoracdn.net/main-qimg-9800d5a6683abc54b537a81da215c916.webp",
        "https://i.pinimg.com/564x/62/cc/50/62cc50616f8c78bcf46f35b054b1f053.jpg",
      ],
    };

    const animalImages = images[animalType];
    const randomIndex = Math.floor(Math.random() * animalImages.length);

    return animalImages[randomIndex];
  };

  const resetAnimals = () => {
    setAnimals(originalAnimals);
  };

  const updateAdoptionStatus = (animalId, newAdoptionStatus) => {
    axiosInstance
      .patch(`/animals/adopt/${animalId}`, { adopted: newAdoptionStatus })
      .then((res) => {
        notifySucess("Uspješno ste usvojili životinju!");
        setTimeout(() => {
          location.reload();
        }, 700);
      })
      .catch((err) => {
        notify(`Pogreška pri upisivanju statusa donacije ${err.message}`);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/animals`)
      .then((res) => {
        setAnimals(res.data.allAnimals);
        setOriginalAnimals(res.data.allAnimals);
      })
      .catch((err) => notify("Problem pri dohvaćenju životinja", err));
  }, []);

  return (
    <DisplayWrapper>
      <HeaderWrapper>
        <FilterText
          onClick={(e) => {
            openFilter(e);
          }}
        >
          <Filter />
          Filter
        </FilterText>
      </HeaderWrapper>
      <GridWrapper>
        {animals.length > 0 &&
          animals.map((animal) => (
            <AnimalWrapper key={animal._id}>
              <img height="120px" width="200px" src={getImage(animal.type)} />
              <AnimalName>{animal.name}</AnimalName>
              <Subtext>
                {animal.type} ({animal.age})
              </Subtext>
              <p>
                {animal.adopted ? (
                  "Udomljena životinja!"
                ) : (
                  <Button
                    onClick={() => {
                      updateAdoptionStatus(animal._id, true);
                    }}
                  >
                    Udomite
                  </Button>
                )}
              </p>
            </AnimalWrapper>
          ))}

        {animals.length === 0 && (
          <Title>Nije pronađena životinja po tim fiterima!</Title>
        )}
      </GridWrapper>
      {filterOpen && (
        <FilterWindow
          filterPosition={filterPosition}
          animals={animals}
          setFilterOpen={setFilterOpen}
          originalAnimals={originalAnimals}
          setAnimals={setAnimals}
          resetAnimals={resetAnimals}
        />
      )}
    </DisplayWrapper>
  );
}

export default DisplayAnimals;
