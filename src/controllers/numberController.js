const { fetchNumber, calculateAverage } = require("../services/numberService");
const WINDOW_SIZE = 10;
let numbersWindow = [];

const getNumberHandler = async (req, res) => {
  const numberid = req.params.numberid;
  const validIds = ["p", "f", "e", "r"];

  if (!validIds.includes(numberid)) {
    return res.status(400).send({ error: "Invalid number ID" });
  }

  let fetchedNumber;
  try {
    fetchedNumber = await fetchNumber(numberid);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }

  const prevState = [...numbersWindow];

  if (!numbersWindow.includes(fetchedNumber)) {
    if (numbersWindow.length >= WINDOW_SIZE) {
      numbersWindow.shift();
    }
    numbersWindow.push(fetchedNumber);
  }

  const average = calculateAverage(numbersWindow);

  res.json({
    windowPrevState: prevState,
    windowCurrState: numbersWindow,
    numbers: numbersWindow,
    average: average,
  });
};

module.exports = { getNumberHandler };
