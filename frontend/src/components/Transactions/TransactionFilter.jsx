const TransactionFilter = ({ categories, filterCategoryID, setFilterCategoryID, onFilter }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="w-1/3">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          id="category"
          value={filterCategoryID}
          onChange={(e) => setFilterCategoryID(e.target.value)}
          className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* <button
        onClick={onFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Apply Filter
      </button> */}
    </div>
  );
};

export default TransactionFilter;
