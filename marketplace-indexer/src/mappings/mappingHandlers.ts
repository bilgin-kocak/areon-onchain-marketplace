import { Ask, Nft } from '../types';
import { FixedSaleCreatedLog } from '../types/abi-interfaces/AsksV1_1';
import { TransferLog } from '../types/abi-interfaces/Erc721';
import assert from 'assert';

export async function handleAskCreated(
  log: FixedSaleCreatedLog
): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, 'No log.args');

  const ask = Ask.create({
    id: log.args.tokenId.toString() + '-' + log.args.tokenContract.toString(),
    tokenID: log.args.tokenId.toBigInt(),
    tokenContract: log.args.tokenContract,
    askPrice: log.args.fixedSale.fixedSalePrice.toBigInt(),
    askCurrency: log.args.fixedSale.fixedSaleCurrency,
    seller: log.args.fixedSale.seller,
    sellerFundsRecipient: log.args.fixedSale.sellerFundsRecipient,
    createdAtTimestamp: BigInt(log.blockNumber),
  });

  await ask.save();
}

export async function handleAskPriceUpdated(
  log: FixedSaleCreatedLog
): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, 'No log.args');

  const ask = await Ask.get(
    log.args.tokenId.toString() + '-' + log.args.tokenContract.toString()
  );
  if (ask) {
    ask.askPrice = log.args.fixedSale.fixedSalePrice.toBigInt();
    ask.askCurrency = log.args.fixedSale.fixedSaleCurrency;
    await ask.save();
  }
}

export async function handleAskCanceled(
  log: FixedSaleCreatedLog
): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, 'No log.args');

  const ask = await Ask.get(
    log.args.tokenId.toString() + '-' + log.args.tokenContract.toString()
  );
  if (ask) {
    await Ask.remove(
      log.args.tokenId.toString() + '-' + log.args.tokenContract.toString()
    );
  }
}

export async function handleAskFilled(log: FixedSaleCreatedLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, 'No log.args');

  const ask = await Ask.get(
    log.args.tokenId.toString() + '-' + log.args.tokenContract.toString()
  );
  if (ask) {
    await Ask.remove(
      log.args.tokenId.toString() + '-' + log.args.tokenContract.toString()
    );
  }
}

export async function handleTransferERC721(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, 'No log.args');

  const nftExists = await Nft.get(
    log.args.tokenId.toString() + '-' + log.address.toString()
  );

  if (nftExists) {
    nftExists.owner = log.args.to;
    nftExists.createdAtTimestamp = BigInt(log.blockNumber);
    return await nftExists.save();
  }

  const nft = Nft.create({
    id: log.args.tokenId.toString() + '-' + log.address.toString(),
    tokenID: log.args.tokenId.toBigInt(),
    tokenContract: log.address.toString(),
    owner: log.args.to,
    createdAtTimestamp: BigInt(log.blockNumber),
  });
  return await nft.save();
}
