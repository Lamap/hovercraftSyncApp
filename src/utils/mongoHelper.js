function sequence(chain, done){
    var count = chain.length;
    var index = 0;
    var fails = [];
    function saveNode() {
        const node = chain[index];
        node.save(function (err) {
            if (err) {
                fails.push({node: node, reason: err});
            }
            if (index < count - 1) {
                index++;
                saveNode();
            } else {
                done(fails);
            }
        });
    }
    if (!count) {
        return done(fails);
    }
    saveNode();
}
module.exports = {sequenceSave: sequence};