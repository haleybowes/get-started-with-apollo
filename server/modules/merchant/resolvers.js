const { merchants } = require("../../../mockMerchantData");

const resolvers = {
  Query: {
    getMerchant(parent, args, context, info) {
      // given a merchant, return only merchants of that type
      return merchants.find((merch) => merch.merchant === args.merchant);
    },
    merchants: () => merchants,
    getProduct(parent, args, context, info) {
      // filter a product by size
      return merchants
        .reduce((acc, curr) => acc.concat(curr.products), [])
        .filter((merchant) => merchant.size === args.size);
    },
  },
};

module.exports = resolvers;
