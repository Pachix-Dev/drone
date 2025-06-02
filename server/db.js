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

  static async save_order(user_id, paypal_id_order, paypal_id_transaction) {
    const connection = await mysql.createConnection(config)
    try {
      const [registers] = await connection.query(
        'INSERT INTO users_vip (user_id, paypal_id_order, paypal_id_transaction) VALUES (?,?,?)',
        [
          user_id,
          paypal_id_order,
          paypal_id_transaction,
        ]
      )
      return registers
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

}
