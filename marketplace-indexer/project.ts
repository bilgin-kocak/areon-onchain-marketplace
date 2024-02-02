import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from '@subql/types-ethereum';

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: '1.0.0',
  version: '0.0.1',
  name: 'areon-marketplace',
  description: 'This project can be use to index areon marketplace contract',
  runner: {
    node: {
      name: '@subql/node-ethereum',
      version: '>=3.0.0',
    },
    query: {
      name: '@subql/query',
      version: '*',
    },
  },
  schema: {
    file: './schema.graphql',
  },
  network: {
    /**
     * chainId is the EVM Chain ID, for Ethereum Sepolia this is 11155111
     * https://chainlist.org/chain/11155111
     */
    chainId: '462',
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ['wss://testnet-ws.areon.network'],
  },
  dataSources: [
    // {
    //   kind: EthereumDatasourceKind.Runtime,
    //   startBlock: 3172545,

    //   options: {
    //     // Must be a key of assets
    //     abi: "erc20",
    //     address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    //   },
    //   assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }], ["erc721", { file: "./abis/Erc721.json" }], ["AsksV1_1", { file: "./abis/AsksV1_1.json" }], ["OffersV1", { file: "./abis/OffersV1.json" }], ["ReserveAuctionCoreErc20", { file: "./abis/ReserveAuctionCoreErc20.json" }]  ]),
    //   mapping: {
    //     file: "./dist/index.js",
    //     handlers: [
    //       {
    //         kind: EthereumHandlerKind.Call,
    //         handler: "handleTransaction",
    //         filter: {
    //           /**
    //            * The function can either be the function fragment or signature
    //            * function: '0x095ea7b3'
    //            * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
    //            */
    //           function: "approve(address spender, uint256 rawAmount)",
    //         },
    //       },
    //       {
    //         kind: EthereumHandlerKind.Event,
    //         handler: "handleLog",
    //         filter: {
    //           /**
    //            * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
    //            * address: "0x60781C2586D68229fde47564546784ab3fACA982"
    //            */
    //           topics: [
    //             "Transfer(address indexed from, address indexed to, uint256 amount)",
    //           ],
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3172545,

      options: {
        // Must be a key of assets
        abi: 'AsksV1_1',
        address: '0x2f5Ad99Ee427C2A8679865BF2F991FE34525bab8',
      },
      assets: new Map([
        ['erc20', { file: './abis/erc20.abi.json' }],
        ['erc721', { file: './abis/Erc721.json' }],
        ['AsksV1_1', { file: './abis/AsksV1_1.json' }],
        ['OffersV1', { file: './abis/OffersV1.json' }],
        [
          'ReserveAuctionCoreErc20',
          { file: './abis/ReserveAuctionCoreErc20.json' },
        ],
      ]),
      mapping: {
        file: './dist/index.js',
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: 'handleAskCreated',
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                'FixedSaleCreated(address indexed tokenContract, uint256 indexed tokenId, (address seller,address sellerFundsRecipient,address askCurrency,uint16 findersFeeBps, uint256 askPrice))',
              ],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: 'handleAskPriceUpdated',
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                'FixedSalePriceUpdated(address indexed tokenContract, uint256 indexed tokenId,(address seller,address sellerFundsRecipient,address askCurrency,uint16 findersFeeBps, uint256 askPrice))',
              ],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: 'handleAskCanceled',
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                'FixedSaleCanceled(address indexed tokenContract, uint256 indexed tokenId,(address seller,address sellerFundsRecipient,address askCurrency,uint16 findersFeeBps, uint256 askPrice))',
              ],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: 'handleAskFilled',
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                'FixedSaleFilled(address indexed tokenContract, uint256 indexed tokenId,address indexed buyer, address finder,(address seller,address sellerFundsRecipient,address askCurrency,uint16 findersFeeBps, uint256 askPrice))',
              ],
            },
          },
        ],
      },
    },
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3184731,

      options: {
        // Must be a key of assets
        abi: 'erc721',
        address: '0x3ee41873Bb737D204C746d155ABf9A2Ea2636B8B',
      },
      assets: new Map([
        ['erc20', { file: './abis/erc20.abi.json' }],
        ['erc721', { file: './abis/Erc721.json' }],
        ['AsksV1_1', { file: './abis/AsksV1_1.json' }],
        ['OffersV1', { file: './abis/OffersV1.json' }],
        [
          'ReserveAuctionCoreErc20',
          { file: './abis/ReserveAuctionCoreErc20.json' },
        ],
      ]),
      mapping: {
        file: './dist/index.js',
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: 'handleTransferERC721',
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                'Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
              ],
            },
          },
        ],
      },
    },
  ],
  repository: 'https://github.com/subquery/ethereum-subql-starter',
};

// Must set default to the project instance
export default project;
