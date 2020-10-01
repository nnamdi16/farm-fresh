import {Router} from 'express';

const router = Router();
const ProcessController = require('./process.controller');
const {createProcess} = ProcessController;

/**
 * @path {POST} /process/create
 */
router.route('/create').post(createProcess);