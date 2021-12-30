class Response {
    success = false;
    error = false;
    data = null;
    msg = null;

    setStatus = ({ error = false, success = false, msg = null, data = null }) => {
        if (error) {
            this.success = false;
            this.error = true;
        } else {
            this.success = true;
            this.error = false;
        }
        this.msg = msg;
        this.data = data;
    };
    json = () => {
        return {
            success: this.success,
            error: this.error,
            data: this.data,
            msg: this.msg,
        };
    };
}

module.exports = { Response };
