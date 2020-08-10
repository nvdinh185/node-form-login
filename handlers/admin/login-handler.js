const { jwtToken } = require('../../utils/jwt-token');

class LoginHandler {

    /**
     * Hàm login trả về trạng thái login thành công
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    login(req, res, next) {
        const { username, password } = req.json_data

        // cắt lấy username không thôi, không cho nhập @ vào username
        const nameMatch = username.match(/^([^@]*)@/);
        let shortName = nameMatch ? nameMatch[1] : username;

        res.status(200).send({
            status: 200,
            message: 'success',
            username: shortName.toLowerCase(),
            token: jwtToken({
                username: shortName.toLowerCase(),
                password: password
            })
        })
    }
}

module.exports = new LoginHandler();