/**
 * ==========================================
 * Neighbor Place CRM
 * Log Service
 * Version 1.0.0
 * ==========================================
 */

function createLog(activity, memberId = "", description = "") {

  const sheet = getSheet(CONFIG.SHEET_LOGS);

  sheet.appendRow([
    generateLogID(),
    formatDate(now()),
    currentAdmin(),
    activity,
    memberId,
    description
  ]);

}

function getLogs() {

  const sheet = getSheet(CONFIG.SHEET_LOGS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  data.shift();

  return data.reverse();

}

function logCreateMember(memberId) {

  createLog(
    "CREATE_MEMBER",
    memberId,
    "Member baru berhasil dibuat"
  );

}

function logUpdateMember(memberId) {

  createLog(
    "UPDATE_MEMBER",
    memberId,
    "Data member diperbarui"
  );

}

function logDeactivateMember(memberId) {

  createLog(
    "DEACTIVATE_MEMBER",
    memberId,
    "Member dinonaktifkan"
  );

}

function logVisit(memberId) {

  createLog(
    "CREATE_VISIT",
    memberId,
    "Visit berhasil ditambahkan"
  );

}

function logReward(memberId) {

  createLog(
    "CLAIM_REWARD",
    memberId,
    "Reward berhasil diklaim"
  );

}
