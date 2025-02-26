const Asset = require('../models/Asset');

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') { // Handle invalid ObjectIDs
        return res.status(404).json({ msg: 'Asset not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const newAsset = new Asset({
      name: req.body.name,
      value: req.body.value,
      user: req.body.user, // Assuming you're sending user ID in the request
    });

    const asset = await newAsset.save();
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an asset
exports.updateAsset = async (req, res) => {
  try {
    let asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }

    // Update fields (make sure to handle which fields are allowed to be updated)
    asset.name = req.body.name || asset.name; // Only update if provided
    asset.value = req.body.value || asset.value;
    // ... update other fields as needed

    asset = await asset.save();
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Asset not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }

    await asset.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ msg: 'Asset removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Asset not found' });
    }
    res.status(500).send('Server Error');
  }
};
