import * as WebSocket from 'ws';

import Block from '../blockchain/block';
import IntervalTimer from '../util/timer';

interface ExWebSocket extends WebSocket {
  hasServerMaster?: boolean;
  remoteAddress?: string;
  isAlive?: boolean;
  randomBlockChecker?: IntervalTimer;
}

interface BlockHeader {
  index?: number;
  hash?: string;
  previousHash?: string;
  timestamp?: number;
  txCount?: number;
  beaconIndex?: number;
  beaconValue?: string;
}

interface GenesisBlock {
  index: number;
  previousHash: string;
  data: string | object[];
  beaconIndex: number;
  beaconValue: string;
  timestamp: number;
  hash: string;
}

interface CustomBlock extends Block {
  compressed?: Buffer;
}

interface RawTx {
  id?: string;
  timestamp: number;
  type: string;
  txIns: object[] | [];
  txOuts: object[];
}

interface Stat {
  totalMoneyTransferred: number;
  totalTxs: number;
  lastBlockIndex?: number;
}

export { ExWebSocket, CustomBlock, BlockHeader, GenesisBlock, RawTx, Stat };
