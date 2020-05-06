const pool = require('../../databasePool').localPool;

class UserTable {

    static storeUser({ id, firstname, lastname, email }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO "Users"(googleid, firstname, lastname, email) VALUES($1, $2, $3, $4)',
                [id, firstname, lastname, email],
                (error, response) => {
                    if (error) return reject(error);
                    console.log('New user created', response);
                    resolve();

                }
            );
        });
    }

    static findUser({ id }) {
        return new Promise((resolve, reject) => {
            console.log('findUser id', { id } );
            pool.query(
                'SELECT * FROM  "Users" WHERE googleid = $1',
                [id],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ users: response.rows[0] });


                }
            );
        });

    }
};

// UserTable.storeUser({ id: 1456 })
// .then(user => console.log(user))
// .catch(error => console.error('error', error));

module.exports = UserTable;