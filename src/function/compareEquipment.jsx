export function compareEquipment(prev, current) {
  const changedItems = [];

  current.forEach(curItem => {
    const prevItem = prev.find(p => p.item_equipment_part === curItem.item_equipment_part);

    if (!prevItem) return;

    const changed =
      curItem.starforce > prevItem.starforce ||
      curItem.potential_option_1 !== prevItem.potential_option_1 ||
      curItem.potential_option_2 !== prevItem.potential_option_2 ||
      curItem.potential_option_3 !== prevItem.potential_option_3 ||
      curItem.additional_potential_option_1 !== prevItem.additional_potential_option_1 ||
      curItem.additional_potential_option_2 !== prevItem.additional_potential_option_2 ||
      curItem.additional_potential_option_3 !== prevItem.additional_potential_option_3;

    if (changed) {
      changedItems.push({
        part: curItem.item_equipment_part,
        item_name: curItem.item_name,
        icon: curItem.item_icon,
        before: {
          starforce: prevItem.starforce,
          pot1: prevItem.potential_option_1,
          pot2: prevItem.potential_option_2,
          pot3: prevItem.potential_option_3,
          add1: prevItem.additional_potential_option_1,
          add2: prevItem.additional_potential_option_2,
          add3: prevItem.additional_potential_option_3,
        },
        after: {
          starforce: curItem.starforce,
          pot1: curItem.potential_option_1,
          pot2: curItem.potential_option_2,
          pot3: curItem.potential_option_3,
          add1: curItem.additional_potential_option_1,
          add2: curItem.additional_potential_option_2,
          add3: curItem.additional_potential_option_3,
        }
      });
    }
  });

  return changedItems;
}
