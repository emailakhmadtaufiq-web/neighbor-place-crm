/**
 * ==========================================
 * Neighbor Place CRM
 * Member Service
 * Version 1.0.0
 * ==========================================
 */

/**
 * Ambil semua member
 */
function getMembers() {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  data.shift();

  return data;

}

/**
 * Tambah Member Baru
 */
function addMember(member){

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  sheet.appendRow([
    member.memberId,
    member.nama,
    member.nohp,
    member.plat,
    member.jenis,
    member.joinDate,
    member.status,
    member.level,
    member.qrCode,
    member.lastVisit
  ]);

  return true;

}
