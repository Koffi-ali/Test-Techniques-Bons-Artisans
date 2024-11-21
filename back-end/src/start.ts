import app from './Server'
import { connect } from 'mongoose';
const port = 4000
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mydatabase";
const connecDataBase = async () => {
    try {
      await connect(MONGO_URI).then( () => {
        console.log('connexion réussi')
        app.listen(port,  () => {
            console.log('Express server started on port: ' + port)
        })
    })
    } catch(error) {
      console.info('error  catched :', error)
    }
}
connecDataBase()