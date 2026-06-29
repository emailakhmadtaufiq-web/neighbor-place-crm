/* =====================================================
   Neighbor Place CRM
   Visit Service
===================================================== */

/**
 * Ambil Semua Visit
 */
function getVisits() {

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {

    return [];

  }

  const data = [];

  for (let i = 1; i < values.length; i++) {

    const row = values[i];

    const member = getMember(row[1]);

    data.push([

      row[0],

      member ? member[1] : "-",

      formatDate(row[2]),

      row[3],

      row[4],

      row[5]

    ]);

  }

  return data;

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

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const visitHistory = getVisitHistory(memberId);

  const visitNumber = visitHistory.length + 1;

  const visitId = generateVisitID();

  const visitDate = new Date();

  const rewardStatus =
    visitNumber >= rewardTarget()
      ? "Ready"
      : "Progress";

  sheet.appendRow([

    visitId,

    memberId,

    visitDate,

    visitNumber,

    rewardStatus,

    now()

  ]);

  updateLastVisit(memberId);

  updateMemberLevel(memberId);

  checkReward(memberId);

  logCreateVisit(visitId);

  return {

    success: true,

    message: "Visit berhasil ditambahkan."

  };

}

/**
 * Update Last Visit Member
 */
function updateLastVisit(memberId) {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] === memberId) {

      sheet.getRange(i + 1, 9).setValue(now());

      return true;

    }

  }

  return false;

}

/**
 * Riwayat Visit Member
 */
function getVisitHistory(memberId) {

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {

    return [];

  }

  const history = [];

  for (let i = 1; i < values.length; i++) {

    const row = values[i];

    if (row[1] === memberId) {

      history.push({
        visitId: row[0],
        memberId: row[1],
        visitDate: row[2],
        visitNumber: row[3],
        rewardStatus: row[4],
        createdAt: row[5]
      });

    }

  }

  history.sort(function(a, b) {

    return new Date(b.visitDate) - new Date(a.visitDate);

  });

  return history;

}

/**
 * Jumlah Visit Member
 */
function getVisitCount(memberId) {

  return getVisitHistory(memberId).length;

}

/**
 * Cari Visit berdasarkan ID
 */
function findVisit(visitId) {

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] === visitId) {

      return values[i];

    }

  }

  return null;

}

/**
 * Cek apakah member sudah visit hari ini
 */
function memberHasVisitToday(memberId) {

  const history = getVisitHistory(memberId);

  const today = Utilities.formatDate(

    new Date(),

    Session.getScriptTimeZone(),

    "yyyy-MM-dd"

  );

  return history.some(function(item) {

    const visitDate = Utilities.formatDate(

      new Date(item.visitDate),

      Session.getScriptTimeZone(),

      "yyyy-MM-dd"

    );

    return visitDate === today;

  });

}
