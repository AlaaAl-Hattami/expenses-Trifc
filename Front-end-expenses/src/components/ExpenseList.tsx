import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseFilters from "./ExpenseFilters";
import AddExpenseForm from "./AddExpenseForm";

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/expenses");
      setExpenses(res.data);
      setFilteredExpenses(res.data); // عرض البيانات عند البداية
    } catch (err) {
      console.error("خطأ أثناء جلب البيانات:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف النفقة؟")) return;
    try {
      await axios.delete(`http://localhost:3000/expenses/${id}`);
      const updated = expenses.filter((e) => e.id !== id);
      setExpenses(updated);
      setFilteredExpenses(updated);
    } catch (err) {
      console.error("خطأ أثناء الحذف:", err);
      setMessage("❌ فشل في حذف النفقة.");
    }
  };

  const AllDel = async () => {
    if (!confirm("هل أنت متأكد من حذف جميع النفقات؟")) return;
    try {
      await axios.delete("http://localhost:3000/expenses");
      setExpenses([]);
      setFilteredExpenses([]);
    } catch (err) {
      console.error("خطأ أثناء الحذف:", err);
      setMessage("❌ فشل في حذف النفقة.");
    }
  };

  const handleEdit = (expense: Expense) => setEditingExpense(expense);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingExpense) return;
    setEditingExpense({
      ...editingExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;

    try {
      await axios.put(
        `http://localhost:3000/expenses/${editingExpense.id}`,
        editingExpense
      );
      await fetchExpenses();
      setEditingExpense(null);
      setMessage("✅ تم تعديل النفقة بنجاح.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("خطأ أثناء التعديل:", err);
      setMessage("❌ فشل في تعديل النفقة.");
    }
  };

  const totalPrice = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-6 bg-gradient-to-tr from-rose-50 via-orange-50 to-yellow-100 shadow-xl rounded-md">
      <AddExpenseForm onAdd={fetchExpenses} />
      <h2 className="text-2xl font-bold text-blue-500 text-center my-6">📋 قائمة النفقات</h2>

      <ExpenseFilters
        originalExpenses={expenses}
        onFilter={(filtered) => setFilteredExpenses(filtered)}
      />

      {message && (
        <div className="text-center mb-4 text-green-600 font-medium">{message}</div>
      )}

      {editingExpense && (
        <form
          onSubmit={handleEditSubmit}
          className="mb-6 bg-gray-50 p-4 rounded border space-y-4"
        >
          <h3 className="font-bold text-lg">✏️ تعديل النفقة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              name="title"
              value={editingExpense.title}
              onChange={handleEditChange}
              placeholder="العنوان"
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="amount"
              value={editingExpense.amount}
              onChange={handleEditChange}
              placeholder="المبلغ"
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="date"
              value={editingExpense.date}
              onChange={handleEditChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex gap-3 justify-start">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              حفظ التعديلات
            </button>
            <button
              type="button"
              onClick={() => setEditingExpense(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-center text-gray-600">جارٍ التحميل...</p>
      ) : filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500">🚫 لا توجد نفقات</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-sm">
          <table className="min-w-full text-sm text-center border bg-white rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">العنوان</th>
                <th className="border p-2">المبلغ</th>
                <th className="border p-2">التاريخ</th>
                <th className="border p-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{expense.title}</td>
                  <td className="border p-2">{expense.amount.toLocaleString()} ﷼</td>
                  <td className="border p-2">{expense.date}</td>
                  <td className="border p-2 flex flex-col md:flex-row gap-1 justify-center items-center">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* الإجمالي + زر حذف الكل */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold text-blue-700 text-center md:text-right">
          💰 الإجمالي: {totalPrice.toLocaleString()} ﷼
        </h1>
        <button
          onClick={AllDel}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 rounded-b-2xl cursor-pointer"
        >
          🗑️ حذف الكل
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
