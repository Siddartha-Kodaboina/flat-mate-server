const Customer = require('./customer.model');

const createCustomer = async (customerData) => {
    return await Customer.create(customerData);
};

const getOrCreateCustomerByUID = async (customerData, options = {}) => {
  return await Customer.findOrCreate({
    where: { uid: customerData.uid},
    defaults: customerData,
    ...options
  });
}

const getCustomerByUID = async (uid) => {
    return await Customer.findOne({
        where: { uid: uid},
    });
}

const getCustomerById = async (id) => {
  return await Customer.findByPk(id);
};

const updateCustomerByUID = async (uid, customerData) => {
    const customer = await Customer.findOne({
        where: {uid: uid},
    });
    if (customer) {
      return await customer.update(customerData);
    }
    throw new Error('Customer not found');
};

const updateCustomer = async (id, customerData) => {
  const customer = await Customer.findByPk(id);
  if (customer) {
    return await customer.update(customerData);
  }
  throw new Error('Customer not found');
};

const deleteCustomerByUID = async (uid) => {
    const customer = await Customer.findOne({
        where: {uid: uid},
    });
    if (customer) {
      return await customer.destroy();
    }
    throw new Error('Customer not found');
};

const deleteCustomer = async (id) => {
  const customer = await Customer.findByPk(id);
  if (customer) {
    return await customer.destroy();
  }
  throw new Error('Customer not found');
};

const getAllCustomers = async () => {
  return await Customer.findAll();
};

module.exports = {
  createCustomer,
  getOrCreateCustomerByUID,
  getCustomerByUID,
  getCustomerById,
  updateCustomerByUID,
  updateCustomer,
  deleteCustomerByUID,
  deleteCustomer,
  getAllCustomers
};
