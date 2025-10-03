import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import {
  FaClipboardList,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaTimesCircle,
} from "react-icons/fa";
import { getDataById } from "../../apiservices";

// Tracking steps (excluding cancelled)
const steps = [
  { key: "pending", label: "Pending", icon: <FaClipboardList /> },
  { key: "approved", label: "Approved", icon: <FaCheckCircle /> },
  { key: "shipped", label: "Shipped", icon: <FaTruck /> },
  { key: "deliver", label: "Delivered", icon: <FaBoxOpen /> },
];

const statusColors = {
  pending: "warning",
  approved: "info",
  shipped: "primary",
  deliver: "success",
  cancelled: "danger",
};

const getStatusIndex = (status) => steps.findIndex((s) => s.key === status);

export default function OrdersTracking() {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let res = await getDataById("orders", user._id);
    setOrder(res);
  };

  return (
    <Container fluid className="my-4" style={{ minHeight: "60vh" }}>
      <h3 className="mb-4 text-center">My Orders</h3>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <FaClipboardList size={50} className="text-muted mb-3" />
          <h5 className="mb-3">You have no orders yet.</h5>
          <Button href="/shop" variant="primary">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Row>
          {orders.map((order) => {
            const activeIndex = getStatusIndex(order.status);

            return (
              <Col xs={12} key={order._id} className="mb-4">
                <Card className=" border-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title className="mb-0">
                        Order #{order._id.slice(-6)}
                      </Card.Title>
                      <Badge bg={statusColors[order.status]}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Products List */}
                    <ListGroup variant="flush" className="mb-3">
                      {order.products.map((p) => (
                        <ListGroup.Item key={p._id}>
                          {p.name} × {p.quantity} —{" "}
                          <strong>Rs {p.price * p.quantity}</strong>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    {/* Cancelled orders */}
                    {order.status === "cancelled" ? (
                      <div className="text-center py-4">
                        <FaTimesCircle size={50} className="text-danger mb-2" />
                        <h5 className="text-danger">
                          This order was cancelled
                        </h5>
                      </div>
                    ) : (
                      <>
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <ProgressBar>
                            {steps.map((step, idx) => (
                              <ProgressBar
                                now={100 / steps.length}
                                key={step.key}
                                variant={
                                  idx <= activeIndex
                                    ? statusColors[order.status]
                                    : "secondary"
                                }
                              />
                            ))}
                          </ProgressBar>
                        </div>

                        {/* Step Icons */}
                        <div className="d-flex justify-content-between mt-2">
                          {steps.map((step, idx) => (
                            <div
                              key={step.key}
                              className={`text-center ${
                                idx <= activeIndex
                                  ? `text-${statusColors[order.status]}`
                                  : "text-muted"
                              }`}
                              style={{ fontSize: "0.9rem" }}
                            >
                              {step.icon}
                              <div>{step.label}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}
