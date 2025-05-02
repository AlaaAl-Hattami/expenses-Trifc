import React, { useState } from "react";
import axios from "axios";

const AddExpenseForm = ({ onAdd }: { onAdd: () => void }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expense = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      await axios.post("http://localhost:3000/expenses", expense);
      setFormData({ title: "", amount: "" });

      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("خطأ أثناء الإضافة:", error);
    }
  };

  return (
    <div className="flex flex-col  justify-between">
        {/* Footer */}
       
      {/* Form */}
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-200 p-6 sm:p-8 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">إضافة مصروفاتي</h2>

          <input
            type="text"
            name="title"
            placeholder="اسم النفقة"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="المبلغ"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-b-2xl bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
          >
            حفظ الصرفية
          </button>
        </form>
      </main>

    
    </div>
  );
};

export default AddExpenseForm;
