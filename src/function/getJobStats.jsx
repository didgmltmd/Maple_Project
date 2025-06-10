const JOB_STAT_TABLE = {
  /* 전사 */
  hero:                 { main: "STR", sub: "DEX" },
  paladin:              { main: "STR", sub: "DEX" },
  darkknight:           { main: "STR", sub: "DEX" },
  dawnwarrior:          { main: "STR", sub: "DEX" },
  aran:                 { main: "STR", sub: "DEX" },
  kaiser:               { main: "STR", sub: "DEX" },
  adele:                { main: "STR", sub: "DEX" },
  ark:                  { main: "STR", sub: "DEX" },

  /* 궁수 */
  bowmaster:            { main: "DEX", sub: "STR" },
  marksman:             { main: "DEX", sub: "STR" },
  windarcher:           { main: "DEX", sub: "STR" },
  wildhunter:           { main: "DEX", sub: "STR" },
  pathfinder:           { main: "DEX", sub: "STR" },
  mercedes:             { main: "DEX", sub: "STR" },

  /* 마법사 */
  bishop:               { main: "INT", sub: "LUK" },
  archmagefp:           { main: "INT", sub: "LUK" },
  archmageil:           { main: "INT", sub: "LUK" },
  blazewizard:          { main: "INT", sub: "LUK" },
  battlemage:           { main: "INT", sub: "LUK" },
  evan:                 { main: "INT", sub: "LUK" },
  luminous:             { main: "INT", sub: "LUK" },
  illium:               { main: "INT", sub: "LUK" },
  kinesis:              { main: "INT", sub: "LUK" },
  lara:                 { main: "INT", sub: "LUK" },

  /* 도적 */
  nightlord:            { main: "LUK", sub: "DEX" },
  shadower:             { main: "LUK", sub: "DEX" },
  dualblade:            { main: "LUK", sub: "DEX" },
  nightwalker:          { main: "LUK", sub: "DEX" },
  phantom:              { main: "LUK", sub: "DEX" },
  cadena:               { main: "LUK", sub: "DEX" },
  hoyoung:              { main: "LUK", sub: "DEX" },
  khali:                { main: "LUK", sub: "DEX" },

  /* 해적 */
  buccaneer:            { main: "STR", sub: "DEX" },
  cannonmaster:         { main: "STR", sub: "DEX" },
  corsair:              { main: "DEX", sub: "STR" },
  mechanic:             { main: "DEX", sub: "STR" },
  angelicbuster:        { main: "DEX", sub: "STR" },

  /* 특수 */
  xenon:                { main: ["STR", "DEX", "LUK"] }, // 트라이스탯
  demonavenger:         { main: "HP",  sub: "STR" },
  shade:                { main: "STR", sub: "DEX" },     // 은월
  zero:                 { main: ["STR", "DEX"], sub: "LUK" },
};

/** ─────────────────────────────────────────────────────
 * 2. 한국어 직업명 → 영어 키 매핑
 *    - key 는 그대로, value 는 JOB_STAT_TABLE 의 키
 * ──────────────────────────────────────────────────── */
const JOB_KR_TO_EN = {
  /* 전사 */
  히어로:          "hero",
  팔라딘:          "paladin",
  다크나이트:      "darkknight",
  소울마스터:      "dawnwarrior",
  아란:            "aran",
  카이저:          "kaiser",
  아델:            "adele",
  아크:            "ark",

  /* 궁수 */
  보우마스터:      "bowmaster",
  신궁:            "marksman",
  윈드브레이커:    "windarcher",
  와일드헌터:      "wildhunter",
  패스파인더:      "pathfinder",
  메르세데스:      "mercedes",

  /* 마법사 */
  비숍:            "bishop",
  아크메이지불독:  "archmagefp",
  "아크메이지(불,독)": "archmagefp",
  아크메이지썬콜:  "archmageil",
  "아크메이지(썬,콜)": "archmageil",
  플레임위자드:    "blazewizard",
  배틀메이지:      "battlemage",
  에반:            "evan",
  루미너스:        "luminous",
  일리움:          "illium",
  키네시스:        "kinesis",
  라라:            "lara",

  /* 도적 */
  나이트로드:      "nightlord",
  섀도어:          "shadower",
  듀얼블레이더:    "dualblade",
  나이트워커:      "nightwalker",
  팬텀:            "phantom",
  카데나:          "cadena",
  호영:            "hoyoung",
  칼리:            "khali",

  /* 해적 */
  바이퍼:          "buccaneer",
  캐논마스터:      "cannonmaster",
  캡틴:            "corsair",
  메카닉:          "mechanic",
  엔젤릭버스터:    "angelicbuster",

  /* 특수 */
  제논:            "xenon",
  데몬어벤져:      "demonavenger",
  은월:            "shade",
  제로:            "zero",
};
/* ── 3. 보조 유틸 ──────────────────────────────────── */
const normalizeKey = (s) => s.toLowerCase().replace(/\s+/g, "");

export default function getJobStats(rawJobName = "") {
  const maybeEn = JOB_KR_TO_EN[rawJobName.trim()] || rawJobName.trim();
  const key = normalizeKey(maybeEn);

  console.log("getJobStats", JOB_STAT_TABLE[key]," ㄴㅇ", key,rawJobName);
  return JOB_STAT_TABLE[key] || { main: "STR", sub: "DEX" };
}