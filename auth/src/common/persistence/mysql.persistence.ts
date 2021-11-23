import { createPool } from 'mysql2/promise';
import { dbConf } from '../../config';

export default createPool(dbConf);
