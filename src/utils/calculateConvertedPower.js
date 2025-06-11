import getJobStats from "../function/getJobStats";
// 스탯에서 값 추출
const getValue = (statArr, key) => {
  const found = statArr.find((s) => s.stat_name === key);
  return found ? parseFloat(found.stat_value.replace(/,/g, "")) : 0;
};

export default function calculateConvertedPower(statArr, rawJobName = "") {
  const { main, sub } = getJobStats(rawJobName);
  const get = (key) => {
    const val = statArr.find((s) => s.stat_name === key);
    return val ? parseFloat(val.stat_value.replace(/,/g, "")) : 0;
  };

  const mainStat = Array.isArray(main)
    ? main.reduce((sum, stat) => sum + get(stat), 0)
    : get(main);

  const subStat = Array.isArray(main) ? 0 : get(sub);

  const attPercent = get("공격력(%)");
  const boss = get("보스 몬스터 데미지(%)");
  const ignoreDef = get("몬스터 방어율 무시(%)");
  const finalDmg = get("최종 데미지(%)");
  const critRate = get("크리티컬 확률(%)");
  const critDmg = get("크리티컬 데미지(%)");

  const converted =
    mainStat +
    subStat * 0.25 +
    attPercent * 15 +
    boss * 30 +
    ignoreDef * 40 +
    finalDmg * 2.5 +
    (critRate / 100) * critDmg * 0.1;

  return Math.round(converted);
}
