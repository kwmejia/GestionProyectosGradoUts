
const { mrInsertCart } = require("../helpers/helpers");
const UserValidation = require("../classes/response_user_validation");
const { response } = require("express");



const cartModel_post = async (req, res = response) => {
    const rta = await mrInsertCart(req.body.email, req.body.id_idea);
    res.json(rta);

};

module.exports = {
    cartModel_post
};