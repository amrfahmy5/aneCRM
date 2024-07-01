/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.authorizationSuperAdmin = (fn) => {
    return function (req, res, next) {
        if (req.admin.role == "superAdmin") {
            const resp = fn(req, res, next);
            if (resp instanceof Promise) {
                return resp.catch(next);
            }
            return resp;
        }
        else
            return resp.catch(next);
    }
};

exports.authorizationAdmin = (fn) => {
    return function (req, res, next) {
        if (req.admin.role == "superAdmin") {
            const resp = fn(req, res, next);
            if (resp instanceof Promise) {
                return resp.catch(next);
            }
            return resp;
        }
        else
            return resp.catch(next);
    }
};

exports.authorizationStaff = (fn) => {
    return function (req, res, next) {
        if (req.admin.role == "superAdmin") {
            const resp = fn(req, res, next);
            if (resp instanceof Promise) {
                return resp.catch(next);
            }
            return resp;
        }
        else
            return resp.catch(next);
    }
};
