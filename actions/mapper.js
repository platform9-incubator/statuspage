customers_map = {
   'pf9demo': 'test-du-tempest-76525.platform9.horse'
}
var mapper = function(customer) {
    return customers_map[customer];
}

module.exports = mapper;
