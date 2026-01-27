/* =====================================================
   essential-oil.js
   Essential Oil Ratio Calculator – Logic
   Conservative, household-safe defaults
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate-oil-btn");

  const bottleSizeEl = document.getElementById("bottle-size");
  const bottleUnitEl = document.getElementById("bottle-unit");
  const useCaseEl = document.getElementById("use-case");
  const sensitivityEl = document.getElementById("sensitivity");
  const strengthEl = document.getElementById("strength");

  const resultCard = document.getElementById("oil-result-card");
  const resultDrops = document.getElementById("result-drops");
  const resultDropRatio = document.getElementById("result-drop-ratio");

  function toMilliliters(value, unit) {
    return unit === "l" ? value * 1000 : value;
  }

  /* Base drops per 100 ml (conservative defaults) */
  const BASE_DROPS = {
    "cleaning-spray": 10,
    "air-freshener": 12,
    laundry: 6,
  };

  const STRENGTH_MULTIPLIER = {
    light: 0.7,
    normal: 1,
    strong: 1.3,
  };

  const SENSITIVITY_MULTIPLIER = {
    normal: 1,
    sensitive: 0.6,
  };

  calculateBtn.addEventListener("click", () => {
    const bottleSizeInput = parseFloat(bottleSizeEl.value);
    const bottleUnit = bottleUnitEl.value;
    const useCase = useCaseEl.value;
    const sensitivity = sensitivityEl.value;
    const strength = strengthEl.value;

    if (
      isNaN(bottleSizeInput) ||
      bottleSizeInput <= 0 ||
      !BASE_DROPS[useCase] ||
      !STRENGTH_MULTIPLIER[strength] ||
      !SENSITIVITY_MULTIPLIER[sensitivity]
    ) {
      resultCard.hidden = true;
      return;
    }

    const bottleSizeMl = toMilliliters(bottleSizeInput, bottleUnit);

    const baseDrops = BASE_DROPS[useCase];
    const totalDrops =
      (bottleSizeMl / 100) *
      baseDrops *
      STRENGTH_MULTIPLIER[strength] *
      SENSITIVITY_MULTIPLIER[sensitivity];

    const roundedDrops = Math.max(1, Math.round(totalDrops));
    const ratio = Math.round(bottleSizeMl / roundedDrops);

    resultDrops.textContent = `${roundedDrops} drops`;
    resultDropRatio.textContent = `1 drop per ${ratio} ml`;

    resultCard.hidden = false;
  });
});
