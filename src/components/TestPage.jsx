// TestPage.jsx
import React from "react";
import SpecUpDisplay from "./SpecUpDisplay.jsx";

const mockPlayers = [
  {
    name: "양희승",
    character: "히어로",
    prev: {
      items: [
        {
          item_name: "하이네스 원더러햇",
          item_icon: "https://open.api.nexon.com/static/maplestory/item/icon/KEPCIPOA",
          starforce: "10",
          potential_option_1: "DEX +9%",
          potential_option_2: "STR +3%",
          potential_option_3: "DEX +12",
          additional_potential_option_1: "공격력 +2%",
          additional_potential_option_2: "마력 +3%",
          additional_potential_option_3: null,
        },
        {
          item_name: "하이네스 원더러햇",
          item_icon: "https://open.api.nexon.com/static/maplestory/item/icon/KEPCIPOA",
          starforce: "10",
          potential_option_1: "STR +9%",
          potential_option_2: "STR +3%",
          potential_option_3: "DEX +12",
          additional_potential_option_1: "공격력 +2%",
          additional_potential_option_2: "마력 +3%",
          additional_potential_option_3: null,
        },
      ],
    },
    current: {
      items: [
        {
          item_name: "하이네스 원더러햇",
          item_icon: "https://open.api.nexon.com/static/maplestory/item/icon/KEPCIPOA",
          starforce: "12",
          potential_option_1: "STR +9%",
          potential_option_2: "STR +3%",
          potential_option_3: "STR +12",
          additional_potential_option_1: "공격력 +3%",
          additional_potential_option_2: "마력 +3%",
          additional_potential_option_3: null,
        },
        {
          item_name: "하이네스 원더러햇",
          item_icon: "https://open.api.nexon.com/static/maplestory/item/icon/KEPCIPOA",
          starforce: "10",
          potential_option_1: "STR +9%",
          potential_option_2: "STR +3%",
          potential_option_3: "DEX +12",
          additional_potential_option_1: "공격력 +2%",
          additional_potential_option_2: "마력 +3%",
          additional_potential_option_3: null,
        },
      ],
    },
  },
];

export default function TestPage() {
  return <SpecUpDisplay players={mockPlayers} />;
}
