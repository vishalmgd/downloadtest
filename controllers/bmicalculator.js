const ErrorHandler = require("../errors/ErrorHandler");

/////// SIP Calculator

const bmicalci = (req, res) => {
  res.render("bmipage", {
    title: "SIP calculator page",
    urllist: "",
    bmiValue: "",
    bmiCategory: "",
  });
};

const bmiCalculator = (weight, height, heightinch) => {
  if (weight && height) {
    const bmiValue = weight / (((height / 100) * height) / 100);
    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }
    console.log("height in cm");
    console.log(bmiValue,category);

    return { category, value: bmiValue };
  }
  else if(weight && heightinch){
    let heightincm= heightinch*2.54
    const bmiValue = weight / (((heightincm / 100) * heightincm) / 100);
    

    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }
    console.log("height in inch");

    console.log(bmiValue,category);
    return { category, value: bmiValue };

  }


};

// const bmiCalculator = (weight, height) => {
//   return weight / (height/100 * height/100);
// };

const bmicalcfn = async (req, res) => {
  const height = parseFloat(req.body.height);
  const heightinch = parseFloat(req.body.heightinch);
  const weight = parseFloat(req.body.weight);

  console.log(height, weight, heightinch);

  if (!weight || (!height && !heightinch)|| (weight === 0 && (height || heightinch === 0))) {
    const error = ErrorHandler.validationError(
      "Please provide all the required inputs!"
    );
    return res.status(error.status).json({ message: error.message });
  }
  

  if (heightinch && height) {
    const error = ErrorHandler.validationError(
      "Please provide height either in CM or in INCH not both"
    );
    return res.status(error.status).json({ message: error.message });
  }

  const bmiResult = bmiCalculator(weight, height, heightinch);
  const bmiCategory = bmiResult.category;
  const bmiValue = bmiResult.value;

  res.render("bmipage", {
    title: "BMI calculator",
    bmiCategory,
    weight,
    height,
    bmiValue,
  });
};

module.exports = { bmicalci, bmiCalculator, bmicalcfn };
