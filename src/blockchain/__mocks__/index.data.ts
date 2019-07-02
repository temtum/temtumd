const genesis = {
  index: 0,
  hash: '1b003468ce8fa8c6f9162540521f9a30f039abf30a6b9d52c024ddb90cb0101f',
  previousHash: '0',
  timestamp: 1465154705,
  beaconIndex: 327359,
  beaconValue:
    '13297F880FC2467EF971416B391BD08A9BB6F0E2D861D9BE7727EF3CB6C2D2AD5AEDBD7EE593C581EE3E78E355B50846160442F55C186E37926ACBD453C2A2DD',
  data: [
    {
      txIns: [],
      txOuts: [
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 10000
        }
      ],
      type: 'coinbase',
      timestamp: 1465154705,
      id: 'f3cb7869e4631e9af2aa778dbea8261286f36c3f4a1550ac5ffa002010efe3a9'
    },
    {
      txIns: [],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 10000
        }
      ],
      type: 'coinbase',
      timestamp: 1465154705,
      id: '7b135778075981d3568221a8426248363e33fd6365551dd1f6b2dc02ad992717'
    },
    {
      txIns: [],
      txOuts: [
        {
          address:
            '02941c359bd9dc27990ef8bceb1466b5b832bad4289dae9ed77facf5850559790e',
          amount: 100000000
        }
      ],
      type: 'coinbase',
      timestamp: 1465154705,
      id: 'e8017e3baf5d35a4f8070614b606f37d8f162f049757fe0338931880edfee377'
    },
    {
      txIns: [],
      txOuts: [
        {
          address:
            '0378025824a56035bd4acbf1c1d04faa85f15be14ed17ad46e5d9a8607f3bee639',
          amount: 100000000
        }
      ],
      type: 'coinbase',
      timestamp: 1465154705,
      id: '163861daff46665c2422f69c161af37c9765000ca37dfb42de8ffad63e4ec919'
    },
    {
      txIns: [],
      txOuts: [
        {
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          amount: 100000000
        }
      ],
      type: 'coinbase',
      timestamp: 1465154705,
      id: '7fe39d6552ea208ce1dae135e5b442a5feb81642c92d4655adf40d2292edd6e0'
    }
  ]
};

const genesisShort = {
  index: 0,
  hash: '1b003468ce8fa8c6f9162540521f9a30f039abf30a6b9d52c024ddb90cb0101f',
  previousHash: '0',
  timestamp: 1465154705,
  beaconIndex: 327359,
  beaconValue:
    '13297F880FC2467EF971416B391BD08A9BB6F0E2D861D9BE7727EF3CB6C2D2AD5AEDBD7EE593C581EE3E78E355B50846160442F55C186E37926ACBD453C2A2DD',
  txCount: 1005
};

const blockDefault = {
  index: 1,
  previousHash:
    '1b003468ce8fa8c6f9162540521f9a30f039abf30a6b9d52c024ddb90cb0101f',
  data: [
    {
      type: 'coinbase',
      txIns: [
        {
          txOutIndex: 1
        }
      ],
      txOuts: [
        {
          address: '',
          amount: 0
        }
      ],
      timestamp: 1533124797,
      id: 'd6e28bf95fb8da878518024a52a8dbf02a35ffe6be826114c1c387a97bae7940'
    },
    {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '7fe39d6552ea208ce1dae135e5b442a5feb81642c92d4655adf40d2292edd6e0',
          amount: 100000000,
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          signature:
            '2523cb9f900e8d69c4eed9836fac3adb358ebd5b549ad73be72169fc74261c6648c5118161e831f8b44cfb45cbca2cce6b37eeb2d7e4eaf66c3448059044c8a6'
        }
      ],
      txOuts: [
        {
          address:
            '0231272fba0fb2a54be85ff7b1029e712d32134338dbbb10e4e3b9272c2a678238',
          amount: 1
        },
        {
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          amount: 99999999
        }
      ],
      timestamp: 1533124688,
      id: 'ce73116c923a99962071e295ef660eec1c1c6b56378a5b7e0ce4a48f36391d50'
    }
  ],
  beaconIndex: 220394,
  beaconValue:
    '0A8863E03E200F694CBA50F0F9A009B078555FE637B07CA2C0A0E4D564080173787B26376C4762377A139D1BCAA916A10419504850EB7CF91552A17FDCAA0463',
  timestamp: 1533124797,
  hash: 'dfd39c242b9baf934d9649c174dcf13f674bb266e6f5cd907e6bd9ddce45fba3'
};

