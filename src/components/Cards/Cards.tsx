import { Card, Row } from "antd";
import "./Cards.css";
import Button from "../Button/Button";

export interface CardsProps {
  showExpenseModal: () => void;
  showIncomeModal: () => void;
}

export default function Cards({
  showExpenseModal,
  showIncomeModal,
}: CardsProps) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p> ₦0</p>
          <Button text="Reset Balance" />
        </Card>
        <Card className="my-card" title="Total Income">
          <p> ₦0</p>
          <Button text="Add Income" onClick={showIncomeModal} />
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p> ₦0</p>
          <Button text="Add Expense" onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}
