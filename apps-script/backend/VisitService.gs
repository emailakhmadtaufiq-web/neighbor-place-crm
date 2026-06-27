/**
 * ==========================================
 * Neighbor Place CRM
 * Visit Service
 * Version 1.0.0 Production
 * ==========================================
 */

/**
 * Ambil seluruh visit
 */
function getVisits(){

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const values = sheet.getDataRange().getValues();

  if(values.length <= 1){

    return [];

  }

  const result = [];

  for(let i=1;i<values.length;i++){

    const row = values[i];

    const member = getMember(row[1]);

    result.push([

      row[0],                               // VisitID

      member ? member[1] : "-",             // Nama Member

      formatDate(row[2]),                   // Visit Date

      row[3],                               // Visit Number

      row[4],                               // Reward Status

      row[5]                                // Created At

    ]);

  }

  return result;

}
/**
 * Tambah Visit
 */
function createVisit(memberId){

  const member = getMember(memberId);

  if(!member){

    return {

      success:false,

      message:"Member tidak ditemukan."

    };

  }

  const visitSheet = getSheet(CONFIG.SHEET_VISITS);

  const visitHistory = getVisitHistory(memberId);

  const visitNumber = visitHistory.length + 1;

  const visitId = generateVisitID();

  const visitDate = new Date();

  let rewardStatus = "Progress";

  if(visitNumber >= CONFIG.REWARD_TARGET){

    rewardStatus = "Ready";

  }

  visitSheet.appendRow([

    visitId,

    memberId,

    visitDate,

    visitNumber,

    rewardStatus,

    now()

  ]);

 
/**
 * Update Last Visit
 */
function updateLastVisit(memberId){

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  for(let i=1;i<values.length;i++){

    if(values[i][0]===memberId){

      sheet.getRange(i+1,9).setValue(now());

      return true;

    }

  }

  return false;

}
 updateLastVisit(memberId);
/**
 * Riwayat Visit Member
 */
function getVisitHistory(memberId){

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const values = sheet.getDataRange().getValues();

  if(values.length <= 1){

    return [];

  }

  const history = [];

  for(let i = 1; i < values.length; i++){

    if(values[i][1] === memberId){

      history.push(values[i]);

    }

  }

  return history;

}

/**
 * Jumlah Visit Member
 */
function getVisitCount(memberId){

  return getVisitHistory(memberId).length;

}

  updateMemberLevel(memberId);

  checkReward(memberId);

  logCreateVisit(visitId);

  return {

    success:true,

    message:"Visit berhasil ditambahkan."

  };

}
