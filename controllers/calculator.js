
const ErrorHandler = require("../errors/ErrorHandler");


function formatNumberWithCommas(x) {
  return x.toString().split('.')[0].length > 3 ? x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3): x.toString();
}



/////// SIP Calculator

const calci = (req, res) => {
  res.render("sipcal", {
    title: "SIP calculator page",
    urllist:"",
    futureValue:"",
    sentence:"",
    futureValues:"",
    investmentDurations:"",
    formatNumberWithCommas:"",
    monthlyInvestment:"",
    annualReturnRate:"",
    inflationRate:"",
    investedAmount:""
  });
};
  
  

  const sipCalculator = (monthlyInvestment, investmentDuration, annualReturnRate,inflationRate) => {

    if (isNaN(inflationRate)) {
      inflationRate = 0;
    }
     
    const monthlyRate = (annualReturnRate - inflationRate) / 12 / 100; // Adjusted for 6% inflation rate
    const totalMonths = investmentDuration * 12;
    let futureValue = 0;
    
    for (let i = 1; i <= totalMonths; i++) {
      futureValue += monthlyInvestment;
      futureValue += futureValue * monthlyRate;
    }
    
    return Math.round(futureValue);
  };
  

  const sipcalcfn = async (req, res) => {
    
    const monthlyInvestment = parseInt(req.body.monthlyInvestment);
    const investmentDuration = parseInt(req.body.investmentDuration);
    const annualReturnRate = parseFloat(req.body.annualReturnRate);
    const inflationRate = parseFloat(req.body.inflationRate);
    
  

    console.log(monthlyInvestment);
    console.log(investmentDuration);
    console.log(annualReturnRate);
    console.log(inflationRate);
  
    if (!monthlyInvestment || !investmentDuration || !annualReturnRate || (monthlyInvestment === 0 && investmentDuration === 0 && annualReturnRate === 0)) {
      const error = ErrorHandler.validationError("Please provide all the required inputs!");
      return res.status(error.status).json({ message: error.message });
    }
    let investedAmountraw = monthlyInvestment * investmentDuration * 12;
    const investedAmount = formatNumberWithCommas(parseFloat(investedAmountraw).toFixed(0));

    const futureValue = sipCalculator(monthlyInvestment, investmentDuration, annualReturnRate,inflationRate);
    console.log(futureValue);
    //////more option///////////////////

    const investmentDurations = [5, 10, 15, 20, 25, 30, 35];
  
    const futureValues = sipCalculatormulti(monthlyInvestment, investmentDurations, annualReturnRate, inflationRate);
    // console.log(futureValues);
    

    //////////////////////////////
   
    const formattedValue = formatNumberWithCommas(parseFloat(futureValue).toFixed(0));
    const sentence = `${formattedValue}  in ${investmentDuration} Years`;

    console.log(sentence);
  
    res.render("sipcal", { title: "SIP calculator", sentence,futureValues,investmentDurations,formatNumberWithCommas,monthlyInvestment,annualReturnRate,inflationRate,investedAmount});
  };


  const sipCalculatormulti = (monthlyInvestment, investmentDurations, annualReturnRate, inflationRate) => {
    if (isNaN(inflationRate)) {
      inflationRate = 0;
    }
  
    const monthlyRate = (annualReturnRate - inflationRate) / 12 / 100;
    const futureValues = [];
  
    for (let i = 0; i < investmentDurations.length; i++) {
      const investmentDuration = investmentDurations[i];
      const totalMonths = investmentDuration * 12;
      let futureValue = 0;
  
      for (let j = 1; j <= totalMonths; j++) {
        futureValue += monthlyInvestment;
        futureValue += futureValue * monthlyRate;
      }
  
      futureValues.push(Math.round(futureValue));
    }
  
    return futureValues;
  };
  


  ////////LUMPSUM Calculation





  const LumpsumCalculator = (req, res) => {
    res.render("lumpcal", {
      title: "SIP calculator page",
      urllist:"",
      futureValue:"",
      sentence:"",
      futureValues:"",
      investmentDurations:"",
      formatNumberWithCommas:"",
    
      annualReturnRate:"",
      inflationRate:"",
      investedAmount:""
    });
  };


  const LumpsumCalculatorfn = (investmentAmount, investmentDuration, annualReturnRate, inflationRate) => {
    if (isNaN(inflationRate)) {
      inflationRate = 0;
    }
  
    const adjustedAnnualReturnRate = annualReturnRate - inflationRate;
    const compoundedReturnRate = 1 + adjustedAnnualReturnRate / 100;
    const futureValue = investmentAmount * Math.pow(compoundedReturnRate, investmentDuration);
    
    return Math.round(futureValue);
  };
  


  const Lumsumpcalcfn = async (req, res) => {
    
    const TotalInvestment = parseInt(req.body.monthlyInvestment);
    const investmentDuration = parseInt(req.body.investmentDuration);
    const annualReturnRate = parseFloat(req.body.annualReturnRate);
    const inflationRate = parseFloat(req.body.inflationRate);
    
  

    console.log(TotalInvestment);
    console.log(investmentDuration);
    console.log(annualReturnRate);
    console.log(inflationRate);
  
    if (!TotalInvestment || !investmentDuration || !annualReturnRate || (TotalInvestment === 0 && investmentDuration === 0 && annualReturnRate === 0)) {
      const error = ErrorHandler.validationError("Please provide all the required inputs!");
      return res.status(error.status).json({ message: error.message });
    }
  
    const investedAmount = formatNumberWithCommas(parseFloat(TotalInvestment).toFixed(0));

    const lumsumfutureValue = LumpsumCalculatorfn(TotalInvestment, investmentDuration, annualReturnRate,inflationRate);
    console.log(lumsumfutureValue);
    //////more option///////////////////

    const investmentDurations = [5, 10, 15, 20, 25, 30, 35];
  
    const futureValues = lumpSumCalculatormulti(TotalInvestment, investmentDurations, annualReturnRate, inflationRate);
    // console.log(futureValues);
    

    //////////////////////////////
   
    const formattedValue = formatNumberWithCommas(parseFloat(lumsumfutureValue).toFixed(0));
    const sentence = `${formattedValue}  in ${investmentDuration} Years`;

    console.log(sentence);
  
    res.render("lumpcal", { title: "SIP calculator", sentence,futureValues,investmentDurations,formatNumberWithCommas,annualReturnRate,inflationRate,investedAmount});
  };

  
  const lumpSumCalculatormulti = (investmentAmount, investmentDurations, annualReturnRate, inflationRate) => {
    if (isNaN(inflationRate)) {
      inflationRate = 0;
    }
  
    const adjustedAnnualReturnRate = annualReturnRate - inflationRate;
    const compoundedReturnRate = 1 + adjustedAnnualReturnRate / 100;
    const futureValues = [];
  
    for (let i = 0; i < investmentDurations.length; i++) {
      const investmentDuration = investmentDurations[i];
      const futureValue = investmentAmount * Math.pow(compoundedReturnRate, investmentDuration);
      futureValues.push(Math.round(futureValue));
    }
  
    return futureValues;
  };
  

  ///////////



  /////More option graph///
  



//////



  
  module.exports = { calci
    , sipCalculator, sipcalcfn,LumpsumCalculator,LumpsumCalculatorfn,Lumsumpcalcfn 
 };


