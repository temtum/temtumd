import Helpers from '../helpers';

const addressRoutes = {
  init: (app, addressEntity) => {
    /**
     * @api {post} /address/create Request address creation
     * @apiName addressCreate
     * @apiGroup Address
     *
     * @apiSuccess (Query string) {Object} object New address created.
     * @apiSuccessExample Example object on success
     * {
     *  privateKey: 541f722e8c7faf36eb56cedd679e2efa2b1e08615c5be277c002d911e2c1efcc,
     *  address: 04f88629e603086208e3bc37db664aa61dc372496aadee427e625439b44b4fc5fb9a8f207b0e1fadb78f717819a5b7b38bef50ecae89ce8519435e695fe8343e1b
     * }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "message": "error"
     *     }
     */
    app.post(Helpers.createV1Route('/address/create'), (req, res) => {
      res.send(addressEntity.addressCreate());
    });

    app.get(Helpers.createV1Route('/address/:address/unspent'), (req, res) => {
      const { address } = req.params;
      const result = addressEntity.addressUnspent(address);

      res.send(result);
    });

    /**
     * @api {get} /address/:address/balance Request balance of the address
     * @apiName addressBalance
     * @apiGroup Address
     *
     * @apiParam {String} address Wallet address(public key).
     *
     * @apiSuccess {Object} object Balance of the wallet.
     * @apiSuccessExample Example object on success
     * {
     *  balance: 1234
     * }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Bad Request
     *     {
     *       "message": "error"
     *     }
     */
    app.get(Helpers.createV1Route('/address/:address/balance'), (req, res) => {
      const { address } = req.params;
      const result = addressEntity.addressBalance(address);

      res.send(result);
    });
  }
};

export default addressRoutes;
