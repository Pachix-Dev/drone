import mysql from 'mysql2/promise';
import 'dotenv/config';
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const hableError = (error) => {

  if (error?.sqlState === '23000') {
    return {
      status: false,
      message: 'Ya estas registrado con este correo electrónico...',
    }
  }


  return {
    status: false,
    message: 'Error al guardar tus datos, por favor intenta de nuevo.',
  }
}

export class RegisterModel {

  static async create_lead({
    name,
    email,
    phone,
    message,
    category
  }) {
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query(
        'INSERT INTO lead_drone ( name, email, phone, message, category ) VALUES (?,?,?,?,?)',
        [
          name,
          email,
          phone,
          message,
          category
        ]
      )

      return {
        status: true,
        insertId: result.insertId,
        ...result,
      }
    } catch (error) {
      console.log(error)
      return hableError(error)
    }
    finally {
      await connection.end()
    }
  }

  static async create_suscriber({
    name,
    email,
  }) {
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query(
        'INSERT INTO suscriptor_drone ( name, email ) VALUES (?,?)',
        [
          name,
          email,
        ]
      )

      return {
        status: true,
        insertId: result.insertId,
        ...result,
      }
    } catch (error) {
      console.log(error)
      return hableError(error)
    }
    finally {
      await connection.end()
    }
  }

  static async create_user({
    uuid,
    name,
    paternSurname,
    maternSurname,
    email,
    phone,
    typeRegister,
    genre,
    nacionality,
    code_invitation,
    company,
    industry,
    position,
    area,
    country,
    municipality,
    state,
    city,
    address,
    colonia,
    postalCode,
    webPage,
    phoneCompany,
    eventKnowledge,
    productInterest,
    levelInfluence,
    wannaBeExhibitor,
    alreadyVisited,
  }) {
    const connection = await mysql.createConnection(config);
    try {
      const [result] = await connection.query(
        'INSERT INTO users (uuid, name, paternSurname, maternSurname, email, phone, typeRegister, genre, nacionality, code_invitation, company, industry, position, area, country, municipality, state, city, address, colonia, postalCode, webPage, phoneCompany, eventKnowledge, productInterest, levelInfluence, wannaBeExhibitor, alreadyVisited ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          uuid,
          name,
          paternSurname,
          maternSurname,
          email,
          phone,
          typeRegister,
          genre,
          nacionality,
          code_invitation,
          company,
          industry,
          position,
          area,
          country,
          municipality,
          state,
          city,
          address,
          colonia,
          postalCode,
          webPage,
          phoneCompany,
          eventKnowledge,
          productInterest,
          levelInfluence,
          wannaBeExhibitor,
          alreadyVisited,
        ]
      )

      return {
        status: true,
        uuid,
        insertId: result.insertId,
        ...result,
      }
    } catch (err) {
      console.log(err)
      return hableError(err)
    }
    finally {
      await connection.end()
    }
  }

  static async save_order(user_id, paypal_id_order, paypal_id_transaction, id_code = 0) {
    const connection = await mysql.createConnection(config)
    try {
      const [registers] = await connection.query(
        'INSERT INTO users_vip (user_id, paypal_id_order, paypal_id_transaction, id_code) VALUES (?,?,?,?)',
        [
          user_id,
          paypal_id_order,
          paypal_id_transaction,
          id_code
        ]
      )
      return registers
    } catch (error) {
      console.log(error);
      return hableError(error);
    } finally {
      await connection.end() // Close the connection
    }
  }

  static async get_user_by_id(id) {
    const connection = await mysql.createConnection(config)
    try {

      const [users] = await connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      )
      if (users.length === 0) {
        return {
          status: false,
          error: 'No se encontró el usuario',
        }
      }
      
      return {
        status: true,
        user: users[0],
      }
    } finally {
      await connection.end()
    }
  }

  // check code cortesia
  static async check_code_cortesia(code_cortesia) {
    const connection = await mysql.createConnection(config);
    try {
      // Verifica si el código existe en codigos_cortesia
      const [result] = await connection.query(
        'SELECT * FROM codigos_cortesia WHERE code = ?',
        [code_cortesia]
      );
      
      if (result.length === 0) {
        return {
          status: false,
          message: "Código invalido",
        };
      }

      // Cuenta cuántas veces se ha usado el código en users_vip
      const [countResult] = await connection.query(
        'SELECT COUNT(*) as count FROM users_vip WHERE id_code = ?',
        [result[0].id]
      );

      if (countResult[0].count >= result[0].max_use) {
        return {
          status: false,
          message: "Código invalido",
        };
      }

      return {
        status: true,
        result: result[0],
      };

    } finally {
      await connection.end(); // Close the connection
    }
  }

  static async get_all_users_to_send() {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.query(`
      SELECT 
        id AS user_id,
        users.*
      FROM users
    `);
    return rows;
  }
  
}
