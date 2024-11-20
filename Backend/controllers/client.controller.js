const Client = require('../models/client.model');

// CREATE a new client
const createClient = async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ all clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ a single client by ID
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a client
const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a client
const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};