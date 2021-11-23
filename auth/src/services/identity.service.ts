import jwt from 'jsonwebtoken';
import SHA from 'sha.js';
import { ApplicationException } from '../common/exceptions/application.exeption';
import connection from '../common/persistence/mysql.persistence';
import { UserCreateDto } from '../dtos/user.dto';

export class IdentityService {
  async authenticate(email: string, password: string): Promise<string> {
    const con = await connection;

    // Hash passowrd
    password = SHA('sha256').update(password).digest('base64');

    const [rows]: any[] = await con.execute(
      'SELECT * FROM auth_user WHERE email = ? AND password = ?',
      [email, password]
    );

    if (process.env.JWT_SECRET_KEY) {
      const secretKey: string = process.env.JWT_SECRET_KEY;

      if (rows.length) {
        return jwt.sign(
          {
            id: rows[0].id,
            email: rows[0].email,
          },
          secretKey,
          { expiresIn: '1h', algorithm: 'HS256' }
        );
      }
    } else {
      throw new Error('Secret key is not defined.');
    }

    throw new ApplicationException('Invalid user credentials supplied.');
  }

  async create(user: UserCreateDto): Promise<void> {
    const con = await connection;

    // Hash password
    user.password = SHA('sha256').update(user.password).digest('base64');

    await con.execute(
      'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
      [user.email, user.password, new Date()]
    );
  }
}
