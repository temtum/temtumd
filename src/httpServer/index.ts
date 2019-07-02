import * as cors from 'cors';
import * as restana from 'restana';

import Blockchain from '../blockchain/index';
import Helpers from '../util/helpers';
import logger from '../util/logger';
import Wallet from '../wallet/index';
import Shared from './shared';

import addressRoutes from './routes/address';
import blockRoutes from './routes/block';
import commonRoutes from './routes/common';
import transactionRoutes from './routes/transaction';

import AddressEntity from './entities/address';
import BlockEntity from './entities/block';
import CommonEntity from './entities/common';
import TransactionEntity from './entities/transaction';

import RpcController from './rpc/controller';
import jsonRouter from './rpc/index';
import jsonValidation from './rpc/validation';

class HttpServer {
  public static errorHandler(error, req, res) {
    const status = error.status ? error.status : 500;

    logger.error(error);

    const response = {
      message:
        status === 500
          ? 'Something went wrong'
          : error.errors && error.errors.length > 0
          ? error.errors[0].messages[0]
          : error.message
    };

    if (error.options) {
      Object.assign(response, error.options);
    }

    res.send(response, status);
  }

  public blockchain: Blockchain;
  public wallet: Wallet;
  public shared: Shared;
  public node;
  public app;
  public rpcController;
  public addressEntity;
  public blockEntity;
  public commonEntity;
  public transactionEntity;

  public constructor(blockchain, wallet, node) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.node = node;
    this.app = restana({
      ignoreTrailingSlash: true,
      errorHandler: HttpServer.errorHandler
    });
    this.shared = new Shared(blockchain, wallet);
    this.rpcController = new RpcController(this.shared);
    this.addressEntity = new AddressEntity(this.shared);
    this.blockEntity = new BlockEntity(blockchain, this.shared);
    this.commonEntity = new CommonEntity(this.shared);
    this.transactionEntity = new TransactionEntity(
      blockchain,
      node,
      this.shared
    );

    this.init();
  }

  public init() {
    this.app.use((req, res, next) => {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        req.raw = data;
        req.body = Helpers.JSONToObject(data, false);
        next();
      });
    });

    this.app.use(cors());

    addressRoutes.init(this.app, this.addressEntity);
    blockRoutes.init(this.app, this.blockEntity);
    commonRoutes.init(this.app, this.commonEntity);
    transactionRoutes.init(this.app, this.transactionEntity);

    this.app.post(
      '/json-rpc',
      jsonRouter({
        methods: this.rpcController.getMethods(),
        beforeMethods: jsonValidation
      })
    );
  }

  public listen(port) {
    this.app.start(port).then(() => {
      logger.info('Listening http on port: ' + port);
    });
  }
}

export default HttpServer;
