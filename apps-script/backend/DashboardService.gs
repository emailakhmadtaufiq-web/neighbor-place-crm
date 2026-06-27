/**
 * ==========================================
 * Neighbor Place CRM
 * Dashboard Service
 * Version 1.0.0 Production
 * ==========================================
 */

function getDashboard() {

  const members = getMembers();
  const rewards = getRewards();
  const visits = getVisits();

  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd"
  );

  const month = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM"
  );

  let silver = 0;
  let gold = 0;
  let platinum = 0;
  let rewardReady = 0;
  let visitToday = 0;
  let visitMonth = 0;
  let newMemberMonth = 0;

  members.forEach(member => {

    switch (member[7]) {

      case CONFIG.LEVEL_SILVER:
        silver++;
        break;

      case CONFIG.LEVEL_GOLD:
        gold++;
        break;

      case CONFIG.LEVEL_PLATINUM:
        platinum++;
        break;

    }

    if (
      member[5] &&
      member[5].toString().substring(0,7) === month
    ) {
      newMemberMonth++;
    }

  });

  rewards.forEach(reward => {

    if (reward[3] === "Ready") {
      rewardReady++;
    }

  });

  visits.forEach(visit => {

    if (!visit[2]) return;

    const value = visit[2].toString();

    if (value.substring(0,10) === today) {
      visitToday++;
    }

    if (value.substring(0,7) === month) {
      visitMonth++;
    }

  });

  return {

    totalMember: members.length,

    totalVehicle: members.length,

    silver: silver,

    gold: gold,

    platinum: platinum,

    rewardReady: rewardReady,

    visitToday: visitToday,

    visitMonth: visitMonth,

    newMemberMonth: newMemberMonth

  };

}
