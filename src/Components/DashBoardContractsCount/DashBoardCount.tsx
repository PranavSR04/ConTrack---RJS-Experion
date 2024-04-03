import { Card, Col, Row } from "antd";
import React from "react";
import CountUp from "react-countup";

interface countType {
  contractCount: number;
  Contract: string;
}
//Dashboard count component to display a count with a label.
const DashBoardCount = ({ contractCount, Contract }: countType) => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card
          style={{
            width: "135px",
            height: "120px",
            padding: "0px",
            transform: "scale",
            backgroundColor: "#1C4E80",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "15px", marginBottom: "0.1rem" }}>{Contract}</p>
          <CountUp
            end={contractCount}
            style={{ fontSize: "25px", fontWeight: "600", marginBottom: "2px" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashBoardCount;
