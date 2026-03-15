/* =====================================================
   peroxide.js
   Hydrogen Peroxide Dilution Calculator – Logic
   Pure JS, no dependencies
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("peroxide-form");
  const calculateBtn = document.getElementById("calculate-peroxide-btn");

  const stockPresetEl = document.getElementById("stock-preset");
  const stockCustomEl = document.getElementById("stock-custom");
  const targetPresetEl = document.getElementById("target-preset");
  const targetCustomEl = document.getElementById("target-custom");
  const finalVolumeEl = document.getElementById("final-volume");
  const volumeUnitEl = document.getElementById("volume-unit");

  const resultCard = document.getElementById("peroxide-result-card");
  const resultPeroxide = document.getElementById("result-peroxide");
  const resultWater = document.getElementById("result-water");
  const resultRatio = document.getElementById("result-ratio");
  const formFeedback = document.getElementById("form-feedback");

  /* ---------- Custom dropdown toggles ---------- */
  stockPresetEl.addEventListener("change", () => {
    stockCustomEl.hidden = stockPresetEl.value !== "custom";
    if (stockPresetEl.value !== "custom") stockCustomEl.value = "";
  });

  targetPresetEl.addEventListener("change", () => {
    targetCustomEl.hidden = targetPresetEl.value !== "custom";
    if (targetPresetEl.value !== "custom") targetCustomEl.value = "";
  });

  /* ---------- Helpers ---------- */
  function toMilliliters(value, unit) {
    if (unit === "l") return value * 1000;
    if (unit === "gal") return value * 3785.41;
    return value;
  }

  function formatAmount(ml, inputUnit) {
    if (inputUnit === "gal") {
      const gal = ml / 3785.41;
      if (gal < 0.01) return ml.toFixed(1) + " ml";
      return gal.toFixed(3) + " gal";
    }
    if (ml >= 1000) return (ml / 1000).toFixed(2) + " L";
    if (ml < 1) return ml.toFixed(2) + " ml";
    return ml.toFixed(1) + " ml";
  }

  function showFeedback(message) {
    formFeedback.textContent = message;
    formFeedback.hidden = false;
  }

  function clearFeedback() {
    formFeedback.textContent = "";
    formFeedback.hidden = true;
  }

  /* ---------- Calculate ---------- */
  calculateBtn.addEventListener("click", () => {
    const stockPercent =
      stockPresetEl.value === "custom"
        ? parseFloat(stockCustomEl.value)
        : parseFloat(stockPresetEl.value);

    const targetPercent =
      targetPresetEl.value === "custom"
        ? parseFloat(targetCustomEl.value)
        : parseFloat(targetPresetEl.value);

    const finalVolumeInput = parseFloat(finalVolumeEl.value);
    const volumeUnit = volumeUnitEl.value;

    /* Validation */
    if (
      isNaN(stockPercent) ||
      isNaN(targetPercent) ||
      isNaN(finalVolumeInput)
    ) {
      resultCard.hidden = true;
      showFeedback("Please fill in all fields before calculating.");
      return;
    }

    if (stockPercent <= 0) {
      resultCard.hidden = true;
      showFeedback("Stock concentration must be more than 0%.");
      return;
    }

    if (targetPercent <= 0) {
      resultCard.hidden = true;
      showFeedback("Target concentration must be more than 0%.");
      return;
    }

    if (finalVolumeInput <= 0) {
      resultCard.hidden = true;
      showFeedback("Final solution volume must be more than 0.");
      return;
    }

    if (targetPercent === stockPercent) {
      resultCard.hidden = true;
      showFeedback("Stock and target are the same — no dilution needed.");
      return;
    }

    if (targetPercent > stockPercent) {
      resultCard.hidden = true;
      showFeedback(
        "Target concentration must be lower than stock concentration to calculate a dilution.",
      );
      return;
    }

    clearFeedback();

    /* Math */
    const finalVolumeMl = toMilliliters(finalVolumeInput, volumeUnit);
    const peroxideVolumeMl = (targetPercent / stockPercent) * finalVolumeMl;
    const waterVolumeMl = finalVolumeMl - peroxideVolumeMl;
    const ratioWater = waterVolumeMl / peroxideVolumeMl;

    /* Output */
    resultPeroxide.textContent = formatAmount(peroxideVolumeMl, volumeUnit);
    resultWater.textContent = formatAmount(waterVolumeMl, volumeUnit);
    resultRatio.textContent = "1 : " + Math.round(ratioWater);

    resultCard.hidden = false;
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Reset ---------- */
  form.addEventListener("reset", () => {
    resultCard.hidden = true;
    stockCustomEl.hidden = true;
    targetCustomEl.hidden = true;
    clearFeedback();
  });
});
