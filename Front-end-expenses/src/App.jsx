import React from 'react'

import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
 
  return (
    <div className="App">
       <footer className="bg-gray-800 text-white py-6 px-4 rounded-b-2xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-right text-red-600">
            &copy; 2025 علاء الحطامي. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center md:justify-end space-x-4 bg-gray-800 cursor-pointer">
            <a
              href="https://api.whatsapp.com/send/?phone=967774460081&text&type=phone_number&app_absent=0"
              className="hover:text-gray-400 transition"
            >
              تواصل معي
            </a>
          </div>
        </div>
      </footer>
      <ExpenseList />
</div>
  )
}

export default App
