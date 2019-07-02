import Helpers from '../helpers';

const commonRoutes = {
  init: (app, commonEntity) => {
    /**
     * @api {post} /search Search block in blocks
     * @apiName search
     * @apiGroup Block
     *
     * @apiParam (Query string) {String=^[1-9]\d*$|String=([a-zA-Z0-9]{64})} string Block unique ID or hash.
     *
     * @apiSuccess {Object} block Requested block.
     * @apiSuccessExample Example block on success
     * {
     *  "index": 7024,
     *  "hash": "60794e8acd55203faebe05f468394cf5fbae7e7ca166a9590016aee8b83283d0",
     *  "previousHash": "3fe85c89baa8c77621cd19ae1298fe75b69686ebbffd1d53e4af23a2388673b6",
     *  "timestamp": 1530941569,
     *  "data": [{
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
     *  }]
     * }
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 200 OK
     *      "Not Found"
     */
    app.post(Helpers.createV1Route('/search'), async (req, res) => {
      const query = req.body.query;
      const result = await commonEntity.search(query);

      return res.send(result);
    });

    app.get(Helpers.createV1Route('/statistic'), async (req, res) => {
      const result = await commonEntity.statistic();

      res.send(result);
    });
  }
};

export default commonRoutes;
