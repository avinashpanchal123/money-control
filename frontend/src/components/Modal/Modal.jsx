const Modal = ({ showModal, headingText, setCategoryform,categoryform, handleSave, clearValues, handleChange}) => {
    return (
      <>
        {showModal && (
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
            {/* Modal Container */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
  
                {/* Modal Box */}
                <div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full">
                  {/* Modal Content */}
                  <div className="p-6">
                    {/* Modal Heading */}
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Add New {headingText}</h1>
  
                    {/* Form */}
                    <form onSubmit={handleSave}>
                      {/* Checkbox for Income/Expense */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <input
                            onChange={handleChange}
                            checked={categoryform.categoryType.income}
                            type="checkbox"
                            name="income"
                            id="income"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="income" className="ml-2 text-gray-700">Income</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            onChange={handleChange}
                            checked={categoryform.categoryType.expense}
                            type="checkbox"
                            name="expense"
                            id="expense"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="expense" className="ml-2 text-gray-700">Expense</label>
                        </div>
                      </div>
  
                      {/* Input for Category Name */}
                      <div className="mb-6">
                        <input
                          value={categoryform.categoryName}
                          onChange={handleChange}
                          type="text"
                          name="categoryName"
                          placeholder="Category name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
  
                      {/* Buttons */}
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={clearValues}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
                          type="button"
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;
  