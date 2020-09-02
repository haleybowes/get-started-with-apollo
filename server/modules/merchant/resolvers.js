const { merchants } = require("../../../mockMerchantData");

const resolvers = {
  Query: {
    getMerchant(parent, args, context, info) {
      return merchants.find((merch) => merch.merchant === args.merchant);
    },
    merchants: () => merchants,
    getProduct(parent, args, context, info) {
      return merchants
        .reduce((acc, curr) => acc.concat(curr.products), [])
        .filter((sup) => sup.size === args.size);
    },
  },
};

module.exports = resolvers;
