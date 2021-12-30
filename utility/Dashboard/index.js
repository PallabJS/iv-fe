const { Response } = require("../ResponseTemplate/Response");

class Dashboard {
    #dashboard = db.collection("dashboard");

    getData = async () => {
        let res = new Response();
        try {
            let data = await this.#dashboard.find({}).limit(3).toArray();
            res.setStatus({ success: true, data: data });
        } catch (e) {
            res.setStatus({ error: true, msg: e.message });
        }
        return res;
    };

    find = async (matchData) => {
        let res = new Response();
        try {
            let queryResult = await this.#dashboard.findOne(matchData);
            if (!queryResult) throw new Error("No such data");
            res.setStatus({ success: true, data: queryResult });
        } catch (e) {
            res.setStatus({ error: true, msg: e.message });
        }
        return res;
    };

    update = async ({ objectId, data }) => {
        let res = new Response();
        try {
            let queryResult = await this.#dashboard.updateOne(
                {
                    _id: objectId,
                },
                { $set: data, $inc: { "count.updates": 1 } }
            );
            const updatedData = await this.find({ _id: objectId });
            console.log(updatedData);
            res.setStatus({ success: true, data: updatedData.data });
        } catch (e) {
            res.setStatus({ error: true, msg: e.message });
        }
        return res;
    };

    add = async (data) => {
        let res = new Response();
        try {
            let queryResult = await this.find({ title: data.previousTitle });

            // This executed only once when user pushed data first time of this title
            // This is Basic ADD operation
            if (queryResult.error) {
                let queryResult = await this.#dashboard.insertOne({
                    title: data.title,
                    bodyText: data.bodyText,
                    count: {
                        adds: 0,
                        updates: 0,
                    },
                });

                const insertedData = await this.find({ _id: queryResult.insertedId });
                res.setStatus({
                    success: true,
                    data: insertedData.data,
                });
            }
            // This executes when user pushed data into a slot which already has data
            // This is an Extened ADD operation
            else {
                let objectId = queryResult.data._id;
                queryResult = await this.#dashboard.updateOne(
                    {
                        _id: objectId,
                    },
                    {
                        $set: { title: data.title, bodyText: data.bodyText },
                        $inc: { "count.adds": 1 },
                    }
                );

                const insertedData = await this.find({ _id: objectId });
                res.setStatus({
                    success: true,
                    data: insertedData.data,
                });
            }
        } catch (e) {
            res.setStatus({ error: true, msg: e.message });
        }
        return res;
    };
}

module.exports = { Dashboard };
