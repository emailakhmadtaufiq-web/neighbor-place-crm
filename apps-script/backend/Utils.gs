/**
 * ==========================================
 * Neighbor Place CRM
 * Utils Service
 * Version 1.0.0
 * ==========================================
 */

/**
 * Timestamp
 */
function now() {
  return new Date();
}

/**
 * Format Date
 */
function formatDate(date) {
  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    "yyyy-MM-dd HH:mm:ss"
  );
}

/**
 * Current Year (2 Digit)
 */
function currentYear() {
  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yy"
  );
}

/**
 * Generate Running ID
 */
function generateRunning(prefix, sheetName, column) {

  const sheet = getSheet(sheetName);

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return prefix + "-" + currentYear() + "-000001";
  }

  const lastID = sheet
    .getRange(lastRow, column)
    .getValue()
    .toString();

  const number = parseInt(lastID.split("-")[2], 10) + 1;

  return (
    prefix +
    "-" +
    currentYear() +
    "-" +
    String(number).padStart(6, "0")
  );

}

/**
 * Member ID
 */
function generateMemberID() {
  return generateRunning(
    "NP",
    CONFIG.SHEET_MEMBERS,
    1
  );
}

/**
 * Visit ID
 */
function generateVisitID() {
  return generateRunning(
    "VS",
    CONFIG.SHEET_VISITS,
    1
  );
}

/**
 * Reward ID
 */
function generateRewardID() {
  return generateRunning(
    "RW",
    CONFIG.SHEET_REWARDS,
    1
  );
}

/**
 * Log ID
 */
function generateLogID() {
  return generateRunning(
    "LG",
    CONFIG.SHEET_LOGS,
    1
  );
}

/**
 * Format Plate
 */
function formatPlate(plate) {

  return plate
    .toString()
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");

}

/**
 * Format Phone
 */
function formatPhone(phone) {

  let value = phone
    .toString()
    .replace(/\D/g, "");

  if (value.startsWith("62")) {
    value = "0" + value.substring(2);
  }

  return value;

}

/**
 * Validate Plate
 */
function validatePlate(plate) {

  const sheet = getSheet(CONFIG.SHEET_MEMBERS);

  const data = sheet.getDataRange().getValues();

  plate = formatPlate(plate);

  for (let i = 1; i < data.length; i++) {

    if (
      formatPlate(data[i][3]) === plate &&
      data[i][6] === CONFIG.STATUS_ACTIVE
    ) {
      return false;
    }

  }

  return true;

}

/**
 * Current Admin
 */
function currentAdmin() {
  return "Owner";
}
