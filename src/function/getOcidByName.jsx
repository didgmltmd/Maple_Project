// utils/getOcid.js
import axios from "axios";

export default async function getOcidByName(characterName) {
  try {
    const response = await axios.get("https://open.api.nexon.com/maplestory/v1/id", {
      params: { character_name: characterName },
      headers: {
        accept: "application/json",
        "x-nxopen-api-key": "test_92dab22cf4710df25f78160a1c7d550dd6cbdcd5583eebba334617fd655178bcefe8d04e6d233bd35cf2fabdeb93fb0d" 
      }
    });

    return response.data.ocid;
  } catch (error) {
    console.error("OCID 요청 실패:", characterName, error);
    return null;
  }
}

