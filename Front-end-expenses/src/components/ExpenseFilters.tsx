import React, { useState, useEffect } from 'react';

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
}

interface Props {
  originalExpenses: Expense[];
  onFilter: (filtered: Expense[]) => void;
}

const ExpenseFilters: React.FC<Props> = ({ originalExpenses, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const filtered = originalExpenses.filter(expense => {
      const matchQuery = expense.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchDate = filterDate
        ? new Date(expense.date).getMonth() === new Date(filterDate).getMonth() &&
          new Date(expense.date).getFullYear() === new Date(filterDate).getFullYear()
        : true;

      return matchQuery && matchDate;
    });

    onFilter(filtered);
  }, [searchQuery, filterDate, originalExpenses]);

  return (
    <div className="mb-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {/* مربع البحث */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 ابحث عن النفقة"
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* اختيار التاريخ */}
        <div className="relative w-full md:w-1/2">
          <input
            type="month"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded peer focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {!filterDate && (
            <span className="absolute right-3 top-3 text-gray-400 pointer-events-none peer-focus:opacity-0 transition-opacity">
              📅 اختر التاريخ
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters;
