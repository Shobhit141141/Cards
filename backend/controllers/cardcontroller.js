const Cardmodel = require('../models/Card.js');
const mongoose = require('mongoose');

// GET ALL
const getcard = async (req, res) => {
    try {
        const cards = await Cardmodel.find({}).lean();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// GET SINGLE
const getoncard = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const card = await Cardmodel.findById(id).lean();
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// POST
const createcard = async (req, res) => {
    const { title, image, description } = req.body;

    try {
        const card = await Cardmodel.create({ title, image, description });
        res.status(201).json(card);
    } catch (error) {
        res.status(400).json({ error: "Invalid Request" });
    }
}

// DELETE
const deletecard = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const card = await Cardmodel.findOneAndDelete({ _id: id });
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// UPDATE 
const updatecard = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const card = await Cardmodel.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createcard,
    getcard,
    getoncard,
    deletecard,
    updatecard
};
