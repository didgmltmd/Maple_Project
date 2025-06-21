// utils/getCharacterDetailInfo.js
import axios from "axios";

const API_KEY = "test_92dab22cf4710df25f78160a1c7d550d74111a80b16477173fe222f193000038efe8d04e6d233bd35cf2fabdeb93fb0d";
const API_KEY_2 = "test_97b35eb92ec9c6f60a4b05fbb3a6aa7d95a057febbf72d60b7404590195d402fefe8d04e6d233bd35cf2fabdeb93fb0d";
const API_KEY_3 ="test_97b35eb92ec9c6f60a4b05fbb3a6aa7da6db78f9ae1777a23fd56467f55377e3efe8d04e6d233bd35cf2fabdeb93fb0d";
const API_KEY_4 ="test_97b35eb92ec9c6f60a4b05fbb3a6aa7db4d584f33bf422a23253d6a0bc0baf19efe8d04e6d233bd35cf2fabdeb93fb0d";
const delay = (ms = 200) => new Promise(res => setTimeout(res, ms));

// 여러 키를 넣어두고…
const API_KEYS = [
  "test_97b35eb92ec9c6f60a4b05fbb3a6aa7d95a057febbf72d60b7404590195d402fefe8d04e6d233bd35cf2fabdeb93fb0d",
  "test_97b35eb92ec9c6f60a4b05fbb3a6aa7da6db78f9ae1777a23fd56467f55377e3efe8d04e6d233bd35cf2fabdeb93fb0d",
  "test_97b35eb92ec9c6f60a4b05fbb3a6aa7db4d584f33bf422a23253d6a0bc0baf19efe8d04e6d233bd35cf2fabdeb93fb0d",
];
// 간단히 순환용 인덱스
let keyIndex = 0;
function nextKey() {
  const key = API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % API_KEYS.length;
  return key;
}

export default async function getCharacterDetailInfo(ocid) {
  try {
    // 1) Basic
    const basicRes = await axios.get(
      "https://open.api.nexon.com/maplestory/v1/character/basic",
      {
        params: { ocid },
        headers: {
          accept: "application/json",
          "x-nxopen-api-key": nextKey(),
        },
      }
    );

    await delay();

    // 2) Stat
    const statRes = await axios.get(
      "https://open.api.nexon.com/maplestory/v1/character/stat",
      {
        params: { ocid },
        headers: {
          accept: "application/json",
          "x-nxopen-api-key": nextKey(),
        },
      }
    );

    await delay();

    // 3) Equipment
    const itemRes = await axios.get(
      "https://open.api.nexon.com/maplestory/v1/character/item-equipment",
      {
        params: { ocid },
        headers: {
          accept: "application/json",
          "x-nxopen-api-key": nextKey(),
        },
      }
    );

    return {
      basic: basicRes.data,
      stat: statRes.data.final_stat,
      items: itemRes.data.item_equipment,
    };
  } catch (err) {
    console.error("캐릭터 상세 정보 조회 실패:", err);
    return null;
  }
}
