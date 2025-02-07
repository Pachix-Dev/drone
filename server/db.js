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

    static async create_lead ({               
        name,        
        email,
        phone,
        message,
        category    
    }) 
    {
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
        }catch (error) {
          console.log(error)
          return hableError(error)          
        }
        finally {
          await connection.end()
        }
    }
    
    static async create_suscriber ({               
            name,        
            email,      
        }) 
    {
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
        }catch (error) {
          console.log(error)
          return hableError(error)          
        }
        finally {
          await connection.end()
        }
    }
}