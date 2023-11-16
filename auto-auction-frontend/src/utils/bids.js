export const getBidIncrement = (currentBid) => {
  if (currentBid >= 0 && currentBid < 5) {
    return 1;
  } else if (currentBid >= 5 && currentBid < 40) {
    return 5;
  } else if (currentBid >= 40 && currentBid < 100) {
    return 10;
  } else if (currentBid >= 100 && currentBid < 1000) {
    return 25;
  } else if (currentBid >= 1000 && currentBid < 5000) {
    return 50;
  } else if (currentBid >= 5000 && currentBid < 25000) {
    return 100;
  } else if (currentBid >= 25000 && currentBid < 50000) {
    return 250;
  } else if (currentBid >= 50000 && currentBid < 100000) {
    return 500;
  }
  return 1000;
};

export const getLastBid = (data) => {
  if (!data.bids.length) {
    return 0;
  } else {
    return data.bids[data.bids.length - 1].bidCost;
  }
};

export const getMinBid = (data) => {
  const lastBid = getLastBid(data);
  if (lastBid === 0) {
    return data.minBid;
  }
  const minBid = lastBid + getBidIncrement(lastBid);
  return minBid;
};
