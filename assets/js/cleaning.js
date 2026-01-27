/* =====================================================
   cleaning.js
   Cleaning Dilution Calculator – Logic
   Pure JS, no dependencies
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cleaning-dilution-form");
  const calculateBtn = document.getElementById("calculate-btn");

  const cleanerConcentrationEl = document.getElementById(
    "cleaner-concentration",
  );
  const finalVolumeEl = document.getElementById("final-volume");
  const volumeUnitEl = document.getElementById("volume-unit");
  const desiredStrengthEl = document.getElementById("desired-strength");

  const resultCard = document.getElementById("result-card");
  const resultCleaner = document.getElementById("result-cleaner");
  const resultWater = document.getElementById("result-water");
  const resultRatio = document.getElementById("result-ratio");

  function toMilliliters(value, unit) {
    return unit === "l" ? value * 1000 : value;
  }

  function formatAmount(value) {
    if (value >= 1000) {
      return (value / 1000).toFixed(2) + " L";
    }
    return value.toFixed(0) + " ml";
  }

  calculateBtn.addEventListener("click", () => {
    const cleanerConcentration = parseFloat(cleanerConcentrationEl.value);
    const finalVolumeInput = parseFloat(finalVolumeEl.value);
    const desiredStrength = parseFloat(desiredStrengthEl.value);
    const volumeUnit = volumeUnitEl.value;

    if (
      isNaN(cleanerConcentration) ||
      isNaN(finalVolumeInput) ||
      isNaN(desiredStrength) ||
      cleanerConcentration <= 0 ||
      desiredStrength <= 0 ||
      desiredStrength >= cleanerConcentration
    ) {
      resultCard.hidden = true;
      return;
    }

    const finalVolumeMl = toMilliliters(finalVolumeInput, volumeUnit);

    /* Dilution formula:
       cleaner_volume = (desired_strength / cleaner_concentration) * final_volume
    */
    const cleanerVolume =
      (desiredStrength / cleanerConcentration) * finalVolumeMl;
    const waterVolume = finalVolumeMl - cleanerVolume;

    const ratioWater = waterVolume / cleanerVolume;

    resultCleaner.textContent = formatAmount(cleanerVolume);
    resultWater.textContent = formatAmount(waterVolume);
    resultRatio.textContent = `1 : ${ratioWater.toFixed(1)}`;

    resultCard.hidden = false;
  });

  /* Reset handling */
  form.addEventListener("reset", () => {
    resultCard.hidden = true;
  });
});
