const utxo = {
  normal: {
    txOutIndex: 0,
    txOutId: '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
    amount: 10000,
    address:
      '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1'
  },
  floatAmount: {
    txOutIndex: 0,
    txOutId: '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
    amount: 10000.15,
    address:
      '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1'
  }
};

const transactions = {
  valid: {
    type: 'regular',
    txIns: [
      {
        txOutIndex: 0,
        txOutId:
          '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
        amount: 10000,
        address:
          '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
        signature:
          '4c57f0bd02e9186d46184ea5985412dc52ef2ba74855e0cfbad0a9818a1c17f316de1f0e9d4e3e96a14d4350a2d5aa7c90801a16035b9a139c823955beb47f98'
      }
    ],
    txOuts: [
      {
        address:
          '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
        amount: 10
      },
      {
        address:
          '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
        amount: 9990
      }
    ],
    timestamp: 1563619383,
    id: 'fcc1d5d322e396b003b4a190ddcd4ad67ec30679664f3a7385174151a1608134'
  },
  notValid: {
    utxo: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 20000,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            'fb386c1ce11ba4928caa1deb28598691893d413046cf478815ad35cff9aaabca082cf90febb38632a5a8cb34cafdeff0d5a4cafcf9e9d3fcce0751f5c1f0af72'
        }
      ],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 10
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 19990
        }
      ],
      timestamp: 1563706725,
      id: 'e0f24f9570a764a4407ba8cac4b61db3bb3c66230d4d5c34816de5d364325a9d'
    },
    utxoLen: {
      type: 'regular',
      txIns: [],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 10
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 19990
        }
      ],
      timestamp: 1563706725,
      id: 'e0f24f9570a764a4407ba8cac4b61db3bb3c66230d4d5c34816de5d364325a9d'
    },
    outputsLen: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 20000,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            'fb386c1ce11ba4928caa1deb28598691893d413046cf478815ad35cff9aaabca082cf90febb38632a5a8cb34cafdeff0d5a4cafcf9e9d3fcce0751f5c1f0af72'
        }
      ],
      txOuts: [],
      timestamp: 1563706725,
      id: 'e0f24f9570a764a4407ba8cac4b61db3bb3c66230d4d5c34816de5d364325a9d'
    },
    id: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 10000,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            '4c57f0bd02e9186d46184ea5985412dc52ef2ba74855e0cfbad0a9818a1c17f316de1f0e9d4e3e96a14d4350a2d5aa7c90801a16035b9a139c823955beb47f98'
        }
      ],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 100
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 9900
        }
      ],
      timestamp: 1563619383,
      id: 'fcc1d5d322e396b003b4a190ddcd4ad67ec30679664f3a7385174151a1608134'
    },
    sum: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 10000,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            'febd7f54b1ade9aa66989fabeed8c59a9a3c2f7b09be04c262723f637e1ebcbd0f24120d49445bedb3f21f6fd83ec5d80eb72cb9f51fadb11be865f3b96301f5'
        }
      ],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 10
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 9980
        }
      ],
      timestamp: 1563654572,
      id: '05b73e1e47f65078c58fa2d215446acd7e1a29888a7edfbefce94cf465c82387'
    },
    floatAmount: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 10000.15,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            '6f496ca7719c9b7ea9124c707db27598dd442cb046540898503d1513dd85231a0529755274d093b90e5215b3800cad1caacc7ab88fd3d392f5ae1abd9ec695d0'
        }
      ],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 10
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 9990.15
        }
      ],
      timestamp: 1563707538,
      id: 'a545f3398097b3e54865a3540f74a74841c52757031b28b372f8baf32d8f3d8b'
    },
    signature: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 10000,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            '80501c9436f2386d1c5ebdb2f11c693d50568a56c24b2e1b61ebebe97bbd214e23d7eb8d13eda12e5517d1a4da5076bdc7eb27efbbb5cf484c65f0e7a1c1ac3a'
        }
      ],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 1000
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: 9000
        }
      ],
      timestamp: 1563714144,
      id: 'de1c7194d801991811bf4713003a6a7be64dba0d57504da04a230c27655e189e'
    },
    negative: {
      type: 'regular',
      txIns: [
        {
          txOutIndex: 0,
          txOutId:
            '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
          amount: 10000,
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          signature:
            '7eb2bc14466719a91cd341e950ef553b0348dd025f0060a55ba70e95806709e12d91e5ddabaf08fcdbe1c25206ae0f9500f82b885cf9fa30df29f6020ba81c57'
        }
      ],
      txOuts: [
        {
          address:
            '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
          amount: 20000
        },
        {
          address:
            '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
          amount: -10000
        }
      ],
      timestamp: 1563716066,
      id: '04d648ef65f5cf7f22d65c3d4ec79f5435a354724215967c5053e64e56ae18d1'
    },
    myself: [
      {
        type: 'regular',
        txIns: [
          {
            txOutIndex: 0,
            txOutId:
              '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
            amount: 10000,
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            signature:
              '0d173e6c59f73bb77cfa208ee89bfee308e86a0c7570cd170322677b59f418ec4c65ed61d3add6155d1c697e3d35d4ba18d58ba9171f2e3baa053771aa18aaf8'
          }
        ],
        txOuts: [
          {
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            amount: 10
          },
          {
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            amount: 9990
          }
        ],
        timestamp: 1563726492,
        id: 'e09106f1317845977bd9b6db84ab38b8bfd02a83f614e3e3753ae4046f1a43ff'
      },
      {
        type: 'regular',
        txIns: [
          {
            txOutIndex: 0,
            txOutId:
              '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
            amount: 10000,
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            signature:
              '9260a604093223086c8e8e72fea23975b85352861de9dba7ce7482300d6d67d926c2e574a1f92464cbc7ff2b82b876aacc3d6cff704b23ccbcf9e5effa1ff237'
          }
        ],
        txOuts: [
          {
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            amount: 10000
          },
          {
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            amount: 0
          }
        ],
        timestamp: 1563732626,
        id: '75c9213f0b70c9ff04c8664e4cfa25f43cc93df39f3f23745164220a52c71441'
      },
      {
        type: 'regular',
        txIns: [
          {
            txOutIndex: 0,
            txOutId:
              '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
            amount: 10000,
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            signature:
              'd9245bd08bc9977a37e61734889f89b27fc2af0833da8bf6fb098d8a20242e565801abb2936d69c4cb3e08dded648e71b7f92d683bc7b0e7033c68d921699460'
          }
        ],
        txOuts: [
          {
            address:
              '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
            amount: 10000
          }
        ],
        timestamp: 1563732958,
        id: 'b3af05464270ed3c9510c1d293bf08cdd086758fd28d626de044e570f03a9a16'
      }
    ]
  },
  schema: {
    badType: {
      type: 'simple',
      txIns: [],
      txOuts: [],
      timestamp: 1563619383,
      id: 'fcc1d5d322e396b003b4a190ddcd4ad67ec30679664f3a7385174151a1608134'
    },
    badId: {
      type: 'regular',
      txIns: [],
      txOuts: [],
      timestamp: 1563619383,
      id: 'fcc1d5d322e396b003b4a190ddcd4ad67ec30679664f3a7385174151a16081'
    },
    badTimestamp: {
      type: 'regular',
      txIns: [],
      txOuts: [],
      timestamp: 'timestamp',
      id: 'fcc1d5d322e396b003b4a190ddcd4ad67ec30679664f3a7385174151a1608134'
    }
  },
  create: {
    type: 'regular',
    txIns: [
      {
        txOutIndex: 0,
        txOutId:
          '6fcbe472d95f444f52ec01d0d94db50b0bbb9f15fb190813517749fe3060d446',
        amount: 10000,
        address:
          '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1'
      }
    ],
    txOuts: [
      {
        address:
          '03c8348aad4f8f0241423cfab24bfb44346227c599901da6ee3b50b3abdab4bd15',
        amount: 10
      },
      {
        address:
          '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
        amount: 9990
      }
    ]
  }
};

export { utxo, transactions };
