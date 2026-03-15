/* =====================================================
   ppm.js
   PPM Dilution Calculator – Logic
   Pure JS, no dependencies
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ppm-dilution-form");
  const calculateBtn = document.getElementById("calculate-ppm-btn");

  const stockStrengthEl = document.getElementById("stock-strength");
  const stockUnitEl = document.getElementById("stock-unit");
  const targetPresetEl = document.getElementById("target-ppm-preset");
  const targetCustomEl = document.getElementById("target-ppm-custom");
  const finalVolumeEl = document.getElementById("final-volume");
  const volumeUnitEl = document.getElementById("volume-unit");

  const resultCard = document.getElementById("ppm-result-card");
  const resultStock = document.getElementById("result-stock");
  const resultWater = document.getElementById("result-water");
  const resultRatio = document.getElementById("result-ratio");
  const formFeedback = document.getElementById("form-feedback");

  /* ---------- Custom target toggle ---------- */
  targetPresetEl.addEventListener("change", () => {
    targetCustomEl.hidden = targetPresetEl.value !== "custom";
    if (targetPresetEl.value !== "custom") {
      targetCustomEl.value = "";
    }
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
    const stockRaw = parseFloat(stockStrengthEl.value);
    const stockUnit = stockUnitEl.value;
    const finalVolumeInput = parseFloat(finalVolumeEl.value);
    const volumeUnit = volumeUnitEl.value;

    /* Resolve target ppm */
    const targetPpm =
      targetPresetEl.value === "custom"
        ? parseFloat(targetCustomEl.value)
        : parseFloat(targetPresetEl.value);

    /* Validation */
    if (isNaN(stockRaw) || isNaN(finalVolumeInput) || isNaN(targetPpm)) {
      resultCard.hidden = true;
      showFeedback("Please fill in all fields before calculating.");
      return;
    }

    if (stockRaw <= 0) {
      resultCard.hidden = true;
      showFeedback("Stock solution strength must be more than 0.");
      return;
    }

    if (finalVolumeInput <= 0) {
      resultCard.hidden = true;
      showFeedback("Final solution volume must be more than 0.");
      return;
    }

    if (targetPpm <= 0) {
      resultCard.hidden = true;
      showFeedback("Target PPM must be more than 0.");
      return;
    }

    /* Convert stock to ppm */
    const stockPpm = stockUnit === "percent" ? stockRaw * 10000 : stockRaw;

    if (targetPpm >= stockPpm) {
      resultCard.hidden = true;
      showFeedback(
        "Target PPM must be lower than the stock strength to calculate a dilution."
      );
      return;
    }

    clearFeedback();

    /* Math */
    const finalVolumeMl = toMilliliters(finalVolumeInput, volumeUnit);
    const stockVolumeMl = (targetPpm / stockPpm) * finalVolumeMl;
    const waterVolumeMl = finalVolumeMl - stockVolumeMl;
    const ratioWater = waterVolumeMl / stockVolumeMl;

    /* Output */
    resultStock.textContent = formatAmount(stockVolumeMl, volumeUnit);
    resultWater.textContent = formatAmount(waterVolumeMl, volumeUnit);
    resultRatio.textContent = "1 : " + Math.round(ratioWater);

    resultCard.hidden = false;
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Reset ---------- */
  form.addEventListener("reset", () => {
    resultCard.hidden = true;
    targetCustomEl.hidden = true;
    clearFeedback();
  });
});
