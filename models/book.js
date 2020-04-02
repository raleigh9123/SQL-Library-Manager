const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {

    }

    Book.init({
        title: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                  msg: '"Title" is required'
                }
              }
        },
        author: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: '"Author" is required.'
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: '"Genre" is required.'
                }
            }
        },
        year: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: {
                    msg: '"Year" is required.'
                },
                isInt: {
                    msg: "Please enter a valid year."
                }
            }
        }
    }, { sequelize } );

    return Book
}