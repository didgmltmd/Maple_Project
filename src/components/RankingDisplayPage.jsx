import React, { useEffect, useState, useRef } from "react";
import CharacterCard from "./CharacterCard";
import calculateConvertedPower from "../utils/calculateConvertedPower";
import { Grid, Typography } from "@mui/material";

export default function RankingDisplayPage({ characters }) {
  const [viewData, setViewData] = useState([]);
  const prevRankingRef = useRef(
    JSON.parse(localStorage.getItem("prevRanking") || "[]")
  );

  /* 1) characters 변경 시 새 랭킹 계산 */
  useEffect(() => {
    if (!characters?.length) return;

    const scoreList = characters
      .map((p) => {
        const info = p?.current;
        if (!info?.stat || !info.basic) return null;
        return {
          name: p.name,
          character: p.character,
          world: info.basic.world_name,
          job: info.basic.character_class,
          level: info.basic.character_level,
          expRate: info.basic.character_exp_rate,
          image: info.basic.character_image,
          convertedPower: calculateConvertedPower(info.stat,info.basic.character_class),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.convertedPower - a.convertedPower);

    /* 2) 이전 스냅샷과 비교해 ▲▼ 플래그 부여 */
    const withDiff = scoreList.map((c, idx) => {
      const before = prevRankingRef.current.find((r) => r.name === c.name);
      const beforeIdx = before?.index ?? -1;
      return {
        ...c,
        getLow: beforeIdx !== -1 && beforeIdx < idx,
        getHigh: beforeIdx !== -1 && beforeIdx > idx,
      };
    });

    /* 3) 화면에 표시 */
    setViewData(withDiff);

    /* 4) ref 업데이트(다음 비교용) */
    prevRankingRef.current = withDiff.map(({ name }, i) => ({
      name,
      index: i,
    }));
  }, [characters]);

  /* 5) ref 가 바뀔 때만 localStorage 저장 (뒤처리) */
  useEffect(() => {
    localStorage.setItem("prevRanking", JSON.stringify(prevRankingRef.current));
  }, [prevRankingRef.current]);

  /* ─ UI ─ */
  if (!characters?.length) return <Typography />;

  return (
    <Grid container spacing={2} padding={2}>
      {viewData.map((c, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <CharacterCard
            character={c}
            index={idx}
            getLow={c.getLow}
            getHigh={c.getHigh}
          />
        </Grid>
      ))}
    </Grid>
  );
}