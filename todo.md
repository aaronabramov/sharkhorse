```js
var item = require('./factories/item.js');

/**
 * @param {Object} opts
 * @param {Number} opts.item number of subitems to create
 */
var factory = Factory.create(function(_, opts) {
    var result = {
        keyOne: {},
        keyTwo: {}
    }

    this.lazy(function() {
        var item;

        for (var i = 0; i < opts.items, i++) {
            item = item.create();
            keyOne[item.id] = item;
            item = item.create();
            keyTwo[item.id] = item;
        }
    });
});


factory.create(null, 2);
// {
//     keyOne: {
//         '1': {
//             id: '1',
//         },
//         '2': {
//             id: '2'
//         }
//     },
//     keyTwo: {
//         '1': {
//             id: '1',
//         },
//         '2': {
//             id: '2'
//         }
//     },
// }
```
