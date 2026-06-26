/**
 * ==========================================
 * Neighbor Place CRM
 * Reward Service
 * Version 1.0.0
 * ==========================================
 */

/**
 * Hitung jumlah visit member
 */
function getVisitCount(memberId){

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const data = sheet.getDataRange().getValues();

  let total = 0;

  for(let i=1;i<data.length;i++){

    if(data[i][0] == memberId){

      total++;

    }

  }

  return total;

}

/**
 * Menentukan level member
 */
function getMemberLevel(totalVisit){

  if(totalVisit >= CONFIG.PLATINUM_TARGET){

    return CONFIG.LEVEL_PLATINUM;

  }

  if(totalVisit >= CONFIG.GOLD_TARGET){

    return CONFIG.LEVEL_GOLD;

  }

  return CONFIG.LEVEL_SILVER;

}

/**
 * Apakah reward sudah siap
 */
function isRewardReady(totalVisit){

  return totalVisit > 0 &&
         totalVisit % CONFIG.REWARD_TARGET == 0;

}
