```js
var item = require('./factories/item.js');

/**
 * @param {Object} opts
 * @param {Number} opts.item number of subitems to build
 */
var factory = Factory.build(function(_, opts) {
    var result = {
        keyOne: {},
        keyTwo: {}
    }

    this.lazy(function() {
        var item;

        for (var i = 0; i < opts.items, i++) {
            item = item.build();
            keyOne[item.id] = item;
            item = item.build();
            keyTwo[item.id] = item;
        }
    });
});


factory.build(null, 2);
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
