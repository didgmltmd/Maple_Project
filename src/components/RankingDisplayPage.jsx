import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import calculateConvertedPower from "../utils/calculateConvertedPower";
import { Grid, Typography } from "@mui/material";

export default function RankingDisplayPage({ characters }) {
  const [charactersWithRankChange, setCharactersWithRankChange] = useState([]);

  useEffect(() => {
    if (!characters || characters.length === 0) return;

    const prevRanking = JSON.parse(localStorage.getItem("prevRanking") || "[]");

    const charactersWithScore = characters
      .map((player) => {
        const info = player.current;
        if (!info || !info.stat || !info.basic) return null;

        const convertedPower = calculateConvertedPower(info.stat);

        return {
          name: player.name,
          character: player.character,
          world: info.basic.world_name,
          job: info.basic.character_class,
          level: info.basic.character_level,
          expRate: info.basic.character_exp_rate,
          image: info.basic.character_image,
          convertedPower,
        };
      })
      .filter(Boolean);

    const sorted = [...charactersWithScore].sort(
      (a, b) => b.convertedPower - a.convertedPower
    );

    const withChange = sorted.map((char, idx) => {
      const prev = prevRanking.find((p) => p.name === char.name);
      const prevIndex = prev?.index ?? -1;
      return {
        ...char,
        getLow: prevIndex !== -1 && prevIndex < idx,
        getHigh: prevIndex !== -1 && prevIndex > idx,
        currentIndex: idx,
      };
    });

    setCharactersWithRankChange(withChange);

    localStorage.setItem(
      "prevRanking",
      JSON.stringify(withChange.map(({ name }, i) => ({ name, index: i })))
    );
  }, [characters]);

  if (!characters || characters.length === 0) {
    return <Typography></Typography>;
  }

  return (
    <Grid container spacing={2} padding={2}>
      {charactersWithRankChange.map((char, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <CharacterCard
            character={char}
            index={idx}
            getLow={char.getLow}
            getHigh={char.getHigh}
          />
        </Grid>
      ))}
    </Grid>
  );
}
