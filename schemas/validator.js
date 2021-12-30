const { Response } = require("../utility/ResponseTemplate/Response");

const validateSchema = ({ schema, data }) => {
    let res = new Response();
    try {
        schema.validateSync(data);
        res.setStatus({ success: true, data: data });
    } catch (e) {
        res.setStatus({ error: true, msg: e.errors[0] });
    }
    return res;
};

module.exports = { validateSchema };
