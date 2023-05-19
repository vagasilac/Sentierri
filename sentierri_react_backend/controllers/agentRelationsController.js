const db = require('../models');

const createAgentRelation = async (req, res) => {
  console.log('Creating agent-supplier relation in agentRelationsController.js');
  try {
    const { agentId, supplierId } = req.body;
    const newRelation = await db.AgentRelations.create({
      agentId: agentId,
      supplierId: supplierId
    });
    console.log("Agent-supplier relation created successfully.");
    res.status(201).send(newRelation);
  } catch (error) {
    console.error("Failed to create agent-supplier relation:", error);
    res.status(500).send({ error: 'Failed to create agent-supplier relation.' });
  }
}


const removeAgentRelation = async (agentId, supplierId) => {
  try {
    const relationToRemove = await db.AgentRelations.findOne({
      where: {
        agentId: agentId,
        supplierId: supplierId
      }
    });

    if (relationToRemove) {
      await relationToRemove.destroy();
      console.log("Agent-supplier relation removed successfully.");
    } else {
      console.log("Agent-supplier relation not found.");
    }
  } catch (error) {
    console.error("Failed to remove agent-supplier relation:", error);
  }
}

const getAllAgentRelations = async (req, res) => {
  try {
    const relations = await db.AgentRelations.findAll();
    res.status(200).json(relations);
  } catch (error) {
    console.error("Failed to fetch agent-supplier relations:", error);
    res.status(500).send({ error: 'Failed to fetch agent-supplier relations.' });
  }
};

const setSupplierAgentStatus = async (supplierId, isAgent) => {
  try {
    const supplier = await db.Supplier.findByPk(supplierId);

    if (!supplier) {
      console.log("Supplier not found.");
      return;
    }

    supplier.isAgent = isAgent;
    await supplier.save();
    console.log("Supplier's isAgent status updated successfully.");

    // If the supplier is no longer an agent, remove all their relations
    if (!isAgent) {
      const relationsToRemove = await db.AgentRelations.findAll({
        where: { agentId: supplierId }
      });
      for (const relation of relationsToRemove) {
        await relation.destroy();
      }
      console.log("All agent-supplier relations for this supplier removed successfully.");
    }

    // If the supplier is now an agent, you might want to add relations here

  } catch (error) {
    console.error("Failed to update supplier's isAgent status:", error);
  }
}


module.exports = {
    createAgentRelation,
    removeAgentRelation,
    getAllAgentRelations,
    setSupplierAgentStatus
    };
