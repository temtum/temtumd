import TransactionEntity from '../entities/transaction';
import Helpers from '../helpers';
import Validations from '../validations/index';

const transactionRoutes = {
  init: (app, transactionEntity: TransactionEntity) => {
    /**
     * @api {post} /transaction/create Request creation of the transaction
     * @apiName transactionCreate
     * @apiGroup Transaction
     *
     * @apiParam (Request message body) {String} from Address of the sender(output wallet).
     * @apiParam (Request message body) {String} to Address of the receiver(input wallet).
     * @apiParam (Request message body) {Number=^[1-9]\d*$} amount Amount of coins(positive value).
     * @apiParam (Request message body) {String} privateKey Private key of the wallet.
     *
     * @apiSuccess {Object} object Transaction created.
     * @apiSuccessExample Example object on success
     * {
     *  transaction: {
     *    "type": "regular",
     *    "txIns": [{
     *      "txOutIndex": 7024
     *     }],
     *    "txOuts": [{
     *      "amount": 0,
     *      "address": ""
     *    }],
     *    "timestamp": 1530941569,
     *    "id": "8c5db06e8ea6090a4b8c4c053b667d5d5897b72b44cb515c7ccb359fc33d0a38"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "message": "Invalid one of required params"
     *     }
     */
    app.post(
      Helpers.createV1Route('/transaction/create'),
      Validations.createTransaction,
      async (req, res) => {
        const { from, to, amount, privateKey } = req.body;
        const result = await transactionEntity.transactionCreate(
          from,
          to,
          amount,
          privateKey
        );

        res.send(result);
      }
    );

    /**
     * @api {post} /transaction/send Send the created transaction to pool
     * @apiName transactionSend
     * @apiGroup Transaction
     *
     * @apiParam (Request message body) {String} transactionHex Transaction hex.
     *
     * @apiSuccess {Object} object Transaction created.
     * @apiSuccessExample Example object on success
     * {
     *  transaction: {
     *    "type": "regular",
     *    "txIns": [{
     *      "txOutIndex": 7024
     *     }],
     *    "txOuts": [{
     *      "amount": 0,
     *      "address": ""
     *    }],
     *    "timestamp": 1530941569,
     *    "id": "8c5db06e8ea6090a4b8c4c053b667d5d5897b72b44cb515c7ccb359fc33d0a38"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "message": "Invalid hex"
     *     }
     */
    app.post(
      Helpers.createV1Route('/transaction/send'),
      Validations.sendTransaction,
      async (req, res) => {
        const { txHex } = req.body;
        const result = await transactionEntity.transactionSend(txHex);

        return res.send(result, 201);
      }
    );

    /**
     * @api {get} /transaction/:id([a-zA-Z0-9]{64}) Request transaction by its ID
     * @apiName transactionById
     * @apiGroup Transaction
     *
     * @apiParam {String} id Transaction index.
     *
     * @apiSuccess {Object} object Requested transaction.
     * @apiSuccessExample Example object on success
     * {
     *  transaction: {
     *    "type": "regular",
     *    "txIns": [{
     *      "txOutIndex": 7024
     *     }],
     *    "txOuts": [{
     *      "amount": 0,
     *      "address": ""
     *    }],
     *    "timestamp": 1530941569,
     *    "id": "8c5db06e8ea6090a4b8c4c053b667d5d5897b72b44cb515c7ccb359fc33d0a38"
     * }
     */
    app.get(
      Helpers.createV1Route('/transaction/:id([a-zA-Z0-9]{64})'),
      async (req, res) => {
        const { id } = req.params;

        const result = await transactionEntity.transactionId(id);

        return res.send(result);
      }
    );

    /**
     * @api {get} /transactions Request last transaction list
     * @apiName transactionLatest
     * @apiGroup Transaction
     *
     * @apiSuccess {Object} object Requested transactions.
     * @apiSuccessExample Example object on success
     * [
     *  {
     *    "type": "regular",
     *    "txIns": [{
     *      "txOutIndex": 7024
     *    }],
     *    "txOuts": [{
     *      "amount": 0,
     *      "address": ""
     *      ...
     *    }],
     *    "timestamp": 1530941569,
     *    "id": "8c5db06e8ea6090a4b8c4c053b667d5d5897b72b44cb515c7ccb359fc33d0a38"
     *  }
     * ]
     */
    app.get(Helpers.createV1Route('/transactions'), async (req, res) => {
      const data = await transactionEntity.getLastTransactionList();

      res.send(data);
    });
  }
};

export default transactionRoutes;
