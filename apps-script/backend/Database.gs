/* =====================================================
   Neighbor Place CRM
   Database Service
===================================================== */

/**
 * Spreadsheet
 */
function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

/**
 * Sheet
 */
function getSheet(name) {

  const sheet = getSpreadsheet().getSheetByName(name);

  if (!sheet) {
    throw new Error("Sheet tidak ditemukan : " + name);
  }

  return sheet;

}

/**
 * Inisialisasi Database
 */
function initializeDatabase() {

  createMembersSheet();

  createVisitsSheet();

  createRewardsSheet();

  createLogsSheet();

  createSettingsSheet();

}

/**
 * Members
 */
function createMembersSheet() {

  createSheetIfNotExists(

    CONFIG.SHEET_MEMBERS,

    [
      "MemberID",
      "Nama",
      "Phone",
      "Plate",
      "Vehicle",
      "JoinDate",
      "Status",
      "Level",
      "LastVisit",
      "Notes"
    ]

  );

}

/**
 * Visits
 */
function createVisitsSheet() {

  createSheetIfNotExists(

    CONFIG.SHEET_VISITS,

    [
      "VisitID",
      "MemberID",
      "VisitDate",
      "VisitNumber",
      "RewardStatus",
      "CreatedAt"
    ]

  );

}

/**
 * Rewards
 */
function createRewardsSheet() {

  createSheetIfNotExists(

    CONFIG.SHEET_REWARDS,

    [
      "RewardID",
      "MemberID",
      "RewardName",
      "Status",
      "ClaimDate"
    ]

  );

}

/**
 * Logs
 */
function createLogsSheet() {

  createSheetIfNotExists(

    CONFIG.SHEET_LOGS,

    [
      "LogID",
      "Date",
      "User",
      "Action",
      "ReferenceID",
      "Description"
    ]

  );

}

/**
 * Settings
 */
function createSettingsSheet() {

  createSheetIfNotExists(

    CONFIG.SHEET_SETTINGS,

    [
      "Key",
      "Value"
    ]

  );

}

/**
 * Create Sheet
 */
function createSheetIfNotExists(name, headers) {

  const ss = getSpreadsheet();

  let sheet = ss.getSheetByName(name);

  if (sheet) {

    return sheet;

  }

  sheet = ss.insertSheet(name);

  sheet.getRange(

    1,
    1,
    1,
    headers.length

  ).setValues([headers]);

  sheet.getRange(

    1,
    1,
    1,
    headers.length

  ).setFontWeight("bold");

  sheet.setFrozenRows(1);

  sheet.autoResizeColumns(

    1,

    headers.length

  );

  return sheet;

}