const blockDefaultShort = {
  index: 1,
  previousHash:
    '1b003468ce8fa8c6f9162540521f9a30f039abf30a6b9d52c024ddb90cb0101f',
  beaconIndex: 220394,
  beaconValue:
    '0A8863E03E200F694CBA50F0F9A009B078555FE637B07CA2C0A0E4D564080173787B26376C4762377A139D1BCAA916A10419504850EB7CF91552A17FDCAA0463',
  timestamp: 1533124797,
  hash: 'dfd39c242b9baf934d9649c174dcf13f674bb266e6f5cd907e6bd9ddce45fba3',
  txCount: 2
};

const blockToAdd = {
  index: 2,
  previousHash:
    'dfd39c242b9baf934d9649c174dcf13f674bb266e6f5cd907e6bd9ddce45fba3',
  data: [
    {
      type: 'coinbase',
      txIns: [
        {
          txOutIndex: 2
        }
      ],
      txOuts: [
        {
          address: '',
          amount: 0
        }
      ],
      timestamp: 1533125777,
      id: '88c1e7a1e91078794bd0ae101a1d7f1abd62db1a9ee71b4680787647938a8b05'
    }
  ],
  beaconIndex: 220394,
  beaconValue:
    '0A8863E03E200F694CBA50F0F9A009B078555FE637B07CA2C0A0E4D564080173787B26376C4762377A139D1BCAA916A10419504850EB7CF91552A17FDCAA0463',
  timestamp: 1533125777,
  hash: '385aa17c8788695d1c25f6b0c7b0336e85813f4e4abca68ed1d940826cbfb8d9'
};

const blockToAddShort = {
  index: 2,
  previousHash:
    'dfd39c242b9baf934d9649c174dcf13f674bb266e6f5cd907e6bd9ddce45fba3',
  beaconIndex: 220394,
  beaconValue:
    '0A8863E03E200F694CBA50F0F9A009B078555FE637B07CA2C0A0E4D564080173787B26376C4762377A139D1BCAA916A10419504850EB7CF91552A17FDCAA0463',
  timestamp: 1533125777,
  hash: '385aa17c8788695d1c25f6b0c7b0336e85813f4e4abca68ed1d940826cbfb8d9',
  txCount: 2
};

const blockPoolTest = {
  index: 1,
  previousHash:
    '1b003468ce8fa8c6f9162540521f9a30f039abf30a6b9d52c024ddb90cb0101f',
  data: [
    {
      type: 'coinbase',
      txIns: [
        {
          txOutIndex: 1
        }
      ],
      txOuts: [
        {
          address: '',
          amount: 0
        }
      ],
      timestamp: 1533124797,
      id: 'd6e28bf95fb8da878518024a52a8dbf02a35ffe6be826114c1c387a97bae7940'
    },
    {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '7fe39d6552ea208ce1dae135e5b442a5feb81642c92d4655adf40d2292edd6e0',
          amount: 100000000,
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          signature:
            '2523cb9f900e8d69c4eed9836fac3adb358ebd5b549ad73be72169fc74261c6648c5118161e831f8b44cfb45cbca2cce6b37eeb2d7e4eaf66c3448059044c8a6'
        }
      ],
      txOuts: [
        {
          address:
            '0231272fba0fb2a54be85ff7b1029e712d32134338dbbb10e4e3b9272c2a678238',
          amount: 1
        },
        {
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          amount: 99999999
        }
      ],
      timestamp: 1533124688,
      id: 'ce73116c923a99962071e295ef660eec1c1c6b56378a5b7e0ce4a48f36391d50'
    },
    {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 1,
          txOutId:
            'ce73116c923a99962071e295ef660eec1c1c6b56378a5b7e0ce4a48f36391d50',
          amount: 99999999,
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          signature:
            'be5d60d88faf46c20047373cb60596bc6291c5a7cc47fa50b39920b00cc69d55413b5c422720a81f75c60ea414d1b81695a6cbc8eca983d4ff12873ba8ad92e2'
        }
      ],
      txOuts: [
        {
          address:
            '026a9497bb8a422403031035a5af5ccdd1f0dc0298a0b1fac00ae32a7aec83ac21',
          amount: 1
        },
        {
          address:
            '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
          amount: 99999998
        }
      ],
      timestamp: 1533124700,
      id: '6c7d984808ac142b53e4ca0221bd362fe47a019cdfb002304d15baeb648678a4'
    }
  ],
  beaconIndex: 220394,
  beaconValue:
    '0A8863E03E200F694CBA50F0F9A009B078555FE637B07CA2C0A0E4D564080173787B26376C4762377A139D1BCAA916A10419504850EB7CF91552A17FDCAA0463',
  timestamp: 1533124797,
  hash: '0111c94f1bd87707eb29aa9d0a9fc96eee4ac14e1bb3b47a6440b1fa8e3e8d98'
};

