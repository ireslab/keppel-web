export class localJSON {
    dwellingTypes = {
        "dwelling_type": ["HDB1/2", "HDB3", "HDB4", "HDB5/EA", "Condominium", "Landed Property", "Others"],
        "payment_method": ["GIRO", "IDDA", "RECUR", "OTH"],
        "id_types": ["FIN", "BLUE", "BLUE-IC"]
    }//['HDB 1/2','HDB 3','HDB 4','HDB 5','Condominium','Landed Property','Others']
    // dwlTypePlans  = [  
    //                   {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},  
    //                   {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},
    //                   {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},  
    //                   {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},  
    //                   {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},  
    //                   {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},  
    //                   {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]},  
    //                   {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":["24 Months","Peak Rate (7am to 11pm): $0.1/kwh","Off Peak Rate(11pm to 7am): $0.01/kwh","All charges are absorbed","Consumption is loss adjusted"]}  
    //                ]
    dwlTypePlans = [
        {
            plan: "DOT12",
            version: "1",
            product: "DOT-TLF",
            startDate: "2017-11-29",
            contractDuration: 12,
            benefits: "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
            details: "Allows Greater Savings",
            chargeType: "%",
            t1: "19",
            t2: "19",
            t3: "19",
            mssBillingCollection: "false",
            mssBasicCharges: "false",
            mssMeterReadingDataManagement: "false",
            marketDevelopmentSystemCharge: "false",
            retailSettlementUplift: "false",
            ami1Phase: "true",
            ami3Phase: "true",
            emcAdminFinal: "false",
            posAdminFinal: "false",
            monthlyEnergyUpliftChargeFinal: "false",
            allocatedRegulationChargeFinal: "false",
            usep: "false",
            heuc: "false",
            vestingCharge: "false",
        },{
            plan: "FIXED 24",
            version: "1",
            product: "DOT-TLF",
            startDate: "2017-11-29",
            contractDuration: 12,
            benefits: "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
            details: "Allows Greater Savings",
            chargeType: "%",
            t1: "19",
            t2: "19",
            t3: "19",
            mssBillingCollection: "false",
            mssBasicCharges: "false",
            mssMeterReadingDataManagement: "false",
            marketDevelopmentSystemCharge: "false",
            retailSettlementUplift: "false",
            ami1Phase: "true",
            ami3Phase: "true",
            emcAdminFinal: "false",
            posAdminFinal: "false",
            monthlyEnergyUpliftChargeFinal: "false",
            allocatedRegulationChargeFinal: "false",
            usep: "false",
            heuc: "false",
            vestingCharge: "false",
        },{
            plan: "FIXED",
            version: "1",
            product: "DOT-TLF",
            startDate: "2017-11-29",
            contractDuration: 12,
            benefits: "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
            details: "Allows Greater Savings",
            chargeType: "%",
            t1: "19",
            t2: "19",
            t3: "19",
            mssBillingCollection: "false",
            mssBasicCharges: "false",
            mssMeterReadingDataManagement: "false",
            marketDevelopmentSystemCharge: "false",
            retailSettlementUplift: "false",
            ami1Phase: "true",
            ami3Phase: "true",
            emcAdminFinal: "false",
            posAdminFinal: "false",
            monthlyEnergyUpliftChargeFinal: "false",
            allocatedRegulationChargeFinal: "false",
            usep: "false",
            heuc: "false",
            vestingCharge: "false",
        },{
            plan: "DOT24",
            version: "1",
            product: "DOT-TLF",
            startDate: "2017-11-29",
            contractDuration: 12,
            benefits: "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
            details: "Allows Greater Savings",
            chargeType: "%",
            t1: "19",
            t2: "19",
            t3: "19",
            mssBillingCollection: "false",
            mssBasicCharges: "false",
            mssMeterReadingDataManagement: "false",
            marketDevelopmentSystemCharge: "false",
            retailSettlementUplift: "false",
            ami1Phase: "true",
            ami3Phase: "true",
            emcAdminFinal: "false",
            posAdminFinal: "false",
            monthlyEnergyUpliftChargeFinal: "false",
            allocatedRegulationChargeFinal: "false",
            usep: "false",
            heuc: "false",
            vestingCharge: "false",
        },{
            plan: "DOT+12",
            version: "1",
            product: "DOT-TLF",
            startDate: "2017-11-29",
            contractDuration: 12,
            benefits: "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
            details: "Allows Greater Savings",
            chargeType: "%",
            t1: "19",
            t2: "19",
            t3: "19",
            mssBillingCollection: "false",
            mssBasicCharges: "false",
            mssMeterReadingDataManagement: "false",
            marketDevelopmentSystemCharge: "false",
            retailSettlementUplift: "false",
            ami1Phase: "true",
            ami3Phase: "true",
            emcAdminFinal: "false",
            posAdminFinal: "false",
            monthlyEnergyUpliftChargeFinal: "false",
            allocatedRegulationChargeFinal: "false",
            usep: "false",
            heuc: "false",
            vestingCharge: "false",
        },{
            plan: "DOT-12",
            version: "1",
            product: "DOT-TLF",
            startDate: "2017-11-29",
            contractDuration: 12,
            benefits: "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
            details: "Allows Greater Savings",
            chargeType: "%",
            t1: "19",
            t2: "19",
            t3: "19",
            mssBillingCollection: "false",
            mssBasicCharges: "false",
            mssMeterReadingDataManagement: "false",
            marketDevelopmentSystemCharge: "false",
            retailSettlementUplift: "false",
            ami1Phase: "true",
            ami3Phase: "true",
            emcAdminFinal: "false",
            posAdminFinal: "false",
            monthlyEnergyUpliftChargeFinal: "false",
            allocatedRegulationChargeFinal: "false",
            usep: "false",
            heuc: "false",
            vestingCharge: "false",
        }
    ]
    recommPlan = [
        {
            plan:'DOT12',
            premiseType: 'HDB1/2',
            recommendedPlan:true
        }, {
            plan:'DOT+12',
            premiseType: 'HDB1/2',
            recommendedPlan:false
        }, {
            plan:'DOT-12',
            premiseType: 'HDB1/2',
            recommendedPlan:false
        }, {
            plan:'FIXED',
            premiseType: 'HDB1/2',
            recommendedPlan:true
        }, {
            plan:'FIXED 24',
            premiseType: 'HDB1/2',
            recommendedPlan:false
        }, {
            plan:'DOT12',
            premiseType: 'HDB1/2',
            recommendedPlan:true
        }, {
            plan:'DOT+12',
            premiseType: 'HDB1/2',
            recommendedPlan:false
        }, {
            plan:'DOT-12',
            premiseType: 'HDB3',
            recommendedPlan:false
        }, {
            plan:'FIXED',
            premiseType: 'HDB3',
            recommendedPlan:true
        }, {
            plan:'FIXED 24',
            premiseType: 'HDB3',
            recommendedPlan:false
        }, {
            plan:'FIXED 24',
            premiseType: 'HDB4',
            recommendedPlan:false
        }, {
            plan:'DOT12',
            premiseType: 'HDB4',
            recommendedPlan:true
        }, {
            plan:'DOT+12',
            premiseType: 'HDB4',
            recommendedPlan:false
        }, {
            plan:'DOT-12',
            premiseType: 'HDB4',
            recommendedPlan:false
        }
    ]




    optionalPlans = [
        { "planName": "Paper Bill", "charge": "(+$1/bill)" },
        { "planName": "VAS #1", "charge": "" },
        { "planName": "VAS #2", "charge": "" }
    ]
}