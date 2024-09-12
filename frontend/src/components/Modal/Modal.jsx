

const Modal = ({headingText, setValue, addValue, clearValues, handleType, type, value}) => {
    return<>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className='flex items-center md:container md:mx-auto'>
                        <form action="">
                            <h1 className="m-4 text-xl font-bold">Add New {headingText}</h1>
                            <input onChange={handleType} checked={type.income} type="checkbox" name="income" id="income" />
                            <label htmlFor="income">Income</label>
                            <input onChange={handleType} checked={type.expense} type="checkbox" name="expense" id="expense" />
                            <label htmlFor="expense">Expense</label>
                            <div>
                                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="category name" />
                            </div>

                            <div className="flex-auto flex space-x-4 mt-8">
                                <button onClick={clearValues}
                                    className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                                    Cancel
                                </button>
                                <button onClick={addValue}
                                    className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Modal;