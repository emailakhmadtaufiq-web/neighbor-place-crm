/**
 * Neighbor Place CRM
 * Code.gs
 * Production v1.0
 */

function doGet() {
  return HtmlService
    .createTemplateFromFile("index")
    .evaluate()
    .setTitle("Neighbor Place CRM");
}

function include(filename) {
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}
