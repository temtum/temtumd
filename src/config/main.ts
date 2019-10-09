const main = {
  MINING_REWARD: 0,
  MASTER_NODE: '51.38.234.177',
  HTTP_PORT: 3001,
  P2P_PORT: 6001,
  BLOCKCHAIN_DATABASE: 'blockchain',
  UTXO_DATABASE: 'utxo',
  NATS_CLUSTER_ID: 'temtum',
  PEERS_DATABASE: 'peers',
  MINE_INTERVAL_SECONDS: 12,
  BLOCKS_PER_CHUNK: 5,
  BLOCKS_PER_PAGE: 10,
  TX_PER_PAGE: 10,
  TX_OUTPUT_LIMIT: 1000,
  TX_MAX_VALIDITY_TIME: 259200000,
  REDIS_TX_CACHE: 'transactionCache',
  REDIS_BLOCK_CACHE: 'blockCache',
  REDIS_BLOCK_QUEUE: 'block_queue',
  BCRYPT_SALT_ROUNDS: 10,
  RESTORE_DB_FILE: '.bs',
  RESTORE_DB_TIMEOUT: 60000,
  BACKUP_DB_TIMEOUT: 3600000
};

export default main;