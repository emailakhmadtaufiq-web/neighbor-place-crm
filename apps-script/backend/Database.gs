/**
 * ==========================================
 * Neighbor Place CRM
 * Database Helper
 * Version 1.0.0
 * ==========================================
 */

function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}
