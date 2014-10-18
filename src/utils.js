module.exports = {
    /**
     * extends obj1 with props from obj2, obj3...
     */
    extend: function(into /*, &more */ ) {
        for (var i = 1; i < arguments.length; i++) {
            for (var attrname in arguments[i]) {
                if (arguments[i].hasOwnProperty(attrname)) {
                    into[attrname] = arguments[i][attrname];
                }
            }
        }
        return into;
    }
};
