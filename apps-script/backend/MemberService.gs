/**
 * ==========================================
 * Neighbor Place CRM
 * Member Service
 * Version 1.0.0 Production
 * ==========================================
 */

/**
 * Ambil seluruh member
 */
function getMembers() {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  data.shift();

  return data;

}

/**
 * Ambil 1 member
 */
function getMember(memberId) {

  const members = getMembers();

  for (const member of members) {

    if (member[0] === memberId) {
      return member;
    }

  }

  return null;

}

/**
 * Cari member
 */
function searchMember(keyword) {

  keyword = keyword.toString().toLowerCase();

  const members = getMembers();

  return members.filter(member => {

    return (
      member[1].toString().toLowerCase().includes(keyword) ||
      member[2].toString().toLowerCase().includes(keyword) ||
      member[3].toString().toLowerCase().includes(keyword)
    );

  });

}

/**
 * Tambah Member
 */
function createMember(data) {

  const plate = formatPlate(data.plate);

  if (!validatePlate(plate)) {

    return {
      success: false,
      message: "Plat nomor sudah terdaftar."
    };

  }

  const memberId = generateMemberID();

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  sheet.appendRow([

    memberId,

    data.name,

    formatPhone(data.phone),

    plate,

    data.vehicle,

    formatDate(now()),

    CONFIG.STATUS_ACTIVE,

    CONFIG.LEVEL_SILVER,

    "",

    ""

  ]);

  logCreateMember(memberId);

  return {

    success: true,

    memberId: memberId,

    message: "Member berhasil ditambahkan."

  };

}

/**
 * Update Member
 */
function updateMember(memberId, data) {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] === memberId) {

      sheet.getRange(i + 1, 2).setValue(data.name);
      sheet.getRange(i + 1, 3).setValue(formatPhone(data.phone));
      sheet.getRange(i + 1, 4).setValue(formatPlate(data.plate));
      sheet.getRange(i + 1, 5).setValue(data.vehicle);

      logUpdateMember(memberId);

      return true;

    }

  }

  return false;

}

/**
 * Nonaktifkan Member
 */
function deactivateMember(memberId) {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] === memberId) {

      sheet
        .getRange(i + 1, 7)
        .setValue(CONFIG.STATUS_INACTIVE);

      logDeactivateMember(memberId);

      return true;

    }

  }

  return false;

}
