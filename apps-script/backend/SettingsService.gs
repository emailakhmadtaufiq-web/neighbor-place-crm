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

createLog(
  "UPDATE_SETTING",
  "",
  key
);

return true;

    }

  }

  sheet.appendRow([key, value]);

createLog(
  "UPDATE_SETTING",
  "",
  key
);

return true;

}
function saveAllSettings(data) {

  const sheet = getSheet(CONFIG.SHEET_SETTINGS);

  const values = sheet.getDataRange().getValues();

  const map = {};

  for (let i = 1; i < values.length; i++) {
    map[values[i][0]] = i + 1;
  }

  Object.keys(data).forEach(function(key) {

    if (map[key]) {

      sheet.getRange(map[key], 2).setValue(data[key]);

    } else {

      sheet.appendRow([key, data[key]]);

    }

  });

  createLog(
    "UPDATE_SETTINGS",
    "",
    "Konfigurasi aplikasi diperbarui"
  );

  return {
    success: true,
    message: "Setting berhasil disimpan."
  };

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
