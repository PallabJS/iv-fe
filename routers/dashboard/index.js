const { Router } = require("express");

const { dashboard } = require("../../utility/index");

// Schema
const { dashboardDataSchema } = require("../../schemas/Dashboard/getdata");
const { validateSchema } = require("../../schemas/validator");

const dashboardRouter = Router();

dashboardRouter.get("/getdata", async (req, res) => {
    let r = await dashboard.getData();
    res.json(r.json());
});

dashboardRouter.post("/add", async (req, res) => {
    let data = req.body;
    let schemaCheck = validateSchema({ schema: dashboardDataSchema, data: data });
    if (schemaCheck.error) res.json(schemaCheck.json());
    else {
        let r = await dashboard.add(data);
        res.json(r.json());
    }
});

dashboardRouter.post("/update", async (req, res) => {
    let data = req.body;
    let schemaCheck = validateSchema({ schema: dashboardDataSchema, data: data });
    if (schemaCheck.error) res.json(schemaCheck.json());
    else {
        let queryResult = await dashboard.find({ title: data.previousTitle });
        if (queryResult.success) {
            let r = await dashboard.update({
                objectId: queryResult.data._id,
                data: {
                    title: data.title,
                    bodyText: data.bodyText,
                },
            });

            console.log(r.json());
            res.json(r.json());
        } else {
            res.json(queryResult.json());
        }
    }
});

module.exports = { dashboardRouter };
