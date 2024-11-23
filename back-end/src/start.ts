import app from './Server'
import { connect } from 'mongoose';
import seedProducts from '../seedProduct'
const port = 4000
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin123@mongo:27017";
const connecDataBase = async () => {
    try {
      await connect(MONGO_URI).then( () => {
        console.log('connexion réussi')
        app.listen(port,  () => {
            console.log('Express server started on port: ' + port)
        })
        seedProducts()

    })
    } catch(error) {
      console.info('error  catched :', error)
    }
}
connecDataBase()