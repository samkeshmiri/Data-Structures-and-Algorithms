const samplePayload = `{"lastUpdateId": 45902094,"bids": [["181.90000000", "0.06400000"],["181.85000000", "3.32800000"],["181.84000000", "6.23400000"]],"asks": [["182.11000000", "6.13600000"],["182.14000000", "3.02000000"],["182.23000000", "0.74700000"]]}`;

type AssetPairDepth = {
  lastUpdateId: number;
  bids: string[][];
  asks: string[][];
};

function parseMessage(message: string) {
  let jsonMessage;

  try {
    jsonMessage = JSON.parse(message);
  } catch (error) {
    // assert error
    console.warn("Failed to parse JSON message");
    throw error;
  }

  // parse the JSON message using a schema parser
  const parseResult = jsonMessage as AssetPairDepth;
  if (parseResult.lastUpdateId == undefined) {
    throw new Error("Failed parsing market data");
  }

  // map the string values to numerical values
  return parseResult;
}

function calculateSpread(assetPairDepth: AssetPairDepth) {
  const bestAskPrice = assetPairDepth.asks[0][0];
  const bestBidPrice = assetPairDepth.bids[0][0];
  return Number(bestAskPrice) - Number(bestBidPrice);
}

const parseResult = parseMessage(samplePayload);
console.log(calculateSpread(parseResult));

