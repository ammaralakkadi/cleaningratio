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
  const formFeedback = document.getElementById("form-feedback");

  function toMilliliters(value, unit) {
    return unit === "l" ? value * 1000 : value;
  }

  function formatAmount(value) {
    if (value >= 1000) {
      return (value / 1000).toFixed(2) + " L";
    }
    return value.toFixed(0) + " ml";
  }

  function showFeedback(message) {
    formFeedback.textContent = message;
    formFeedback.hidden = false;
  }

  function clearFeedback() {
    formFeedback.textContent = "";
    formFeedback.hidden = true;
  }

  calculateBtn.addEventListener("click", () => {
    const cleanerConcentration = parseFloat(cleanerConcentrationEl.value);
    const finalVolumeInput = parseFloat(finalVolumeEl.value);
    const desiredStrength = parseFloat(desiredStrengthEl.value);
    const volumeUnit = volumeUnitEl.value;

    if (
      isNaN(cleanerConcentration) ||
      isNaN(finalVolumeInput) ||
      isNaN(desiredStrength)
    ) {
      resultCard.hidden = true;
      showFeedback("Please fill in all fields before calculating.");
      return;
    }

    if (cleanerConcentration <= 0) {
      resultCard.hidden = true;
      showFeedback("Cleaner concentration must be more than 0%.");
      return;
    }

    if (finalVolumeInput <= 0) {
      resultCard.hidden = true;
      showFeedback("Final solution volume must be more than 0.");
      return;
    }

    if (desiredStrength <= 0) {
      resultCard.hidden = true;
      showFeedback("Desired final strength must be more than 0%.");
      return;
    }

    if (desiredStrength >= cleanerConcentration) {
      resultCard.hidden = true;
      showFeedback(
        "Desired final strength must be lower than the cleaner concentration to calculate a dilution.",
      );
      return;
    }

    clearFeedback();

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

    clearFeedback();
    resultCard.hidden = false;
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Reset handling */
  form.addEventListener("reset", () => {
    resultCard.hidden = true;
    clearFeedback();
  });
});
