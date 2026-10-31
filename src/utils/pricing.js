/**
 * OrderRight Promo Pricing Calculations (1st - 10th November Promo)
 *
 * Tiered Pricing for Shirts:
 * - 1 shirt: 55 cedis
 * - 2 shirts: 105 cedis
 * - 3 shirts: 155 cedis
 * - 4 shirts: 205 cedis
 * - 5 or more shirts: 50 cedis each
 */

export const PROMO_DATES = {
  startDate: '1st November',
  endDate: '10th November',
  label: '1st – 10th November Promo'
};

export const SHIRT_PROMO_TIERS = [
  { count: 1, total: 55, perUnit: 55, label: '1 shirt — GH₵ 55' },
  { count: 2, total: 105, perUnit: 52.5, label: '2 shirts — GH₵ 105' },
  { count: 3, total: 155, perUnit: 51.67, label: '3 shirts — GH₵ 155' },
  { count: 4, total: 205, perUnit: 51.25, label: '4 shirts — GH₵ 205' },
  { count: 5, total: 250, perUnit: 50, label: '5+ shirts — GH₵ 50 each' }
];

/**
 * Checks if a cart item is an apparel shirt (non-sash item)
 */
export function isShirtItem(item) {
  if (!item) return false;
  if (item.itemType === 'graduation_sash') return false;
  if (item.itemType === 'dummy' || item.itemType === 'test' || item.isTest) return false;
  return true;
}

/**
 * Calculates promo base price for a given number of shirts
 */
export function getShirtPromoBasePrice(count) {
  const n = Math.max(0, parseInt(count, 10) || 0);
  if (n === 0) return 0;
  if (n === 1) return 55;
  if (n === 2) return 105;
  if (n === 3) return 155;
  if (n === 4) return 205;
  // 5 or more shirts: 50 cedis each
  return n * 50;
}

/**
 * Returns dynamic upsell tip for current shirt count
 */
export function getPromoTierMessage(totalShirtQty) {
  if (totalShirtQty <= 0) {
    return '1st – 10th Nov Promo: Buy 1 for GH₵ 55, 2 for GH₵ 105, 3 for GH₵ 155, 4 for GH₵ 205, 5+ @ GH₵ 50 each!';
  }
  if (totalShirtQty === 1) {
    return 'Add 1 more shirt to get 2 for GH₵ 105 (Save GH₵ 5)!';
  }
  if (totalShirtQty === 2) {
    return '2 shirts for GH₵ 105 applied! (Saved GH₵ 5) • Add 1 more for GH₵ 155!';
  }
  if (totalShirtQty === 3) {
    return '3 shirts for GH₵ 155 applied! (Saved GH₵ 10) • Add 1 more for GH₵ 205!';
  }
  if (totalShirtQty === 4) {
    return '4 shirts for GH₵ 205 applied! (Saved GH₵ 15) • Add 1 more to unlock GH₵ 50/shirt!';
  }
  return `Bulk Promo Tier active: ${totalShirtQty} shirts at GH₵ 50 each!`;
}

/**
 * Calculates comprehensive cart totals including promo breakdown
 */
export function calculateCartSummary(cartItems = []) {
  let totalShirtQty = 0;
  let shirtWeightSurcharge = 0;
  let sashSubtotal = 0;
  let normalShirtSubtotal = 0;

  for (const item of cartItems) {
    const qty = Number(item.quantity) || 1;
    if (isShirtItem(item)) {
      totalShirtQty += qty;
      if (item.weight === '1000GMS') {
        shirtWeightSurcharge += 10 * qty;
      }
      // Standard shirt unit price is 55 cedis (+10 if 1000GMS)
      const baseUnit = (item.weight === '1000GMS' ? 65 : 55);
      normalShirtSubtotal += baseUnit * qty;
    } else {
      sashSubtotal += (Number(item.price) || 0) * qty;
    }
  }

  const promoShirtBase = getShirtPromoBasePrice(totalShirtQty);
  const promoShirtTotal = promoShirtBase + shirtWeightSurcharge;

  // PromoSavings represents the discount from the November Promo bundle tiers
  const promoDiscount = Math.max(0, (55 * totalShirtQty) - promoShirtBase);

  // Overall subtotal to pay
  const subtotal = promoShirtTotal + sashSubtotal;

  return {
    totalShirtQty,
    promoShirtBase,
    shirtWeightSurcharge,
    promoShirtTotal,
    sashSubtotal,
    promoDiscount,
    subtotal,
    originalSubtotal: normalShirtSubtotal + sashSubtotal
  };
}
