// Zora Related Contracts
const ERC20_TRANSFER_HELPER =
  process.env.NEXT_APP_ERC20_TRANSFER_HELPER ||
  '0x9A186A300e395167eE07e2DB2f7334a81D1a2856';
const ERC721_TRANSFER_HELPER =
  process.env.NEXT_APP_ERC721_TRANSFER_HELPER ||
  '0x488f1D9a73B47F633d68Ffe8F5c52d62bbC25A88';
const ZORA_MODULE_MANAGER =
  process.env.NEXT_APP_ZORA_MODULE_MANAGER ||
  '0x37a3f4D99586feC325B4dd6Aa9F93755eB31c782';
const ASKS_V1_1 =
  process.env.NEXT_APP_ASKS_V1_1 ||
  '0x2f5Ad99Ee427C2A8679865BF2F991FE34525bab8';
const OFFER_V1 =
  process.env.NEXT_APP_OFFER_V1 || '0x67adB6955e7CDbbB128fdC6d097b861b947E2909';
const RESERVE_AUCTION_CORE_ERC20 =
  process.env.NEXT_APP_RESERVE_AUCTION_CORE_ERC20 ||
  '0xa58E69C2062514937BfC730b8c3a801ce83CCb7b';

const TEST_NFT_CONTRACT_ADDRESS =
  process.env.NEXT_APP_TEST_NFT_CONTRACT_ADDRESS ||
  '0x41aF21c0aD29668aD41d3d39efAFD1e3f93E0e4a';

export {
  ERC20_TRANSFER_HELPER,
  ERC721_TRANSFER_HELPER,
  ZORA_MODULE_MANAGER,
  ASKS_V1_1,
  OFFER_V1,
  RESERVE_AUCTION_CORE_ERC20,
  TEST_NFT_CONTRACT_ADDRESS,
};