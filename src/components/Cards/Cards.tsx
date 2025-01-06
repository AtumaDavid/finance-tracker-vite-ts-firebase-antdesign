import { Card, Row } from "antd";
import "./Cards.css";
import Button from "../Button/Button";

export interface CardsProps {
  showExpenseModal: () => void;
  showIncomeModal: () => void;
  income: number;
  expense: number;
  balance: number;
}

export default function Cards({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  balance,
}: CardsProps) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p> ₦{balance}</p>
          {/* <Button text="Reset Balance" /> */}
        </Card>
        <Card className="my-card" title="Total Income">
          <p> ₦{income}</p>
          <Button text="Add Income" onClick={showIncomeModal} />
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p> ₦{expense}</p>
          <Button text="Add Expense" onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}
