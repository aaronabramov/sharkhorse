var expect = require('chai').expect,
    Factory = require('../src/factory.js');

describe('Context', function() {
    describe('#seq', function() {
        it('returns seq of numbers', function() {
            var f = Factory(function() {
                return {
                    a: this.seq(function(n) {
                        return n;
                    })
                };
            });

            expect(f.build('test').a).to.equal(1);
            expect(f.build('test').a).to.equal(2);
            expect(f.build('test').a).to.equal(3);
        });

        it('does not eval seq fn if its been overwritten', function() {
            var f = Factory(function() {
                return {
                    a: this.seq()
                };
            });
            expect(f.build().a).to.equal(1);
            expect(f.build({
                a: 5
            }).a).to.equal(5);
            expect(f.build().a).to.equal(2);

        });
    });

    describe('#defer', function() {
        it('execs deferred function on creation', function() {
            var counter = 0;
            var f = Factory(function() {
                return {
                    a: this.defer(function() {
                        return ++counter;
                    })
                };
            });

            expect(f.build().a).to.equal(1);
            expect(f.build({
                a: 5
            }).a).to.equal(5);
            expect(f.build().a).to.equal(2);
        });
    });

    describe('#factory', function() {
        it('builds nested factory lazily', function() {
            var f1 = Factory(function() {
                    return {
                        a: 1
                    };
                }),
                f2 = Factory(function() {
                    return {
                        d: 5,
                        f: this.factory(f1),
                        f2: this.factory(f1, {
                            a: 99
                        })
                    };
                });

            expect(f2.build().f).to.eql({
                a: 1
            });
            expect(f2.build().f2).to.eql({
                a: 99
            });
        });

        it('is lazy', function() {
            var f1 = Factory(function() {
                    return {
                        a: this.seq()
                    };
                }),
                f2 = Factory(function() {
                    return {
                        d: 5,
                        f: this.factory(f1),
                    };
                });
            expect(f2.build().f).to.eql({
                a: 1
            });
            // does not increment seq here as it's not evaluated
            expect(f2.build({
                f: {
                    a: 555
                }
            }).f).to.eql({
                a: 555
            });
            expect(f2.build().f).to.eql({
                a: 2
            });
        });
    });

    describe('#factories', function() {
        it('builds multiple factories', function() {
            var f1 = Factory(function() {
                    return {
                        a: 1
                    };
                }),
                f2 = Factory(function() {
                    return {
                        d: 5,
                        f: this.factories(f1, 5)
                    };
                });

            var obj = f2.build();
            expect(obj.f.length).to.equal(5);
            expect(obj.f[4].a).to.equal(1);
        });
    });

    describe('#uuid', function() {
        it('generates uuid', function() {
            var f = Factory(function() {
                return {
                    a: this.uuid()
                };
            });

            expect(f.build().a).to.match(/(\w{8}(-\w{4}){3}-\w{12}?)/);
        });
    });

    describe('#uniqId', function() {
        it('generate unique string with based on seed value', function() {
            var f = Factory(function() {
                return {
                    name: this.uniqId('seed')
                }
            });

            expect(f.build().name).to.equal('seed_1');
            expect(f.build().name).to.equal('seed_2');
        });

        it('is shared across the factories', function() {
            var f1 = Factory(function() {
                    return {
                        name: this.uniqId('seed')
                    }
                }),

                f2 = Factory(function() {
                    return {
                        name: this.uniqId('seed')
                    }
                });
            // shady. shared counters
            expect(f1.build().name).to.equal('seed_3');
            expect(f2.build().name).to.equal('seed_4');
        });
    });

    describe('#rand', function() {
        it('generates random number', function() {
            var nums = {},
                r,
                TIMES = 100000,
                RANGE = [-100, 100],
                RATIO = (RANGE[1] - RANGE[0] + 1) / TIMES,
                f = Factory(function() {
                return {
                    a: this.rand.apply(this, RANGE)
                };
            });

            for (var i = 0; i < 10000; i++) {
                r = f.build().a;
                nums[r] || (nums[r] = 1);
                expect(r).to.be.within(RANGE[0], RANGE[1]);
            }

            expect(Object.keys(nums).length).to.equal(RANGE[1] - RANGE[0] + 1);
            for (r in nums) {
                expect(nums[r] / TIMES).to.be.closeTo(RATIO, 0.01);
            }
        });
    });
});
