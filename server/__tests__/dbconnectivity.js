const pool = require('../databasePool').remotePool;

class DBTest {
    static selectTest() {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM cities',
                [],
                (error, response) => {
                    if (error) return reject(error);

                    if (response.rows.length === 0) return reject(new Error('no connection'));

                    resolve(response.rows[0]);

                    

                }
            )
        })        
    }
}

DBTest.selectTest()
.then(cities => console.log(cities))
.catch(error => console.error('error', error));