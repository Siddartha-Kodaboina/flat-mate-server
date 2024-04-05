const customerService = require('./customer.service');

const createCustomer = async (req, res) => {
  try {
    const body = req.body;
    console.log("In create customer :", body);
    if (!body.firstName || !body.lastName){
        const displayNameList = body.displayName.split(' ');
        body.firstName = (displayNameList.length >= 1)? displayNameList[0]: '';
        body.lastName = (displayNameList.length >= 2)? displayNameList[1]: displayNameList[0];
    }
    console.log("In create customer after:", body);
    const customer = await customerService.createCustomer(body);
    
    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getCustomerByUID = async (req, res) => {
    try{
        const customer = await customerService.getCustomerByUID(req.params.uid);
        if (customer) {
            res.status(200).json(customer);
        } else {
        res.status(404).json({ message: 'Customer not found' });
        }
    }catch{
        res.status(500).json({ error: error.message });
    }
}

const getCustomer = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomerByUID = async (req, res) => {
    try {
      const customer = await customerService.updateCustomerByUID(req.params.uid, req.body);
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomerByUID = async (req, res) => {
    try {
      await customerService.deleteCustomerByUID(req.params.uid);
      res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteCustomer = async (req, res) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  getCustomerByUID,
  getCustomer,
  updateCustomerByUID,
  updateCustomer,
  deleteCustomerByUID,
  deleteCustomer,
  listCustomers
};
