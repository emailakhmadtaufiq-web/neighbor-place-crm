/**
 * ==========================================
 * Neighbor Place CRM
 * Reward Service
 * Version 1.0.0 Production
 * ==========================================
 */

/**
 * Ambil seluruh reward
 */
function getRewards() {

  const sheet = getSheet(CONFIG.SHEET_REWARDS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  data.shift();

  return data;

}

/**
 * Cek apakah reward sudah tersedia
 */
function checkReward(memberId) {

  const totalVisit = getVisitCount(memberId);

  if (totalVisit === 0) return false;

  if (totalVisit % CONFIG.REWARD_TARGET !== 0) return false;

  const sheet = getSheet(CONFIG.SHEET_REWARDS);

  const rewards = sheet.getDataRange().getValues();

  for (let i = 1; i < rewards.length; i++) {

    if (
      rewards[i][1] === memberId &&
      rewards[i][3] === "Ready"
    ) {
      return true;
    }

  }

sheet.appendRow([
  generateRewardID(),
  memberId,
  "Free Wash",
  "Ready",
  ""
]);

  logClaimReward(rewardId);
  );

  return true;

}

/**
 * Klaim Reward
 */
function claimReward(rewardId){

  const sheet = getSheet(CONFIG.SHEET_REWARDS);

  const values = sheet.getDataRange().getValues();

  for(let i = 1; i < values.length; i++){

    if(values[i][0] === rewardId){

      if(values[i][3] === "Claimed"){

        return {

          success:false,

          message:"Reward sudah pernah diklaim."

        };

      }

      sheet.getRange(i + 1, 4).setValue("Claimed");

      sheet.getRange(i + 1, 5).setValue(now());

      logClaimReward(rewardId);

      return {

        success:true,

        message:"Reward berhasil diklaim."

      };

    }

  }

  return {

    success:false,

    message:"Reward tidak ditemukan."

  };

}

/**
 * Update Level Member
 */
function updateMemberLevel(memberId) {

  const totalVisit = getVisitCount(memberId);

  let level = CONFIG.LEVEL_SILVER;

  if (totalVisit >= CONFIG.PLATINUM_TARGET) {

    level = CONFIG.LEVEL_PLATINUM;

  } else if (totalVisit >= CONFIG.GOLD_TARGET) {

    level = CONFIG.LEVEL_GOLD;

  }

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const members = sheet.getDataRange().getValues();

  for (let i = 1; i < members.length; i++) {

    if (members[i][0] === memberId) {

      sheet
        .getRange(i + 1, 8)
        .setValue(level);

      return;

    }

  }

}
