// components/SpecUpDisplay.jsx
import { Card, Typography, Grid, Divider } from "@mui/material";

function compareItems(prevItems, currentItems) {
  const upgraded = [];

  currentItems.forEach((curr) => {
    const prev = prevItems.find((p) => p.item_name === curr.item_name);
    if (!prev) return;

    const fields = ["starforce", "potential_option_1", "additional_potential_option_1"];
    let changed = false;
    const changes = {};

    fields.forEach((field) => {
      if (curr[field] !== prev[field]) {
        changed = true;
        changes[field] = { before: prev[field], after: curr[field] };
      }
    });

    if (changed) {
      upgraded.push({
        name: curr.item_name,
        icon: curr.item_icon,
        changes,
      });
    }
  });

  return upgraded;
}

export default function SpecUpDisplay({ players }) {
    console.log("SpecUpDisplay players:", players);
  return (
    <div style={{ padding: 10 }}>
      {players.map((player, idx) => {
        const upgradedItems = compareItems(player.prev.items || [], player.current.items || []);
        if (upgradedItems.length === 0) return null;

        return (
          <Card key={idx} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">
              {player.name} ({player.character})
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {upgradedItems.map((item, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Typography>
                    <img src={item.icon} width={30} alt="" style={{ marginRight: 8 }} />
                    {item.name}
                  </Typography>
                  {Object.entries(item.changes).map(([key, val], idx2) => (
                    <Typography key={idx2} variant="body2">
                      {key}: {val.before} → {val.after}
                    </Typography>
                  ))}
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
