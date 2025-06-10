// CharacterCard.jsx
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box
} from "@mui/material";

export default function CharacterCard({ character , index ,getLow,getHigh}) {
  const handleClick = (characterName) => {
    const url = `https://maplescouter.com/info?name=${encodeURIComponent(characterName)}&preset=00000`;
    window.open(url, "_blank");
  };

  if (!character) return null;

  const {
    name,
    character: characterName,
    job,
    level,
    expRate,
    image,
    convertedPower,
  } = character;

  return (
    <Card sx={{ mb: 2, position: "relative" ,width: "12.2vw",height: "30vh"}}>
      {(index === 0 && !getHigh && !getLow) && (
        <>
      <span
      style={{
        position: "absolute",
        top: 10,
        right: 100,
        width: 60,
        height: 60,
        zIndex: 10,
      }}
      >👑</span>
    <img
      src="/data/god.png"
      alt="왕관"
      style={{
        position: "absolute",
        top: -10,
        right: 70,
        width: 60,
        height: 60,
        zIndex: 10,
      }}
      />
    <span
    style={{
        position: "absolute",
        top: 10,
        right: 9,
        width: 60,
        height: 60,
        zIndex: 10,
      }}
    >👑</span>
    
    </>
  )}

  {/* 🔴 꼴등: 이미지 표시 */}
  {(index === 5 && !getHigh && !getLow) && (
        <>
      <span
      style={{
        position: "absolute",
        top: 10,
        right: 100,
        width: 60,
        height: 60,
        zIndex: 10,
      }}
      >🛢️</span>
    <img
      src="/data/king.jpg"
      alt="왕관"
      style={{
        position: "absolute",
        top: -5,
        right: 70,
        width: 60,
        height: 60,
        zIndex: 10,
      }}
      />
    <span
    style={{
        position: "absolute",
        top: 10,
        right: 9,
        width: 60,
        height: 60,
        zIndex: 10,
      }}
    >🛢️</span>
    
    </>
  )}


  {getLow && (
    <>
    <Typography
      sx={{
        position: "absolute",
        top: 5,
        left: 5,
        color: "red",
        fontWeight: "bold",
        fontSize: "0.8rem",
      }}
      >
      ▼ 랭킹 하락!
    </Typography>
    <img
        src="/data/tanhack.png"
        alt="따잇"
        style={{
          position: "absolute",
          top: -5,
          right: 70,
          width: 60,
          height: 60,
          zIndex: 10,
        }}
        />
    </>
)}
{getHigh && (
  <>
    <Typography
      sx={{
        position: "absolute",
        top: 5,
        left: 5,
        color: "blue",
        fontWeight: "bold",
        fontSize: "0.8rem",
      }}
      >
      ▲ 랭킹 상승!
    </Typography>
    <img
          src="/data/elected.png"
          alt="당선"
          style={{
            position: "absolute",
            top: -5,
            right: 70,
            width: 60,
            height: 60,
            zIndex: 10,
          }}
          />
    </>
)}

      <CardContent
        sx={{
          marginTop: "5vh",
        }}
      >
        <Typography variant="h7">
          {name} ({characterName})
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

        <CardMedia
          component="img"
          sx={{
            width: 100,
            height: 100,
            objectFit: "contain",
            borderRadius: 1,
            cursor: "pointer", 
            transition: "0.2s", 
            "&:hover": {
              boxShadow: 3, 
            },
          }}
          image={image}
          alt="캐릭터 이미지"
          onClick={() => handleClick(characterName)}
        />
        </Box>
        <Typography>직업: {job}</Typography>
        <Typography>
          환산 전투력: {convertedPower.toLocaleString()}
        </Typography>
          <Typography>레벨: {level}</Typography>
        <Box style={{ paddingHorizontal: 16 }}>
          <Box
            style={{
              height: 10,
              backgroundColor: '#eee',
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 8,
            }}
          >
            <Box
              style={{
                width: `${expRate}%`,
                height: '100%',
                backgroundColor: 'green',
                borderRadius: 10,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}