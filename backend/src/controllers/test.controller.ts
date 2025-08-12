import { Request, Response } from 'express';
import Test from '../models/Test.model.js';
import slugify from 'slugify';

// ✅ CREATE Test (without image)
export const createTest = async (req: Request, res: Response) => {
  try {
    console.log("New Test received on backend: ", req.body);
    const {
      name,
      category,
      description,
      duration,
      locations,
      popular,
      keywords,
      parts,
      parameterCount,
      parameters,
      reportIn,
      about,
    } = req.body;

    if (
      !name?.trim() ||
      !category?.trim() ||
      !description?.trim() ||
      typeof duration !== "string" ||
      !Array.isArray(locations) ||
      // !Array.isArray(locationNames) ||
      !Array.isArray(keywords) ||
      !Array.isArray(parts) ||
      typeof parameterCount !== "number" ||
      !Array.isArray(parameters) ||
      typeof reportIn !== "number" ||
      !about?.trim()
    ) {
      return res.status(400).json({ message: 'All required fields must be provided in the correct format' });
    }

    const slug = slugify(name, { lower: true });

    const existingTest = await Test.findOne({ id: slug });
    if (existingTest) {
      return res.status(409).json({ message: 'Test with this name already exists' });
    }

    const test = await Test.create({
      id: slug,
      name,
      category,
      description,
      duration,
      locations: locations, // Use locationNames for both fields
    
      popular: Boolean(popular),
      keywords,
      parts,
      parameterCount,
      parameters,
      reportIn,
      about,
    });

    return res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to create test',
      error: (err as Error).message,
    });
  }
};

// ✅ UPDATE Test
export const updateTest = async (req: Request, res: Response) => {
  try {
    console.log("req for updating test", req.body)
    const { id } = req.params;
    const {
      name,
      category,
      description,
      duration,
      locations,
      popular,
      keywords,
      parts,
      parameterCount,
      parameters,
      reportIn,
      about,
    } = req.body;

    console.log("Update Test received on backend: ", { id, ...req.body });

    // Validate required fields with more flexible validation
    if (
      !name?.trim() ||
      !category?.trim() ||
      !description?.trim() ||
      typeof duration !== "string" ||
      !Array.isArray(keywords) ||
      !Array.isArray(parts) ||
      typeof parameterCount !== "number" ||
      !Array.isArray(parameters) ||
      typeof reportIn !== "number" ||
      !about?.trim()
    ) {
      console.log("Validation failed for fields:", {
        name: !!name?.trim(),
        category: !!category?.trim(),
        description: !!description?.trim(),
        duration: typeof duration,
        keywords: Array.isArray(keywords),
        parts: Array.isArray(parts),
        parameterCount: typeof parameterCount,
        parameters: Array.isArray(parameters),
        reportIn: typeof reportIn,
        about: !!about?.trim()
      });
      return res.status(400).json({ message: 'All required fields must be provided in the correct format' });
    }

    // Handle locations validation
    if (!Array.isArray(locations)) {
      console.log("Locations validation failed:", { locations });
      return res.status(400).json({ message: 'Locations must be an array' });
    }

    console.log("Final locations array:", locations);

    // Check if test exists
    const existingTest = await Test.findOne({ id });
    if (!existingTest) {
      console.log("Test not found with id:", id);
      return res.status(404).json({ message: 'Test not found' });
    }

    console.log("Found existing test:", existingTest.name);

    // Check if new name conflicts with another test (excluding current test)
    if (name !== existingTest.name) {
      const slug = slugify(name, { lower: true });
      const nameConflict = await Test.findOne({ id: slug, _id: { $ne: existingTest._id } });
      if (nameConflict) {
        console.log("Name conflict detected:", slug);
        return res.status(409).json({ message: 'Test with this name already exists' });
      }
    }

    // Prepare update data
    const updateData = {
      name,
      category,
      description,
      duration,
      locations,
      popular: Boolean(popular),
      keywords,
      parts,
      parameterCount,
      parameters,
      reportIn,
      about,
    };

    console.log("Updating test with data:", updateData);

    // Update the test
    const updatedTest = await Test.findByIdAndUpdate(
      existingTest._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTest) {
      console.log("Test update failed - no result returned");
      return res.status(404).json({ message: 'Test not found' });
    }

    console.log("Test updated successfully:", updatedTest.name);

    // Ensure the response has the correct structure
    const responseData = {
      message: 'Test updated successfully', 
      test: {
        id: updatedTest.id,
        name: updatedTest.name,
        category: updatedTest.category,
        description: updatedTest.description,
        duration: updatedTest.duration,
        locations: updatedTest.locations,
        popular: updatedTest.popular,
        keywords: updatedTest.keywords,
        parts: updatedTest.parts,
        parameterCount: updatedTest.parameterCount,
        parameters: updatedTest.parameters,
        reportIn: updatedTest.reportIn,
        about: updatedTest.about,
      }
    };

    console.log("Sending response:", responseData);

    return res.status(200).json(responseData);
  } catch (err) {
    console.error('Error updating test:', err);
    return res.status(500).json({
      message: 'Failed to update test',
      error: (err as Error).message,
    });
  }
};
















// ✅ DELETE Test
export const deleteTest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Delete Test request received for ID: ", id);

    // Check if test exists
    const existingTest = await Test.findOne({ id });
    if (!existingTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Delete the test
    const deletedTest = await Test.findByIdAndDelete(existingTest._id);
    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    return res.status(200).json({ 
      message: 'Test deleted successfully',
      success: true
    });
  } catch (err) {
    console.error('Error deleting test:', err);
    return res.status(500).json({
      message: 'Failed to delete test',
      error: (err as Error).message,
    });
  }
};

// ✅ GET All Tests (without image field)
export const getAllTests = async (req: Request, res: Response) => {
  try {
    const { skip = "0", limit = "0" } = req.query;

    const tests = await Test.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .select(
        "id name category description duration locations popular parts parameterCount parameters reportIn about"
      );

    return res.status(200).json({ tests });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch tests",
      error: (err as Error).message,
    });
  }
};
