/**
 * ==========================================
 * Neighbor Place CRM
 * Settings Service
 * Version 1.0.0
 * ==========================================
 */

function getSettings() {

  const sheet = getSheet(CONFIG.SHEET_SETTINGS);

  const data = sheet.getDataRange().getValues();

  const settings = {};

  for (let i = 1; i < data.length; i++) {

    settings[data[i][0]] = data[i][1];

  }

  return settings;

}

function getSetting(key) {

  const settings = getSettings();

  return settings[key];

}

function updateSetting(key, value) {

  const sheet = getSheet(CONFIG.SHEET_SETTINGS);

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] == key) {

      sheet.getRange(i + 1, 2).setValue(value);

      logUpdateSetting(key);

      return true;

    }

  }

  sheet.appendRow([key, value]);

  logUpdateSetting(key);

  return true;

}

function rewardTarget() {

  const value = Number(getSetting("RewardTarget"));

  return value || CONFIG.REWARD_TARGET;

}

function goldTarget() {

  const value = Number(getSetting("GoldTarget"));

  return value || CONFIG.GOLD_TARGET;

}

function platinumTarget() {

  const value = Number(getSetting("PlatinumTarget"));

  return value || CONFIG.PLATINUM_TARGET;

}
