import { Radio, Select, Table } from "antd";
import "./TransactionsTable.css";
import { Transaction } from "../../pages/Dashboard";
import { useState } from "react";
import searchImg from "../../assets/search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import { ColumnsType } from "antd/es/table";

// import { CiSearch } from "react-icons/ci";

// import Input from "../Input/Input";

interface TransactionsTableProps {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction, many?: boolean) => Promise<void>;
  fetchTransactions?: () => Promise<void>;
}

interface ImportedTransaction {
  date: string;
  name: string;
  tag: string;
  type: string;
  amount: string; // CSV imports are typically strings
}

export default function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
}: TransactionsTableProps) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns: ColumnsType<Transaction> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },

    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (amount: number) => `₦${amount.toLocaleString()}`, // Format amount
    },
  ];

  let filteredTransactions = transactions.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
    );
  });

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  // EXPORT CSV
  const exportCSV = () => {
    var csv = unparse({
      fields: ["date", "name", "tag", "type", "amount"],
      data: transactions,
    });
    var data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "transactions.csv");
    tempLink.click();
  };

  // IMPORT CSV
  const importFromCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Null and file existence check
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    try {
      parse(file, {
        header: true,
        complete: async function (results) {
          console.log(results);
          for (const transaction of results.data as ImportedTransaction[]) {
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
              type: transaction.type,
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions added");
      // fetchTransactions();
      if (fetchTransactions) {
        fetchTransactions();
      }
      e.target.files = null;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name"
        className="my-search"
      /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} alt="search" width={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
          />
        </div>
        <Select
          className="Select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          // allowClear
        >
          <Option value="">All</Option>
          <Option value="Income">Income</Option>
          <Option value="expense">Expenses</Option>
        </Select>
      </div>

      {/* SORT */}
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <h2>My Transactions</h2>
          <Radio.Group
            className="input-radio"
            style={{
              flexWrap: "wrap",
            }}
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            {/* <button className="btn" onClick={exportToCsv}> */}
            <button className="btn" onClick={exportCSV}>
              Export to CSV
            </button>
            {/* <label for="file-csv" className="btn btn-blue"> */}
            <label htmlFor="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCSV}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
        {/* <Table columns={columns} dataSource={filteredTransactions} />; */}
        <Table columns={columns} dataSource={sortedTransactions} />;
      </div>
    </div>
  );
}
