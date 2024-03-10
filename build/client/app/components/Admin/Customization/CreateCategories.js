"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CreateCategories.tsx
const react_1 = require("react");
const api_1 = require("../../../../redux/features/layout/api");
const CreateCategories = () => {
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [createLayout] = (0, api_1.useCreateLayoutMutation)();
    const handleAddCategory = () => {
        setCategories((prevCategories) => [
            ...prevCategories,
            { _id: `temp-${Date.now()}`, title: '' },
        ]);
    };
    const handleCategoryChange = (id, title) => {
        setCategories((prevCategories) => prevCategories.map((c) => (c._id === id ? { ...c, title } : c)));
    };
    const handleDeleteCategory = (id) => {
        setCategories((prevCategories) => prevCategories.filter((c) => c._id !== id));
    };
    const handleSaveCategories = async () => {
        try {
            await createLayout({
                type: 'Categories',
                categories,
            });
            // Optionally, you can refetch data or perform other actions after saving
        }
        catch (error) {
            console.error('Error creating layout:', error);
            // Handle error as needed
        }
    };
    return (<div>
      {categories.map((category) => (<div key={category._id}>
          <input type="text" value={category.title} onChange={(e) => handleCategoryChange(category._id, e.target.value)}/>
          <button onClick={() => handleDeleteCategory(category._id)}>
            Delete
          </button>
        </div>))}
      <button onClick={handleAddCategory}>Add Category</button>
      <button onClick={handleSaveCategories}>Save</button>
    </div>);
};
exports.default = CreateCategories;
