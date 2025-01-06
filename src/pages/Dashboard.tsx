import { useEffect, useState } from "react";
import Cards from "../components/Cards/Cards";
import Header from "../components/Header";
import AddIncome from "../components/modals/AddIncome";
import AddExpense from "../components/modals/AddExpense";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
// import Charts from "../components/Charts/Charts";
import NoTransactions from "../components/NoTransactions";
import Charts from "../components/Charts/Charts";

export interface Transaction {
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
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

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
    addTransaction(newTransaction, false);
    // console.log(newTransaction);

    // Close the modal after adding the transaction
    if (type === "Income") {
      setIsIncomeModalVisible(false);
    } else {
      setIsExpenseModalVisible(false);
    }
  };

  async function addTransaction(
    transaction: Transaction,
    many: boolean = false
  ) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user?.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID", docRef.id);
      // toast.success("Transaction added");
      if (!many) toast.success("Transaction added");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (error) {
      console.error("error adding document", error);
      // toast.error("Error adding transaction");
      if (!many) toast.error("Error adding transaction");
    }
  }

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);
  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user]); // Fetch transactions when user changes

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = async () => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

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
      // toast.success("Transactions fetched successfully");
    }
    setLoading(false);
  };

  // chart
  // Option 1: Using compareFunction
  let sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(parseDate(a.date)).getTime();
    const dateB = new Date(parseDate(b.date)).getTime();
    return dateA - dateB;
  });

  // Helper function to parse date
  function parseDate(dateString: string): string {
    // Assuming date is in DD/MM/YYYY format
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            balance={balance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions && transactions.length != 0 ? (
            // <Charts sortedTransactions={sortedTransactions} />
            <Charts sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}

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
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}