const blockPoolTestShort = {
  index: 1,
  previousHash:
    '1b003468ce8fa8c6f9162540521f9a30f039abf30a6b9d52c024ddb90cb0101f',
  beaconIndex: 220394,
  beaconValue:
    '0A8863E03E200F694CBA50F0F9A009B078555FE637B07CA2C0A0E4D564080173787B26376C4762377A139D1BCAA916A10419504850EB7CF91552A17FDCAA0463',
  timestamp: 1533124797,
  hash: '0111c94f1bd87707eb29aa9d0a9fc96eee4ac14e1bb3b47a6440b1fa8e3e8d98',
  txCount: 3
};

const transactionDefault = {
  type: 'regular',
  txIns: [
    {
      txOutIndex: 0,
      txOutId:
        '7fe39d6552ea208ce1dae135e5b442a5feb81642c92d4655adf40d2292edd6e0',
      amount: 100000000,
      address:
        '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
      signature:
        '2523cb9f900e8d69c4eed9836fac3adb358ebd5b549ad73be72169fc74261c6648c5118161e831f8b44cfb45cbca2cce6b37eeb2d7e4eaf66c3448059044c8a6'
    }
  ],
  txOuts: [
    {
      address:
        '0231272fba0fb2a54be85ff7b1029e712d32134338dbbb10e4e3b9272c2a678238',
      amount: 1
    },
    {
      address:
        '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
      amount: 99999999
    }
  ],
  timestamp: 1533124688,
  id: 'ce73116c923a99962071e295ef660eec1c1c6b56378a5b7e0ce4a48f36391d50'
};

const transactionPoolTest = {
  type: 'regular',
  txIns: [
    {
      txOutIndex: 1,
      txOutId:
        'ce73116c923a99962071e295ef660eec1c1c6b56378a5b7e0ce4a48f36391d50',
      amount: 99999999,
      address:
        '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
      signature:
        'be5d60d88faf46c20047373cb60596bc6291c5a7cc47fa50b39920b00cc69d55413b5c422720a81f75c60ea414d1b81695a6cbc8eca983d4ff12873ba8ad92e2'
    }
  ],
  txOuts: [
    {
      address:
        '026a9497bb8a422403031035a5af5ccdd1f0dc0298a0b1fac00ae32a7aec83ac21',
      amount: 1
    },
    {
      address:
        '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
      amount: 99999998
    }
  ],
  timestamp: 1533124700,
  id: '6c7d984808ac142b53e4ca0221bd362fe47a019cdfb002304d15baeb648678a4'
};

const transactionInvalid = {
  type: 'regular',
  txIns: [
    {
      txOutId:
        '3adc66368d5b036fff9429c1da9a3430d3bda04da2b9e935ff5dedbf20099283',
      txOutIndex: 0,
      amount: 1000000,
      address:
        '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
      signature:
        'ee0d2578e84ccade0c87b33acc22c05c9cbc6ee5064cfec25e580a0317072f3b77de197e17d61e39dcaab48ba71cccd4aa5fb0d3698e5c559750a99cc0a6ed88'
    }
  ],
  txOuts: [
    {
      address:
        '123e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
      amount: 1
    },
    {
      address:
        '02afa661f8cc8308f0d13a2fbd0714af71b5f0a24b84447f020c336d7a6e65b04d',
      amount: 999999
    }
  ],
  timestamp: 1533124688,
  id: '123e1d07cffc4a7ddfecdae6b52d15tr58d6ce73c2d95c90599a3ae0997e8576'
};

const utxoDefault = [
  {
    txOutId: 'c7bff4167302503257057f34212714e3fbfb6bd13c162ad8031fc07268504a1a',
    txOutIndex: 0,
    blockIndex: 0,
    amount: 10000,
    address:
      '04b76c594a99455f009f51849ca70e98c96aa8942f32494d53e0312822881ae55839d67a10423fce292af147db622ca42162576caf8f01c24b664de6bce477937b'
  }
];

const blockInvalid = {
  index: 2,
  hash: '0f01361da5798f17563935547008ede90e3f61ec04cd499a3cae9b56ddbced41',
  previousHash:
    'b464abdee266611f13573afab6a432e1b74e92c3f560451a6d5779b07ba9f34c',
  timestamp: 1533125777,
  data: [
    {
      type: 'coinbase',
      txIns: [
        {
          txOutIndex: 2
        }
      ],
      txOuts: [
        {
          address: '',
          amount: 0
        }
      ],
      timestamp: 1533125777,
      id: '88c1e7a1e91078794bd0ae101a1d7f1abd62db1a9ee71b4680787647938a8b05'
    }
  ]
};

export {
  genesis,
  genesisShort,
  transactionInvalid,
  transactionDefault,
  blockDefault,
  blockDefaultShort,
  blockToAdd,
  blockToAddShort,
  blockPoolTestShort,
  blockInvalid,
  blockPoolTest,
  utxoDefault,
  transactionPoolTest
};
