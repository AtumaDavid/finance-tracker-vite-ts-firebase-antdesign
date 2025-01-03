import { useState } from "react";
import Cards from "../components/Cards/Cards";
import Header from "../components/Header";
import AddIncome from "../components/modals/AddIncome";
import AddExpense from "../components/modals/AddExpense";

export default function Dashboard() {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseModalCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeModalCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values: any, type: string) => {
    console.log("onFinish", values, type);
  };

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeModalCancel={handleIncomeModalCancel}
        onFinish={onFinish}
      />
      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseModalCancel={handleExpenseModalCancel}
        onFinish={onFinish}
      />
    </div>
  );
}
