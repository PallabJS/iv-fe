const yup = require("yup");

const dashboardDataSchema = yup.object().shape({
    title: yup.string().required(),
    bodyText: yup.string().required(),
    count: yup.object().shape({
        adds: yup.number(),
        updates: yup.number(),
    }),
});

module.exports = { dashboardDataSchema };
