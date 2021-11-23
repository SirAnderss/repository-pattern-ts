import { dbConf } from '../../config';
import { createPool } from 'mysql2/promise';

export default createPool(dbConf);
