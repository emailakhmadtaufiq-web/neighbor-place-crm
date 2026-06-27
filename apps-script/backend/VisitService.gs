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
function getVisits() {

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  data.shift();

  return data;

}

/**
 * Riwayat Visit Member
 */
function getVisitHistory(memberId) {

  return getVisits().filter(v => v[1] === memberId);

}

/**
 * Total Visit Member
 */
function getVisitCount(memberId) {

  return getVisitHistory(memberId).length;

}

/**
 * Tambah Visit
 */
function createVisit(memberId) {

  const member = getMember(memberId);

  if (!member) {

    return {

      success: false,

      message: "Member tidak ditemukan."

    };

  }

  const visitId = generateVisitID();

  const visitDate = formatDate(now());

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  sheet.appendRow([

    visitId,

    memberId,

    visitDate,

    currentAdmin()

  ]);

  updateLastVisit(memberId, visitDate);

  updateMemberLevel(memberId);

  checkReward(memberId);

  logVisit(memberId);

  return {

    success: true,

    message: "Visit berhasil ditambahkan."

  };

}

/**
 * Update Last Visit
 */
function updateLastVisit(memberId, visitDate) {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === memberId) {

      sheet.getRange(i + 1, 10).setValue(visitDate);

      return;

    }

  }

}
