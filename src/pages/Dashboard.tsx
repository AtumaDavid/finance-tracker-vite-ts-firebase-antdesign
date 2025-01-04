import { useEffect, useState } from "react";
import Cards from "../components/Cards/Cards";
import Header from "../components/Header";
import AddIncome from "../components/modals/AddIncome";
import AddExpense from "../components/modals/AddExpense";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Transaction {
  type: string;
  date: string;
  amount: number;
  tag: string;
  name: string;
}

export default function Dashboard() {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

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
    // console.log("onFinish", values, type);
    const newTransaction = {
      type: type,
      // date: moment(values.date).format("YYYY-MM-DD"),
      // date: new Date(values.date).toISOString().split("T")[0], // Format as YYYY-MM-DD
      date: new Date(values.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    // console.log(newTransaction);
  };

  async function addTransaction(transaction: Transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user?.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID", docRef.id);
      toast.success("Transaction added");
    } catch (error) {
      console.error("error adding document", error);
      toast.error("Error adding transaction");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user?.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data() as Transaction);
      });
      setTransactions(transactionsArray);
      toast.success("Transactions fetched successfully");
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
