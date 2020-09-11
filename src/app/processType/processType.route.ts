import {Router} from 'express';
const router = Router();
const ProcessTypeController = require('./processType.controller');
const {createProcessType} = ProcessTypeController;

/**
 * @path {POST} /processType/create
 */
router.route('/create').post(createProcessType);

module.exports =  router;