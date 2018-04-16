package com.keppel.consumer.utils;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.keppel.consumer.controller.KeppelConsumerController;
import com.keppel.consumer.model.EMAFS;

public class EMAFactSheet {
	public void emaFactSheetValues(EMAFS emafs) {

		final Logger log = LoggerFactory.getLogger(KeppelConsumerController.class);

		String pdfDotAmount = emafs.getPdfDotAmount();
		String pdfFppAmount = emafs.getPdfFppAmount();
		String pdfTier1Amount = emafs.getPdfTier1Amount();
		String pdfPeakValueT1 = emafs.getPdfPeakValueT1();
		String pdfTier3Amount = emafs.getPdfTier3Amount();
		String pdfPeakValueT3 = emafs.getPdfPeakValueT3();
		//String selectedPlanMap = null;
		String selectedRPlan = null;

		// private String unitNoVal;

		//HashMap<String, HashMap<String, String>> activePlanMap = null;
		//HashMap<String, HashMap<String, String>> inActivePlanMap = null;
	//	HashMap<String, String> productsMap = new HashMap<String, String>();
	//	HashMap<String, String> tiersMap = new HashMap<String, String>();
	//	String productMapKeyVal = null;

		String subscriptionBaseSizeDisValue = null;
		String subscriptionBasePriceDisValue = null;
		String subscriptionBlockSizeDisValue = null;
		String subscriptionBlockPriceDisValue = null;
		String subscriptionMaxBlocksDisValue = null;

		String tier1Amount = null;
		String tier2Amount = null;
		String tier3Amount = null;
		String productName = null;
		boolean activePlan = false;

		// New Code
		if (activePlan) {
			// String productName = getRPVersion(selectedRPlan, "product", activePlanMap);
			//log.info("planName: " + selectedRPlan + "::activePlanMap size: " + activePlanMap.size());
			// if (productsMap.containsKey(productName))
			// productMapKeyVal = productsMap.get(productName);
			// log.info(":: Product Name:: " + productMapKeyVal);
			if (productName.equals("DOT")) {
				log.info(":: Product Name:: DOT");
				// String tier1Amount = getRPVersion(selectedRPlan, "t1", activePlanMap);
				// String tier2Amount = getRPVersion(selectedRPlan, "t2", activePlanMap);
				// String tier3Amount = getRPVersion(selectedRPlan, "t3", activePlanMap);
				if (tier1Amount.equals(tier2Amount) && tier1Amount.equals(tier3Amount)) {
					double dotAmountDbl = new Double(tier1Amount);
					// String dotAmount = String.valueOf(dotAmountDbl);
					String dotAmount = CommonUtils.round(dotAmountDbl);
					pdfDotAmount = dotAmount;
					log.info("dotAmount in DOT--> " + dotAmount);

				}
				if (tier1Amount.equals(tier2Amount) && !tier2Amount.equals(tier3Amount)) {
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
					log.info("if t1 and t2 are equal tier1Amount DOT --> " + tier1Amount);
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);

					String peakValueT1 = null, peakValueT3 = null;
					//if (tiersMap.containsKey("T1"))
					//	peakValueT1 = tiersMap.get("T1");
					//if (tiersMap.containsKey("T3"))
					//	peakValueT3 = tiersMap.get("T3");
					log.info("if t1 and t2 are equal peakValue DOT " + peakValueT1);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
				if (tier2Amount.equals(tier3Amount) && !tier1Amount.equals(tier2Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
					log.info("if t2 and t3 are equal tier3Amount DOT--> " + tier3Amount);
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
					log.info("if t2 and t3 are equal tier1Amount--> " + tier1Amount);
					//if (tiersMap.containsKey("T3"))
					//	peakValueT3 = tiersMap.get("T3");
					//if (tiersMap.containsKey("T1"))
					//	peakValueT1 = tiersMap.get("T1");
					log.info("if t2 and t3 are equal peakValue DOT" + peakValueT3);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
			} else if (productName.equals("FIX")) {
				log.info(":: Product Name:: FIX");
				// String tier1Amount = getRPVersion(selectedRPlan, "t1", activePlanMap);
				// String tier2Amount = getRPVersion(selectedRPlan, "t2", activePlanMap);
				// String tier3Amount = getRPVersion(selectedRPlan, "t3", activePlanMap);
				log.info("tier amounts in FIX --->tier1Amount " + tier1Amount + "  tier2Amount--> " + tier2Amount
						+ "  tier3Amount::: " + tier2Amount);
				if (tier1Amount.equals(tier2Amount) && tier1Amount.equals(tier3Amount)) {
					double dotAmountDbl = new Double(tier1Amount) * 100;
					// String fppAmount = String.valueOf(dotAmountDbl);
					String fppAmount = CommonUtils.round(dotAmountDbl);
					pdfFppAmount = fppAmount;
					log.info("fppAmount--> " + fppAmount);

				}
				if (tier1Amount.equals(tier2Amount) && !tier2Amount.equals(tier3Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
					log.info("if t1 and t2 are equal in FIX tier1Amount--> " + tier1Amount);
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
//					log.info("if t2 and t3 are equal FIX tier3Amount--> " + tier3Amount);
//					if (tiersMap.containsKey("T1"))
//						peakValueT1 = tiersMap.get("T1");
//					if (tiersMap.containsKey("T3"))
//						peakValueT3 = tiersMap.get("T3");
					log.info("if t2 and t3 are equal peakValue in FIX" + peakValueT3);
					log.info("if t1 and t2 are equal peakValue in FIX" + peakValueT1);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
				if (tier2Amount.equals(tier3Amount) && !tier1Amount.equals(tier2Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
					log.info("if t2 and t3 are equal tier3Amount--> " + tier3Amount);
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
//					log.info("if t1 and t2 are equal tier1Amount in FPP--> " + tier1Amount);
//					if (tiersMap.containsKey("T3"))
//						peakValueT3 = tiersMap.get("T3");
//					if (tiersMap.containsKey("T1"))
//						peakValueT1 = tiersMap.get("T1");
					log.info("if t2 and t3 are equal peakValue " + peakValueT3);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
			} else if (productName.equals("POOL")) {
				//String adminFee = getRPVersion(selectedRPlan, "adminFee", activePlanMap);
			} else if (productName.equals("SUB")) {
//				subscriptionBaseSizeDisValue = getRPVersion(selectedRPlan, "subscriptionBaseSize", activePlanMap);
//				subscriptionBasePriceDisValue = getRPVersion(selectedRPlan, "subscriptionBasePrice", activePlanMap);
//				subscriptionBlockSizeDisValue = getRPVersion(selectedRPlan, "subscriptionBlockSize", activePlanMap);
//				subscriptionBlockPriceDisValue = getRPVersion(selectedRPlan, "subscriptionBlockPrice", activePlanMap);
//				subscriptionMaxBlocksDisValue = getRPVersion(selectedRPlan, "subscriptionMaxBlocks", activePlanMap);

			}
		} else {
			//String productName = getRPVersion(selectedRPlan, "product", inActivePlanMap);
			//log.info("planName: " + selectedRPlan + "::activePlanMap size: " + inActivePlanMap.size());
//			if (productsMap.containsKey(productName))
//				productMapKeyVal = productsMap.get(productName);
		//	log.info(":: Product Name:: " + productMapKeyVal);
			if (productName.equals("DOT")) {
				log.info(":: Product Name:: InActive Map DOT");
			//	String tier1Amount = getRPVersion(selectedRPlan, "t1", inActivePlanMap);
			//	String tier2Amount = getRPVersion(selectedRPlan, "t2", inActivePlanMap);
			//	String tier3Amount = getRPVersion(selectedRPlan, "t3", inActivePlanMap);
				if (tier1Amount.equals(tier2Amount) && tier1Amount.equals(tier3Amount)) {
					double dotAmountDbl = new Double(tier1Amount);
					// String dotAmount = String.valueOf(dotAmountDbl);
					String dotAmount = CommonUtils.round(dotAmountDbl);
					log.info("dotAmount--> " + dotAmount);
					pdfDotAmount = dotAmount;
				}
				if (tier1Amount.equals(tier2Amount) && !tier2Amount.equals(tier3Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
					log.info("if t1 and t2 are equal tier1Amount InActive Map DOT--> " + tier1Amount);
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
//					log.info("if t2 and t3 are equal tier3Amount--> " + tier3Amount);
//					if (tiersMap.containsKey("T1"))
//						peakValueT1 = tiersMap.get("T1");
//					if (tiersMap.containsKey("T3"))
//						peakValueT3 = tiersMap.get("T3");
					log.info("if t1 and t2 are equal peakValue InActive Map DOT" + peakValueT1);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
				if (tier2Amount.equals(tier3Amount) && !tier1Amount.equals(tier2Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
					log.info("if t2 and t3 are equal tier3Amount InActive Map DOT--> " + tier3Amount);
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
//					log.info("if t1 and t2 are equal tier1Amount InActive Map DOT--> " + tier1Amount);
//					if (tiersMap.containsKey("T3"))
//						peakValueT3 = tiersMap.get("T3");
//					if (tiersMap.containsKey("T1"))
//						peakValueT1 = tiersMap.get("T1");
					log.info("if t2 and t3 are equal peakValue InActive Map DOT" + peakValueT3);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
			} else if (productName.equals("FIX")) {
				//String tier1Amount = getRPVersion(selectedRPlan, "t1", inActivePlanMap);
				//String tier2Amount = getRPVersion(selectedRPlan, "t2", inActivePlanMap);
				//String tier3Amount = getRPVersion(selectedRPlan, "t3", inActivePlanMap);
				if (tier1Amount.equals(tier2Amount) && tier1Amount.equals(tier3Amount)) {
					double dotAmountDbl = new Double(tier1Amount) * 100;
					// String fppAmount = String.valueOf(dotAmountDbl);
					String fppAmount = CommonUtils.round(dotAmountDbl);
					pdfFppAmount = fppAmount;
					log.info("fppAmount--> " + fppAmount);

				}
				if (tier1Amount.equals(tier2Amount) && !tier2Amount.equals(tier3Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
					log.info("if t1 and t2 are equal tier1Amount InActive Map FIX--> " + tier1Amount);
//					if (tiersMap.containsKey("T1"))
//						peakValueT1 = tiersMap.get("T1");
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
					log.info("if t2 and t3 are equal tier3Amount InActive Map FIX--> " + tier3Amount);
//					if (tiersMap.containsKey("T3"))
//						peakValueT3 = tiersMap.get("T3");
					log.info("if t1 and t2 are equal peakValue InActive Map FIX" + peakValueT1);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
				if (tier2Amount.equals(tier3Amount) && !tier1Amount.equals(tier2Amount)) {
					String peakValueT1 = null, peakValueT3 = null;
					double tier3AmountDbl = new Double(tier3Amount) * 100;
					// tier3Amount = String.valueOf(tier3AmountDbl);
					tier3Amount = CommonUtils.round(tier3AmountDbl);
					log.info("if t2 and t3 are equal tier3Amount InActive Map FIX--> " + tier3Amount);
//					if (tiersMap.containsKey("T3"))
//						peakValueT3 = tiersMap.get("T3");
					double tier1AmountDbl = new Double(tier1Amount) * 100;
					// tier1Amount = String.valueOf(tier1AmountDbl);
					tier1Amount = CommonUtils.round(tier1AmountDbl);
					log.info("if t1 and t2 are equal tier1Amount InActive Map FIX--> " + tier1Amount);
//					if (tiersMap.containsKey("T1"))
//						peakValueT1 = tiersMap.get("T1");
					log.info("if t2 and t3 are equal peakValue InActive Map FIX" + peakValueT3);
					peakValueT1 = " 07:00AM To 11:00PM";
					peakValueT3 = " 11:00PM To 07:00AM";
					pdfTier1Amount = tier1Amount;
					pdfPeakValueT1 = peakValueT1;
					pdfTier3Amount = tier3Amount;
					pdfPeakValueT3 = peakValueT3;

				}
			} else if (productName.equals("POOL")) {
				//String adminFee = getRPVersion(selectedRPlan, "adminFee", inActivePlanMap);
			} else if (productName.equals("SUB")) {
//				subscriptionBaseSizeDisValue = getRPVersion(selectedRPlan, "subscriptionBaseSize", inActivePlanMap);
//				subscriptionBasePriceDisValue = getRPVersion(selectedRPlan, "subscriptionBasePrice", inActivePlanMap);
//				subscriptionBlockSizeDisValue = getRPVersion(selectedRPlan, "subscriptionBlockSize", inActivePlanMap);
//				subscriptionBlockPriceDisValue = getRPVersion(selectedRPlan, "subscriptionBlockPrice", inActivePlanMap);
//				subscriptionMaxBlocksDisValue = getRPVersion(selectedRPlan, "subscriptionMaxBlocks", inActivePlanMap);

			}
		}
	}

	public String getRPVersiona(String planName, String internalKeyName,
			HashMap<String, HashMap<String, String>> mapName) {

		String interMapKeyVal = null;
		// log.info("Strat - getRPVersion---");
		// log.info("planName: " + planName + "::internalKeyName: " + internalKeyName +
		// "::main map size: "
		// + mapName.size());
		if (mapName.containsKey(planName)) {

			HashMap<String, String> internalMap = mapName.get(planName);

			if (internalMap != null && internalMap.size() > 0) {
				if (internalMap.containsKey(internalKeyName)) {
					interMapKeyVal = internalMap.get(internalKeyName);
				} // end of
			}
			// log.info("getRPVersion interMapKeyVal: " + interMapKeyVal);
			// log.info("End - getRPVersion---");

		}
		return interMapKeyVal;
	}
}
