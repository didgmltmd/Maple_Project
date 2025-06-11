// utils/getCharacterDetailInfo.js
import axios from "axios";

const API_KEY = "test_92dab22cf4710df25f78160a1c7d550d74111a80b16477173fe222f193000038efe8d04e6d233bd35cf2fabdeb93fb0d";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export default async function getCharacterDetailInfo(ocid) {
  const headers = {
    accept: "application/json",
    "x-nxopen-api-key": API_KEY,
  };

  try {
    await delay(); 
    const basicRes = await axios.get("https://open.api.nexon.com/maplestory/v1/character/basic", {
      params: { ocid },
      headers,
    });

    await delay(); // 능력치 요청 전
    const statRes = await axios.get("https://open.api.nexon.com/maplestory/v1/character/stat", {
      params: { ocid },
      headers,
    });

    await delay(); // 장비 정보 요청 전
    const itemRes = await axios.get("https://open.api.nexon.com/maplestory/v1/character/item-equipment", {
      params: { ocid },
      headers,
    });

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