/**
 * ==========================================
 * Neighbor Place CRM
 * Member Service
 * Production v2.0
 * ==========================================
 */

/**
 * Ambil semua member
 */
function getMembers() {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) return [];

  values.shift();

  return values;

}

/**
 * Ambil member berdasarkan MemberID
 */
function getMember(memberId) {

  const members = getMembers();

  return members.find(member => member[0] === memberId) || null;

}

/**
 * Cari member
 */
function searchMembers(keyword) {

  keyword = keyword.toString().trim().toLowerCase();

  if (keyword === "") {
    return getMembers();
  }

  return getMembers().filter(member => {

    return (
      String(member[0]).toLowerCase().includes(keyword) ||
      String(member[1]).toLowerCase().includes(keyword) ||
      String(member[2]).toLowerCase().includes(keyword) ||
      String(member[3]).toLowerCase().includes(keyword)
    );

  });

}

/**
 * Validasi data member
 */
function validateMemberData(data) {

  if (!data.name || data.name.trim() === "") {
    return {
      success: false,
      message: "Nama wajib diisi."
    };
  }

  if (!data.phone || data.phone.trim() === "") {
    return {
      success: false,
      message: "Nomor HP wajib diisi."
    };
  }

  if (!data.plate || data.plate.trim() === "") {
    return {
      success: false,
      message: "Plat nomor wajib diisi."
    };
  }

  if (!data.vehicle || data.vehicle.trim() === "") {
    return {
      success: false,
      message: "Jenis kendaraan wajib dipilih."
    };
  }

  return {
    success: true
  };

}

/**
 * ==========================================
 * CREATE MEMBER
 * ==========================================
 */
function createMember(data) {

  const validation = validateMemberData(data);

  if (!validation.success) {
    return validation;
  }

  const plate = formatPlate(data.plate);

  if (!validatePlate(plate)) {

    return {
      success: false,
      message: "Plat nomor sudah terdaftar."
    };

  }

  const memberId = generateMemberID();

  const row = [

    memberId,

    data.name.trim(),

    formatPhone(data.phone),

    plate,

    data.vehicle,

    new Date(),

    CONFIG.STATUS_ACTIVE,

    CONFIG.LEVEL_SILVER,

    "",

    ""

  ];

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  sheet.appendRow(row);

  logCreateMember(memberId);

  return {

    success: true,

    memberId: memberId,

    message: "Member berhasil ditambahkan."

  };

}

/**
 * ==========================================
 * CHECK MEMBER EXISTS
 * ==========================================
 */
function memberExists(memberId){

  return getMember(memberId) !== null;

}

/**
 * ==========================================
 * CHECK PLATE EXISTS
 * ==========================================
 */
function plateExists(plate){

  plate = formatPlate(plate);

  const members = getMembers();

  return members.some(member => {

    return (
      formatPlate(member[3]) === plate &&
      member[6] === CONFIG.STATUS_ACTIVE
    );

  });

}

/**
 * ==========================================
 * UPDATE MEMBER
 * ==========================================
 */
function updateMember(memberId, data) {

  const validation = validateMemberData(data);

  if (!validation.success) {
    return validation;
  }

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  const newPlate = formatPlate(data.plate);

  for (let i = 1; i < values.length; i++) {

    if (
      values[i][0] !== memberId &&
      formatPlate(values[i][3]) === newPlate &&
      values[i][6] === CONFIG.STATUS_ACTIVE
    ) {

      return {
        success: false,
        message: "Plat nomor sudah digunakan member lain."
      };

    }

  }

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] === memberId) {

      sheet.getRange(i + 1, 2).setValue(data.name.trim());

      sheet.getRange(i + 1, 3).setValue(
        formatPhone(data.phone)
      );

      sheet.getRange(i + 1, 4).setValue(newPlate);

      sheet.getRange(i + 1, 5).setValue(data.vehicle);

      logUpdateMember(memberId);

      return {

        success: true,

        message: "Data member berhasil diperbarui."

      };

    }

  }

  return {

    success: false,

    message: "Member tidak ditemukan."

  };

}

/**
 * ==========================================
 * NONAKTIFKAN MEMBER
 * ==========================================
 */
function deactivateMember(memberId) {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] === memberId) {

      sheet.getRange(i + 1, 7)
           .setValue(CONFIG.STATUS_INACTIVE);

      logDeactivateMember(memberId);

      return {

        success: true,

        message: "Member berhasil dinonaktifkan."

      };

    }

  }

  return {

    success: false,

    message: "Member tidak ditemukan."

  };

}

/**
 * ==========================================
 * GET ACTIVE MEMBERS
 * ==========================================
 */
function getActiveMembers() {

  return getMembers().filter(member => {

    return member[6] === CONFIG.STATUS_ACTIVE;

  });

}

/**
 * ==========================================
 * GET INACTIVE MEMBERS
 * ==========================================
 */
function getInactiveMembers() {

  return getMembers().filter(member => {

    return member[6] === CONFIG.STATUS_INACTIVE;

  });

}

/**
 * ==========================================
 * MEMBER STATISTICS
 * ==========================================
 */
function getMemberStatistics() {

  const members = getMembers();

  let silver = 0;
  let gold = 0;
  let platinum = 0;
  let active = 0;
  let inactive = 0;

  members.forEach(member => {

    if (member[6] === CONFIG.STATUS_ACTIVE) {

      active++;

    } else {

      inactive++;

    }

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

  });

  return {

    total: members.length,

    active: active,

    inactive: inactive,

    silver: silver,

    gold: gold,

    platinum: platinum

  };

}

/**
 * ==========================================
 * LAST MEMBER
 * ==========================================
 */
function getLastMember() {

  const members = getMembers();

  if (members.length === 0) {

    return null;

  }

  return members[members.length - 1];

}

/**
 * ==========================================
 * MEMBER BY PLATE
 * ==========================================
 */
function getMemberByPlate(plate) {

  plate = formatPlate(plate);

  const members = getMembers();

  for (let i = 0; i < members.length; i++) {

    if (

      formatPlate(members[i][3]) === plate &&

      members[i][6] === CONFIG.STATUS_ACTIVE

    ) {

      return members[i];

    }

  }

  return null;

}

/**
 * ==========================================
 * MEMBER BY PHONE
 * ==========================================
 */
function getMemberByPhone(phone) {

  phone = formatPhone(phone);

  const members = getMembers();

  for (let i = 0; i < members.length; i++) {

    if (formatPhone(members[i][2]) === phone) {

      return members[i];

    }

  }

  return null;

}

/**
 * ==========================================
 * TOTAL ACTIVE MEMBER
 * ==========================================
 */
function getTotalActiveMember() {

  return getActiveMembers().length;

}

/**
 * ==========================================
 * TOTAL INACTIVE MEMBER
 * ==========================================
 */
function getTotalInactiveMember() {

  return getInactiveMembers().length;

}
