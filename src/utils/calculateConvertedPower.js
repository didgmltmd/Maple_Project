// utils/calculateConvertedPower.js
export default function calculateConvertedPower(statArr) {
  const getValue = (key) => {
    const found = statArr.find((s) => s.stat_name === key);
    return found ? parseFloat(found.stat_value.replace(/,/g, "")) : 0;
  };

  const mainStat = getValue("STR") + getValue("DEX") + getValue("INT") + getValue("LUK");
  const boss = getValue("보스 몬스터 데미지(%)");
  const ignoreDef = getValue("몬스터 방어율 무시(%)");
  const finalDmg = getValue("최종 데미지(%)");

  return Math.round(mainStat + boss * 30 + ignoreDef * 40 + finalDmg * 2);
}
