import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "./Header.jsx";
import RankingDisplayPage from "./RankingDisplayPage.jsx";
import  getOcidByName  from "../function/getOcidByName.jsx";
import  getCharacterDetailInfo  from "../function/getCharacterDetailInfo.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import SpecUpDisplay from "./SpecUpDisplay.jsx";
import Test from "./TestPage.jsx";
import Announce from "./Announce.jsx";

const CHARACTER_LIST = [
  { name: "양희승", character: "이브까지" },
  { name: "장기호", character: "시그하는애" },
  { name: "김도훈", character: "쟌뱃" },
  { name: "최정재", character: "드럼통특공대" },
  { name: "손규열", character: "렬활" },
  { name: "홍현우", character: "우현현홍" },
];

export default function MainPage() {
 const [storedPlayers, setStoredPlayers] = useState([]);
 const [loading, setLoading] = useState(true); 

useEffect(() => {
  const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

  const loadAndUpdateCharacters = async () => {
    let stored = JSON.parse(localStorage.getItem("maplePlayers")) || [];
    const updatedPlayers = [];

    for (const input of CHARACTER_LIST) {
      const existing = stored.find(
        (p) => p.character === input.character || p.name === input.name
      );

      let ocid = existing?.ocid || null;
      let shouldUpdateOcid = !existing || existing.character !== input.character || existing.name !== input.name;

      if (shouldUpdateOcid || !ocid) {
        try {
          await delay();
          ocid = await getOcidByName(input.character);
        } catch (e) {
          console.error(`OCID 조회 실패: ${input.character}`);
          continue;
        }
      }

      let current = {};
      try {
        await delay();
        current = await getCharacterDetailInfo(ocid);
        console.log(`캐릭터 상세정보 조회 성공: ${input.character}`, current);
      } catch (e) {
        console.error(`캐릭터 상세정보 실패: ${input.character}`);
        continue;
      }

      updatedPlayers.push({
        name: input.name,
        character: input.character,
        ocid,
        prev: existing?.current || {},
        current,
      });
    }

    setStoredPlayers(updatedPlayers);
    localStorage.setItem("maplePlayers", JSON.stringify(updatedPlayers));
    setLoading(false);
  };

  loadAndUpdateCharacters();
}, []);
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "90vh",
        }}
      >
        <Box>
          <Box sx={{ border: "1px solid black", padding: 2, marginX: 2 ,width: "80vw" , height: "34vh",marginY: 2 }}>
            <Typography align="center">랭킹 전시구간</Typography>
            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            )}
            <RankingDisplayPage characters={storedPlayers} />
          </Box>

          <Box
            sx={{
              border: "1px solid black",
              padding: 2,
              margin: 2,
              width: "80vw",
              height: "46vh",
              overflowY: "auto", 
            }}
          >
            <SpecUpDisplay players={storedPlayers} />
            {/* <Test /> */}
          </Box>

        </Box>      
        <Box>
          <Box
            sx={{
              width: "13vw",
              border: "1px solid black",
              padding: 2,
              height: "85.3vh",
              overflowY: "auto", 
              marginY:2
            }}
            >
              <Announce />
            </Box>
          </Box>
        </Box>
    </>
  );
}