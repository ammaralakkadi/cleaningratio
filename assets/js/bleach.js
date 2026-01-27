/* =====================================================
   bleach.js
   Bleach Dilution Calculator – Logic
   Safety-first, pure JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate-bleach-btn");

  const purposeEl = document.getElementById("bleach-purpose");
  const concentrationEl = document.getElementById("bleach-concentration");
  const waterVolumeEl = document.getElementById("water-volume");
  const waterUnitEl = document.getElementById("water-unit");

  const resultCard = document.getElementById("bleach-result-card");
  const resultBleach = document.getElementById("result-bleach");
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

  /* Target available chlorine percentages (approx, conservative) */
  const TARGETS = {
    surface: 0.1, // general disinfection
    bathroom: 0.2, // stronger cleaning
    mold: 0.5, // mold treatment (not porous surfaces)
  };

  calculateBtn.addEventListener("click", () => {
    const purpose = purposeEl.value;
    const bleachConcentration = parseFloat(concentrationEl.value);
    const waterVolumeInput = parseFloat(waterVolumeEl.value);
    const waterUnit = waterUnitEl.value;

    if (
      !TARGETS[purpose] ||
      isNaN(bleachConcentration) ||
      isNaN(waterVolumeInput) ||
      bleachConcentration <= 0 ||
      waterVolumeInput <= 0
    ) {
      resultCard.hidden = true;
      return;
    }

    const targetStrength = TARGETS[purpose];
    const waterVolumeMl = toMilliliters(waterVolumeInput, waterUnit);

    /* Dilution formula:
       bleach_volume = (target_strength / bleach_concentration) * total_volume
       total_volume ≈ water + bleach (bleach volume is small; safe approximation)
    */
    const bleachVolume = (targetStrength / bleachConcentration) * waterVolumeMl;
    const totalVolume = waterVolumeMl + bleachVolume;
    const ratioWater = waterVolumeMl / bleachVolume;

    resultBleach.textContent = formatAmount(bleachVolume);
    resultWater.textContent = formatAmount(waterVolumeMl);
    resultRatio.textContent = `1 : ${ratioWater.toFixed(0)}`;

    resultCard.hidden = false;
  });
});
