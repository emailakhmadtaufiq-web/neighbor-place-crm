/**
 * ==========================================
 * Neighbor Place CRM
 * Visit Service
 * Version 1.0.0
 * ==========================================
 */

/**
 * Ambil semua data visit
 */
function getVisits() {

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  data.shift();

  return data;

}

/**
 * Tambah Visit Baru
 */
function addVisit(visit){

  const sheet = getSheet(CONFIG.SHEET_VISITS);

  sheet.appendRow([
    visit.memberId,
    visit.nama,
    visit.plat,
    visit.tanggal,
    visit.jenis,
    visit.petugas
  ]);

  updateLastVisit(visit.memberId, visit.tanggal);

  return true;

}

/**
 * Update Last Visit di Sheet Members
 */
function updateLastVisit(memberId, tanggal){

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][0] == memberId){

      sheet.getRange(i+1,10).setValue(tanggal);

      break;

    }

  }

}
