/**
 * ==========================================
 * Neighbor Place CRM
 * Dashboard Service
 * Version 1.0.0
 * ==========================================
 */

function getDashboardData() {

  const members = getSheet(CONFIG.SHEET_MEMBERS)
      .getDataRange()
      .getValues();

  members.shift();

  let totalMember = members.length;

  let totalVehicle = 0;
  let gold = 0;
  let platinum = 0;
  let rewardReady = 0;

  members.forEach(row => {

    if(row[3]) totalVehicle++;

    if(row[7] == CONFIG.LEVEL_GOLD)
      gold++;

    if(row[7] == CONFIG.LEVEL_PLATINUM)
      platinum++;

  });

  return {

    totalMember: totalMember,

    totalVehicle: totalVehicle,

    gold: gold,

    platinum: platinum,

    rewardReady: rewardReady

  };

}
