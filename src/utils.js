export function extend(into /*, &more */ ) {
    for (var i = 1; i < arguments.length; i++) {
        for (var attrname in arguments[i]) {
            if (arguments[i].hasOwnProperty(attrname)) {
                into[attrname] = arguments[i][attrname];
            }
        }
    }

    return into;
}

export function deepMap(obj, replace) {
    if (!replace) {
        replace = (value) => { return value; };
    }
    obj = replace(obj);

    if (obj.constructor === Array) {
        let result = [];

        obj.forEach(el => {
            result.push(deepMap(el, replace));
        });

        return result;
    } else if (obj !== null && typeof obj === 'object') {
        let result = {};

        Object.keys(obj).forEach(key => {
            result[key] = deepMap(obj[key], replace);
        });

        return result;
    } else {
        return obj;
    }
}

export function deepAssign(dest, src) {
    let result = extend({}, dest);

    Object.keys(src).forEach((key) => {
        if (dest.hasOwnProperty(key) &&
            dest[key] !== null &&
            typeof dest[key] === 'object' &&
            typeof src[key] === 'object'
           ) {
               result[key] = deepAssign(dest[key], src[key]);

        } else {
            result[key] = src[key];
        }
    });

    return result;
}
