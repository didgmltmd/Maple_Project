// components/SpecUpDisplay.jsx
import { Card, Typography, Grid, Divider,Box } from "@mui/material";
import  getJobStats  from "../function/getJobStats";
import  calculateConvertedEquip  from "../function/calculateConvertedEquip";
/* 옵션 3줄 묶음 전투력 합산 */
function sumLines(lines, mainStat) {
  return lines.reduce(
    (acc, line) => acc + (line ? calculateConvertedEquip(line, mainStat) : 0),
    0,
  );
}

/* ── 4. 핵심 비교 함수 ─────────────────────────────── */
function compareItems(prevItems, currItems, mainStat) {
  console.log("SpecUPDisplay:",prevItems, currItems, mainStat);
  const upgraded = [];

  currItems.forEach((curr) => {
    const prev = prevItems.find((p) => p.item_name === curr.item_name);
    if (!prev) return;

    const changes = {};
    let improved = false;

    /* 4-1) 스타포스 */
    if (curr.starforce > prev.starforce) {
      changes.starforce = { before: prev.starforce, after: curr.starforce };
      improved = true;
    }

    if(curr.item_name !== prev.item_name) {
      changes.item_logo = { before: prev.item_icon, after: curr.item_icon };
      improved = true;
    }

    /* 4-2) 잠재옵션(1‧2‧3 세트) */
    const beforePot = [
      prev.potential_option_1,
      prev.potential_option_2,
      prev.potential_option_3,
    ];
    const afterPot = [
      curr.potential_option_1,
      curr.potential_option_2,
      curr.potential_option_3,
    ];
    if (sumLines(afterPot, mainStat) > sumLines(beforePot, mainStat)) {
      changes.potential = { before: beforePot, after: afterPot };
      improved = true;
    }

    /* 4-3) 에디셔널 잠재옵션 */
    const beforeAdd = [
      prev.additional_potential_option_1,
      prev.additional_potential_option_2,
      prev.additional_potential_option_3,
    ];
    const afterAdd = [
      curr.additional_potential_option_1,
      curr.additional_potential_option_2,
      curr.additional_potential_option_3,
    ];
    if (sumLines(afterAdd, mainStat) > sumLines(beforeAdd, mainStat)) {
      changes.additional = { before: beforeAdd, after: afterAdd };
      improved = true;
    }

    if (improved) {
      upgraded.push({ name: curr.item_name, icon: curr.item_icon, changes });
    }
  });

  return upgraded;
}

/* ── 5. 메인 컴포넌트 ──────────────────────────────── */
export default function SpecUpDisplay({ players }) {
  console.log("SpecUpDisplay players:", players);
  return (
    <div style={{ padding: 10 }}>
      {players.map((player, pIdx) => {
        /* (1) 직업 → 주스텟 추출 */
        const { main: mainStat } = getJobStats(player.character || "");

        /* (2) 스펙업 아이템 계산 */
        const ups = compareItems(
          player.prev.items || [],
          player.current.items || [],
          mainStat,
        );
        if (ups.length === 0) return null;
        console.log("SpecUpDisplay ups:", ups);

        return (
          <Card key={pIdx} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">
              {player.name} ({player.character})
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              {ups.map((it, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <img src={it.icon} width={30} alt="" style={{ marginRight: 8 }} />
                    {it.name}
                  </Typography>

                  {it.changes.item_logo && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <img
                        src={it.changes.item_logo.before}
                        width={30}
                        alt="이전 아이템"
                        style={{ marginRight: 8 }}
                      />
                      <img
                        src={it.changes.item_logo.after}
                        width={30}
                        alt="현재 아이템"
                      />
                    </Box>
                  )}

                  {/* 전투력 합산 */}

                  {/* 스타포스 */}
                  {it.changes.starforce && (
                    <Typography variant="body2">
                      ★ {it.changes.starforce.before} → {it.changes.starforce.after}
                    </Typography>
                  )}

                  {/* 잠재 세트 */}
                  {it.changes.potential && (
                    <Typography variant="body2">
                      
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      윗잠  
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        >
                        <Box>
                          {it.changes.potential.before[0]? `  ${it.changes.potential.before[0]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.potential.before[1]? `  ${it.changes.potential.before[1]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.potential.before[2]? `  ${it.changes.potential.before[2]}` : ""}
                        </Box>
                      </Box>

                      <Box>
                        →
                      </Box>


                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        >
                        <Box>
                          {it.changes.potential.after[0]? `  ${it.changes.potential.after[0]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.potential.after[1]? `  ${it.changes.potential.after[1]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.potential.after[2]? `  ${it.changes.potential.after[2]}` : ""}
                        </Box>
                      </Box>


                    </Box>



                    </Typography>
                  )}

                  {/* 에디셔널 세트 */}
                  {it.changes.additional && (
                    <Typography variant="body2">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      아랫잠
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        >
                        <Box>
                          {it.changes.additional.before[0]? `  ${it.changes.additional.before[0]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.additional.before[1]? `  ${it.changes.additional.before[1]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.additional.before[2]? `  ${it.changes.additional.before[2]}` : ""}
                        </Box>
                      </Box>

                      <Box>
                        →
                      </Box>


                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        >
                        <Box>
                          {it.changes.additional.after[0]? `  ${it.changes.additional.after[0]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.additional.after[1]? `  ${it.changes.additional.after[1]}` : ""}
                        </Box>
                        <Box>
                          {it.changes.additional.after[2]? `  ${it.changes.additional.after[2]}` : ""}
                        </Box>
                      </Box>


                    </Box>



                    </Typography>
                  )}

                  <Divider sx={{ my: 1 }} />
                </Grid>
              ))}
            </Grid>
          </Card>
        );
      })}
    </div>
  );
}